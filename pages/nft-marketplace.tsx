import { BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';
import {
  MediaRenderer,
  useActiveListings,
  useContract,
} from '@thirdweb-dev/react';
import { ListingType } from '@thirdweb-dev/sdk';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import GearLoading from '../components/GearLoading';

const NFTMarketplace: NextPage = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );

  const {
    data: listings,
    error,
    isError,
    isLoading,
  } = useActiveListings(contract);

  console.log(listings);
  console.log(isError, error);

  return (
    <div className="">
      <Head>
        <title>SheConfident | You are confident!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        {isLoading ? (
          <GearLoading loadingMessage="Loading Listings, This might take few seconds..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
            {listings?.map((listing) => {
              return (
                <Link key={listing?.id} href={`/listing/${listing.id}`}>
                  <div className="card">
                    <div className="flex-1 h-52 object-cover w-full flex flex-col items-center">
                      <MediaRenderer
                        className="object-cover bg-gradient-to-tr from-froly to-mandys-pink"
                        src={listing.asset.image}
                      />
                    </div>

                    <div className="pt-2 space-y-4">
                      <div className="">
                        <h2 className="text-lg truncate">
                          {listing.asset.name}
                        </h2>
                        <hr />
                        <p className="line-clamp-2 text-sm text-text-color-secondary dark:text-text-color-tertiary mt-2">
                          {listing.asset.description}
                        </p>
                      </div>

                      <p className="space-x-1">
                        <span className="font-bold">
                          {listing.buyoutCurrencyValuePerToken.displayValue}
                        </span>
                        <span className="">
                          {listing.buyoutCurrencyValuePerToken.symbol}
                        </span>
                      </p>

                      <div
                        className={`flex items-center space-x-1 justify-end text-xs w-fit ml-auto p-2 rounded-lg text-text-color-primary ${
                          listing.type === ListingType.Direct
                            ? 'bg-froly-500'
                            : 'bg-rajah-500'
                        }`}
                      >
                        <p>
                          {listing.type === ListingType.Direct
                            ? 'Bye Now'
                            : 'Auction'}
                        </p>

                        {listing.type === ListingType.Direct ? (
                          <BanknotesIcon className="h-4" />
                        ) : (
                          <ClockIcon className="h-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default NFTMarketplace;
