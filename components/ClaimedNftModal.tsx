import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { NFT } from '@thirdweb-dev/sdk';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

type Props = {
  data: NFT;
  closeModal: any;
};

const ClaimedNFTModal = (props: Props) => {
  const { data, closeModal } = props;

  const { id, description, image, name } = data.metadata;
  const [confetti, setConfetti] = useState(false);

  // Confetti
  useEffect(() => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 8000);
  }, []);

  const { width, height } = useWindowSize();

  return (
    <div
      key={id}
      className="w-screen h-screen fixed bg-black bg-opacity-60 top-0 left-0 z-10 flex justify-center items-center"
    >
      {confetti ? (
        <div className="absolute z-20 w-full h-screen">
          <Confetti width={width} height={height} />
        </div>
      ) : null}

      <div className="relative flex max-h-[600px] overflow-y-auto flex-col max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 text-gray-100 scrollbar-thin scrollbar-thumb-froly-500 scrollbar-track-gray-100">
        <XMarkIcon
          className="w-5 h-5 absolute top-5 right-5 cursor-pointer"
          onClick={closeModal}
        />
        <img src={image!} alt={name as string} className="h-96 object-cover" />
        <h2 className="text-2xl font-semibold leading-tight text-center tracking-wide">
          {name}
        </h2>

        <div className="space-y-2">
          <h3 className="text-cascade-100 text-lg font-medium">Description</h3>
          <p className="flex-1 text-left text-sm text-cascade-200">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClaimedNFTModal;
