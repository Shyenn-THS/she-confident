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
type Props = {};

const AddItem = (props: Props) => {
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

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    fetch('/api/phrases/get-phrase', {
      // mode: 'no-cors',
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

  const mintNft = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract || !address) {
      toast.error('Please connect your wallet!');
    }
    if (!image) {
      alert('Please select and image.');
      return;
    }

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };

    const metadata = {
      name: target.name.value,
      description: target.description.value,
      image: image,
    };

    try {
      setLoading(true);
      const tx = await contract!.mintTo(address!, metadata);
      const receipt = tx.receipt;
      const tokenid = tx.id;
      const nft = await tx.data();

      console.log(receipt, tokenid, nft);

      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onData = (recordedBlob: { blob: Blob }) => {
    // Convert the recorded audio to a Blob object
    const audioBlob = new Blob([recordedBlob.blob], { type: 'audio/wav' });

    // Create a FormData object to hold the audio file
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    formData.append('phrase', phrase?.phrase!);

    // Make a POST request to the /speech-to-text endpoint with the audio file in the request body
    fetch(`${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/speech-to-text`, {
      // mode: 'no-cors',
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
            'Sorry we were unable to find your happy face. Try being more happy while talking 😃'
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

  useEffect(() => {
    setTimeout(() => {
      setConfetti(false);
    }, 8000);
  }, [confetti]);

  const { width, height } = useWindowSize();
  return (
    <main>
      {confetti ? (
        <div className="absolute z-10 w-full h-screen">
          <Confetti width={width} height={height} />
        </div>
      ) : null}
      <section className="flex flex-col sm:flex-row items-center space-x-4">
        <video
          className="w-[600px] h-[600px]"
          src="/ConfidentFace.mp4"
          controls={false}
          autoPlay={true}
          loop={true}
          ref={videoRef}
        ></video>
        <div className="flex space-y-4 items-center flex-1 flex-col">
          <Quotes quote={phrase?.phrase!} author={phrase?.owner!} />
          {pageLoaded ? (
            <AudioReactRecorder
              canvasWidth={400}
              canvasHeight={100}
              state={record}
              onStop={onData}
            />
          ) : null}
          <div className="py-4 w-3/4 mx-auto">
            <p className="text-cascade-700">
              <span className="font-bold text-cascade-900">You Said:</span>{' '}
              {transcribed
                ? transcribed.text
                : 'Submit recording to generate score!'}
            </p>
            <p className="text-cascade-700">
              <span className="font-bold text-cascade-900">
                {' '}
                Similarity With Original:
              </span>{' '}
              {Math.round(
                transcribed ? parseFloat(transcribed.similarity) * 100 : 0
              )}
              %
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              disabled={isProcessing}
              className="buttons"
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
        <section className="max-w-6xl mx-auto p-10 border">
          <h1 className="text-4xl font-bold pt-5">
            Add an Item to Marketplace
          </h1>
          <h2 className="text-xl font-semibold pt-5">Item Details</h2>
          <p className="pb-5">
            By adding item to the marketplace, you&apos;re essentially Minting
            an NFT of the item into your wallet which we then list for sale!
          </p>

          <div className="flex flex-col justify-center items-center md:flex-row md:space-x-8 p-4">
            <Image
              className="object-contain bg-gradient-to-tr from-froly to-mandys-pink"
              src={preview ? preview : '/add-nft.svg'}
              height={300}
              width={300}
              alt="Add Nft"
            />

            <form
              onSubmit={mintNft}
              className="flex flex-col mt-8 md:mt-0 flex-1 p-2 space-y-2 w-full"
            >
              <label className="font-light" htmlFor="name">
                Name Your NFT
              </label>
              <input
                className="formField"
                name="name"
                id="name"
                type="text"
                placeholder="Name of NFT"
              />

              <label className="font-light" htmlFor="desc">
                Description
              </label>
              <textarea
                className="formField h-20"
                name="description"
                id="description"
                placeholder="Enter Description"
              />

              <button
                type="submit"
                className="bg-froly-500 font-bold text-cascade-50 px-10 w-56 rounded-full py-4 md:mt-auto mx-auto md:ml-auto flex items-center space-x-4 justify-center"
              >
                <span className="whitespace-nowrap">Add / Mint Item</span>
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
