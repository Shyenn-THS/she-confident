import { HeartIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import Spinner from '../components/Spinner';

type Props = {};

const Claim = (props: Props) => {
  return (
    <main className="space-y-10">
      <div className="flex justify-between flex-1 items-center">
        <div className="space-y-10">
          <h1 className="text-7xl max-w-xl font-mono font-light dark:text-text-color-primary">
            Claim free <span className="text-rajah-500">StarWar NFT</span> for
            your{' '}
            <span className="text-mandys-pink-500 space-x-2 whitespace-nowrap flex items-center">
              Donations! <HeartIcon className="h-10 w-10" />
            </span>
          </h1>
          <button className="px-10 flex items-center justify-center space-x-3 py-4 bg-gradient-to-tr from-froly-600 max-w-sm to-rajah-400 rounded-full text-text-color-primary w-full">
            <span>Mint NFT</span>
            <Spinner />
          </button>
        </div>
        <div className=" relative">
          <Image
            //   fill
            height={500}
            width={500}
            src="/StarwarCollection.png"
            alt="Star War Collection"
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Claim;
