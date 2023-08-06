import { useAddress, useContract } from '@thirdweb-dev/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Spinner from '../components/Spinner';
import AudioReactRecorder from 'audio-react-recorder';
import Quotes from '../components/Quotes';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import useBecomeConfidentStore from '../store/becomeConfidentStore';

const BecomeConfident = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  const address = useAddress();
  const router = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [
    generatePhrase,
    mintNft,
    convertSpeechToText,
    recordVideo,
    phrase,
    transcribed,
    preview,
    confetti,
    loading,
    isProcessing,
    record,
  ] = useBecomeConfidentStore((state) => [
    state.generatePhrase,
    state.mintNft,
    state.convertSpeechToText,
    state.recordVideo,
    state.phrase,
    state.transcribed,
    state.preview,
    state.confetti,
    state.loading,
    state.isProcessing,
    state.record,
  ]);

  //Set page loaded
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  //Fetch the phrase
  useEffect(() => {
    if (!phrase) {
      generatePhrase();
    }
  }, []);

  //Function to mint the NFTs
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (await mintNft(e, contract, address)) router.push('/create');
  };

  const handleRecordVideo = () => {
    recordVideo(videoRef);
  };

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
              onStop={convertSpeechToText}
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
              onClick={handleRecordVideo}
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
              onSubmit={handleSubmit}
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
                disabled={loading !== false}
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

export default BecomeConfident;
