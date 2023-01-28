import {
  MediaRenderer,
  useAddress,
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS, NFT } from '@thirdweb-dev/sdk';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDeleteOutline } from 'react-icons/md';
import Spinner from '../components/Spinner';
import network from '../utils/network';

const Create = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );

  const { contract: collectionContract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  const address = useAddress();
  const router = useRouter();

  const ownedNfts = useOwnedNFTs(collectionContract, address);

  const [selectedNft, setSelectedNft] = useState<NFT>();

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const {
    mutate: createDirectListing,
    isLoading: isLoadingDirect,
    error: errorDirect,
  } = useCreateDirectListing(contract);

  const {
    mutate: createAuctionListing,
    isLoading: isLoadingAuction,
    error: errorAuction,
  } = useCreateAuctionListing(contract);

  const handleCreateListing = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }

    if (!selectedNft) return;

    const target = e.target as typeof e.target & {
      elements: {
        listingType: { value: string };
        price: { value: string };
      };
    };

    const { listingType, price } = target.elements;

    if (listingType.value === 'directListing') {
      createDirectListing(
        {
          assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
          tokenId: selectedNft.metadata.id,
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          listingDurationInSeconds: 60 * 60 * 24 * 7,
          quantity: 1,
          buyoutPricePerToken: price.value,
          startTimestamp: new Date(),
        },
        {
          onSuccess(data, variable, context) {
            toast.success('Created direct listing');
            router.push('/nft-marketplace');
          },

          onError(error, variable, context) {
            toast.error('Something wen wrong while creating listing.');
            console.error(error);
          },
        }
      );
    }

    if (listingType.value === 'auctionListing') {
      createAuctionListing(
        {
          assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
          tokenId: selectedNft.metadata.id,
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          listingDurationInSeconds: 60 * 60 * 24 * 7,
          quantity: 1,
          buyoutPricePerToken: price.value,
          startTimestamp: new Date(),
          reservePricePerToken: 0,
        },
        {
          onSuccess(data, variable, context) {
            toast.success('Created auction listing');
            router.push('/nft-marketplace');
          },

          onError(error, variable, context) {
            toast.error('Something wen wrong while creating listing.');
            console.error(error);
          },
        }
      );
    }
  };

  const handleBurn = (tokenId: BigNumber) => {
    collectionContract?.burn(tokenId);
  };

  return (
    <div>
      <main className="max-w-6xl mx-auto p-10 pt-2">
        <h1 className="text-4xl font-semibold">List and Item</h1>
        <h2 className="text-xl font-semibold">
          Select an item you would like to sell
        </h2>

        <hr className="mb-5" />

        <p>Bellow you will find the NFT&apos;s you own in your wallet </p>

        <div className="flex overflow-x-scroll space-x-2 p-4">
          {ownedNfts?.data?.map((nft) => {
            return (
              <div
                key={nft?.metadata?.id}
                onClick={() => setSelectedNft(nft)}
                className={`flex relative flex-col space-y-2 card min-w-fit border-2 bg-white-linen-50 ${
                  selectedNft?.metadata?.id === nft?.metadata?.id &&
                  'border-froly-500'
                }`}
              >
                <MdDeleteOutline
                  onClick={() => handleBurn(BigNumber.from(nft.metadata.id))}
                  className="text-froly-500 text-lg absolute top-4 right-4"
                />
                <MediaRenderer
                  className="h-48 bg-gradient-to-tr from-froly to-mandys-pink rounded-lg"
                  src={nft?.metadata?.image}
                />
                <p className="text-lg truncate max-w-xs font-bold">
                  {nft.metadata.name}
                </p>
                <p className="text-xs max-w-xs truncate">
                  {nft.metadata.description}
                </p>
              </div>
            );
          })}
        </div>

        {selectedNft && (
          <form onSubmit={handleCreateListing}>
            <div className="flex flex-col p-10">
              <div className="grid grid-cols-2 gap-5">
                <label className="border-r font-light" htmlFor="directListing">
                  Direct Listing / Fixed Price
                </label>
                <input
                  value="directListing"
                  id="directListing"
                  type="radio"
                  name="listingType"
                  className="h-10 w-10 ml-auto"
                />

                <label className="border-r font-light" htmlFor="auctionListing">
                  Auction
                </label>
                <input
                  id="auctionListing"
                  type="radio"
                  value="auctionListing"
                  name="listingType"
                  className="h-10 w-10 ml-auto"
                />

                <label htmlFor="price border-r font-light">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="0.05"
                  className="bg-gray-100 p-5"
                />
              </div>

              <button
                disabled={isLoadingAuction || isLoadingDirect}
                className="bg-froly-500 text-white rounded-lg p-4 mt-8 flex items-center justify-center space-x-2"
                type="submit"
              >
                <span>Create Listing</span>
                {(isLoadingAuction || isLoadingDirect) && <Spinner />}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Create;
