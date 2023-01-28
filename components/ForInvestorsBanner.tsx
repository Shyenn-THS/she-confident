import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {};

const ForInvestorsBanner = (props: Props) => {
  const [close, setClose] = useState(false);
  return (
    <>
      {!close ? (
        <section className="py-6 bg-white-linen dark:bg-background-secondary dark:text-text-color-primary relative">
          <XMarkIcon
            className="h-5 w-5 absolute top-5 cursor-pointer right-5"
            onClick={() => setClose(true)}
          />
          <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
            <div className="flex flex-col justify-center lg:text-left">
              <p className="mb-1 text-sm font-medium tracking-widest uppercase text-froly-400">
                Looking to support confident womens on our platform?
              </p>
              <h1 className="py-2 text-3xl font-medium leading-tight title-font">
                Are you a Investor?
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
              <Link
                href="/empower"
                className="inline-flex bg-froly-500 items-center px-6 py-3 rounded-lg"
              >
                <span className="flex flex-col items-start ml-4 leading-none">
                  <span className="mb-1 text-cascade-50 text-xs">
                    Looking for some projects?
                  </span>
                  <span className="font-semibold text-white title-font">
                    Explore Projects
                  </span>
                </span>
              </Link>
              <Link
                href="/nft-marketplace"
                className="inline-flex bg-rajah-300 items-center px-5 py-3 rounded-lg"
              >
                <span className="flex flex-col items-start ml-4 leading-none">
                  <span className="mb-1 text-xs">Looking for NFTs?</span>
                  <span className="font-semibold title-font">
                    NFT Marketplace
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ForInvestorsBanner;
