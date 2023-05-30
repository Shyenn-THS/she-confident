import { useAddress, useContract } from '@thirdweb-dev/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Spinner from '../components/Spinner';
import AudioReactRecorder from 'audio-react-recorder';
import { RecordState } from 'audio-react-recorder';
import { Phrase, Transcribed } from '../typings';
import Quotes from '../components/Quotes';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import toast from 'react-hot-toast';
import { SignedPayload721WithQuantitySignature } from '@thirdweb-dev/sdk';

const AddItem = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  const address = useAddress();
  const router = useRouter();

  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<Phrase>();
  const [transcribed, setTranscribed] = useState<Transcribed>();
  const [record, setRecord] = useState<string>();
  const videoRef = useRef(null);
  const [confetti, setConfetti] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  //Set page loaded
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  //Getting the phrase
  useEffect(() => {
    fetch('/api/phrases/get-phrase', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setPhrase(data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  //Function to mint the NFTs
  const mintNft = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contract || !address) {
      toast.error('Please connect your wallet!');
      return;
    }

    if (!image) {
      toast.error('Sorry, No image was found.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    let gender = 'Female';

    //Detects Gender
    await fetch(`${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/detect-gender`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        gender = data.gender;
      })
      .catch((err) => {
        toast.error(err.message);
      });

    if (gender !== 'Female') {
      toast.error(
        'We detected you as a Male, Please contact us if we are wrong.'
      );
      setLoading(false);
      return;
    }

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };

    try {
      let signature: SignedPayload721WithQuantitySignature | undefined =
        undefined;
      const formData = new FormData();
      formData.append('address', address!);
      formData.append('image', image);
      formData.append('description', target.description.value);
      formData.append('name', target.name.value);

      //Generate Signature for Minting NFT
      await fetch('/api/generate-signature', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          signature = data.signature;
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });

      //Minting
      const tx = await contract!.signature.mint(signature!);
      const receipt = tx.receipt;
      const tokenid = tx.id;
      //@ts-ignore
      const nft = await tx.data();

      console.log(receipt, tokenid, nft);

      router.push('/create');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Speech Recognation
  const onData = (recordedBlob: { blob: Blob }) => {
    // Convert the recorded audio to a Blob object
    const audioBlob = new Blob([recordedBlob.blob], { type: 'audio/wav' });

    // Create a FormData object to hold the audio file
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    formData.append('phrase', phrase?.phrase!);

    // Make a POST request to the /speech-to-text endpoint with the audio file in the request body
    fetch(`${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/speech-to-text`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setTranscribed(data);
      })
      .catch((err) => {
        toast.error(err.message);
        setIsProcessing(false);
      });
  };

  // Record a video
  const recordVideo = async () => {
    setIsProcessing(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    const recorder = new MediaRecorder(stream);
    const data: Blob[] = [];

    // Showing video feed
    let video: HTMLVideoElement = videoRef.current!;
    if (!video) return;
    video.srcObject = stream;
    video.play();

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();

    // Audio Recorder Start
    setRecord(RecordState.START);

    // Stop recording after 5 seconds
    setTimeout(() => {
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      video = videoRef.current!;
      video.play();
      // Audio Recorder Stop
      setRecord(RecordState.STOP);
    }, 5000);

    // Wait for the video data to be available
    await new Promise((resolve) => (recorder.onstop = resolve));
    const blob = new Blob(data, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob);

    toast('Processing your response...');
    // Send the video data to the server
    await fetch(`${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/process-video`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const image_base64 = data.image;
        if (!image_base64) {
          toast.error(
            'Sorry we were unable to find your confident face. Try being more happy while talking 😃'
          );
          setIsProcessing(false);
          return;
        }
        const image_bytes = atob(image_base64);
        const byteNumbers = new Array(image_bytes.length);
        for (let i = 0; i < image_bytes.length; i++) {
          byteNumbers[i] = image_bytes.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let image = new Blob([byteArray], { type: 'image/jpeg' });
        let imageFile = new File([image], 'image');
        setImage(imageFile);

        let imageUrl = URL.createObjectURL(image);
        setPreview(imageUrl);
        setConfetti(true);
        toast.success(
          'Created your confident face NFT, Show it to the world by minting it!!'
        );
        setIsProcessing(false);
      });
  };

  // Confetti
  useEffect(() => {
    setTimeout(() => {
      setConfetti(false);
    }, 8000);
  }, [confetti]);

  const { width, height } = useWindowSize();

  return (
    <main className="px-4 space-y-10">
      {confetti ? (
        <div className="absolute z-10 w-full h-screen">
          <Confetti width={width} height={height} />
        </div>
      ) : null}
      <section className="flex flex-col sm:flex-row items-center gap-4">
        <video
          className="w-[400px] lg:w-[600px]"
          src="/ConfidentFace.mp4"
          controls={false}
          autoPlay={true}
          loop={true}
          ref={videoRef}
        ></video>

        <div className="flex space-y-4 w-full items-center flex-1 flex-col">
          <Quotes quote={phrase?.phrase!} author={phrase?.owner!} />
          {pageLoaded ? (
            <AudioReactRecorder
              canvasWidth={350}
              canvasHeight={100}
              state={record}
              onStop={onData}
            />
          ) : null}
          <div className="py-4 sm:w-3/4 mx-auto">
            <p className="text-cascade-700 dark:text-text-color-tertiary">
              <span className="font-bold text-cascade-900 dark:text-text-color-primary">
                You Said:
              </span>{' '}
              {transcribed
                ? transcribed.text
                : 'Submit recording to generate score!'}
            </p>
            <p className="text-cascade-700 dark:text-text-color-tertiary">
              <span className="font-bold text-cascade-900 dark:text-text-color-primary">
                {' '}
                Confidence Score:
              </span>{' '}
              {Math.round(
                transcribed ? parseFloat(transcribed.similarity) * 100 : 0
              )}
              %
            </p>
          </div>
          <div className="flex space-x-4 w-full sm:w-fit">
            <button
              disabled={isProcessing}
              className="buttons w-full"
              onClick={recordVideo}
            >
              {!isProcessing ? (
                <span>Start Recording</span>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Processing</span> <Spinner />
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {!isProcessing ? (
        <section className="max-w-6xl mx-auto dark:text-text-color-primary">
          <h1 className="text-4xl font-bold pt-5">Add an Item to Collection</h1>
          <h2 className="text-xl font-semibold pt-5">Item Details</h2>
          <p className="pb-5 pt-2">
            By adding item to the collection, you&apos;re essentially Minting an
            NFT of your confident face into your wallet which you can list for
            sale!
          </p>

          <div className="flex flex-col justify-center items-center md:flex-row md:space-x-8 py-4 space-y-4 sm:space-y-0 sm:p-4">
            <Image
              className="object-contain bg-gradient-to-tr from-froly to-mandys-pink"
              src={preview ? preview : '/add-nft.svg'}
              height={300}
              width={300}
              alt="Add Nft"
            />

            <form
              onSubmit={mintNft}
              className="flex flex-col md:mt-0 flex-1 p-2 space-y-6 w-full"
            >
              <div className="flex flex-col space-y-2">
                <label className="" htmlFor="name">
                  Name Your NFT
                </label>
                <input
                  className="formField"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Name of NFT"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="" htmlFor="desc">
                  Description
                </label>
                <textarea
                  className="formField h-20 py-2"
                  name="description"
                  id="description"
                  required
                  placeholder="Enter Description of the NFT like charecteristics such as hair color, eye color, dress color, ocaasion etc."
                />
              </div>

              <button
                type="submit"
                className="buttons w-full sm:w-fit mx-auto flex items-center space-x-2"
                disabled={loading}
              >
                <span className="whitespace-nowrap mx-auto">
                  {loading ? 'Minting' : 'Add / Mint Item'}
                </span>
                {loading && <Spinner />}
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default AddItem;
