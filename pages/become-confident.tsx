import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../components/Spinner';
import AudioReactRecorder from 'audio-react-recorder';
import Quotes from '../components/Quotes';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import useBecomeConfidentStore from '../store/becomeConfidentStore';
import AddItemToCollection from '../components/AddItemToCollection';

const BecomeConfident = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [
    generatePhrase,
    convertSpeechToText,
    recordVideo,
    phrase,
    transcribed,
    confetti,
    isProcessing,
    record,
  ] = useBecomeConfidentStore((state) => [
    state.generatePhrase,
    state.convertSpeechToText,
    state.recordVideo,
    state.phrase,
    state.transcribed,
    state.confetti,
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

  const handleRecordVideo = () => {
    recordVideo(videoRef);
  };

  const { width, height } = useWindowSize();

  return (
    <main className="px-4 space-y-10">
      {confetti ? (
        <div className="fixed z-10 left-0 top-0 w-full h-screen">
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

      {!isProcessing ? <AddItemToCollection /> : null}
    </main>
  );
};

export default BecomeConfident;
