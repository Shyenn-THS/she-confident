import { NFTCollection } from '@thirdweb-dev/sdk';
import { FormEvent, MutableRefObject, Ref } from 'react';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Gender, Phrase, Transcribed } from '../interfaces/typings.d';
import detectGender from '../lib/detectGender';
import fetchPhrase from '../lib/fetchPhrase';
import fetchTextFromSpeech from '../lib/fetchTextFromSpeech';
import generateSignature from '../lib/generateSignature';
import { RecordState } from 'audio-react-recorder';
import fetchConfidentFace from '../lib/fetchConfidentFace';

interface BecomeConfidentState {
  preview: string;
  loading: string | boolean;
  phrase: Phrase | undefined;
  image: File | undefined;
  transcribed: Transcribed | undefined;
  record: string;
  confetti: boolean;
  isProcessing: boolean;
  generatePhrase: () => void;
  mintNft: (
    e: FormEvent<HTMLFormElement>,
    contract: NFTCollection | undefined,
    address: string | undefined
  ) => Promise<boolean>;
  convertSpeechToText: (recordedBlob: { blob: Blob }) => Promise<void>;
  recordVideo: (videoRef: MutableRefObject<HTMLVideoElement | null>) => void;
}

const useBecomeConfidentStore = create<BecomeConfidentState>()(
  devtools((set, get) => ({
    preview: '',
    loading: false,
    phrase: undefined,
    image: undefined,
    transcribed: undefined,
    record: '',
    confetti: false,
    isProcessing: false,

    generatePhrase: async () => {
      set(() => ({ loading: 'Generating a phrase for you...' }));

      const phrase = await fetchPhrase();
      set(() => ({ phrase, loading: false }));
    },

    mintNft: async (e, contract, address) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        name: { value: string };
        description: { value: string };
      };

      const description = target.description.value;
      const name = target.name.value;
      const image = get().image;

      //Error handling
      if (!address) {
        toast.error('Please connect your wallet!');
        return false;
      } else if (!contract) {
        toast.error('Something went wrong!');
        return false;
      } else if (!image) {
        toast.error('Sorry, No image was found.');
        return false;
      } else if (!description || !name) {
        toast.error('Please fill in all the fields!');
        set(() => ({ loading: false }));
        return false;
      }

      set(() => ({ loading: 'Minting the NFT...' }));
      const gender = await detectGender(image);

      //Error handling, when detecting gender as Male.
      if (gender !== Gender.FEMALE) {
        toast.error(
          'We detected you as a Male, Please contact us if we are wrong.'
        );
        set(() => ({ loading: false }));
        return false;
      }

      const signature = await generateSignature(
        image,
        address,
        description,
        name
      );

      if (!signature) {
        toast.error('Something went wrong!');
        set(() => ({ loading: false }));
        return false;
      }

      //Minting
      const tx = await contract!.signature.mint(signature!);
      const receipt = tx?.receipt;
      const tokenid = tx?.id;

      console.log(receipt, tokenid);
      return true;
    },

    convertSpeechToText: async (recordedBlob: { blob: Blob }) => {
      if (!get().phrase) {
        toast.error('Please generate a phrase first!');
        return;
      }

      const audioBlob = new Blob([recordedBlob.blob], { type: 'audio/wav' });

      const transcribedOutput = await fetchTextFromSpeech(
        audioBlob,
        get().phrase!
      );

      set({ transcribed: transcribedOutput });
    },

    recordVideo: async (videoRef) => {
      set({ isProcessing: true });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      const recorder = new MediaRecorder(stream);
      const data: Blob[] = [];

      // Showing video feed
      if (!videoRef) return;
      let video: HTMLVideoElement = videoRef.current!;
      video.srcObject = stream;
      video.play();

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();

      // Audio Recorder Start
      set({ record: RecordState.START });

      // Stop recording after 5 seconds
      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        video = videoRef.current!;
        video.play();
        // Audio Recorder Stop
        set({ record: RecordState.STOP });
      }, 5000);

      // Wait for the video data to be available
      await new Promise((resolve) => (recorder.onstop = resolve));
      const blob = new Blob(data, { type: 'video/webm' });

      toast('Processing your response...');
      // Send the video data to the server

      const image = await fetchConfidentFace(blob);

      let imageFile = new File([image], 'image');
      let imageUrl = URL.createObjectURL(image as Blob);

      toast.success(
        'Created your confident face NFT, Show it to the world by minting it!!'
      );

      set({
        preview: imageUrl,
        confetti: true,
        isProcessing: false,
        image: imageFile,
      });

      setTimeout(() => {
        set({ confetti: false });
      }, 8000);
    },
  }))
);

export default useBecomeConfidentStore;
