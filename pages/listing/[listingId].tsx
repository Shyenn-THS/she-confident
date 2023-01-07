import { UserCircleIcon } from '@heroicons/react/24/solid';
import {
  MediaRenderer,
  useAcceptDirectListingOffer,
  useAddress,
  useBuyNow,
  useContract,
  useListing,
  useMakeBid,
  useMakeOffer,
  useNetwork,
  useNetworkMismatch,
  useOffers,
} from '@thirdweb-dev/react';
import { ListingType, NATIVE_TOKENS } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import Spinner from '../../components/Spinner';
import network from '../../utils/network';

type Props = {};

const ListingPage = (props: Props) => {
  const router = useRouter();
  const { listingId } = router.query as { listingId: string };
  const [minimumNextBid, setMinimumNextBid] = useState<{
    displayValue: string;
    symbol: string;
  }>();

  const [bidAmount, setBidAmount] = useState<string>('');
  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();
  const address = useAddress();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );

  const {
    mutate: byeNow,
    isLoading: isByeNowLoading,
    error: byeNowError,
  } = useBuyNow(contract);
  const { data: listing, isLoading, error } = useListing(contract, listingId);

  const {
    mutate: makeOffer,
    isLoading: makeOfferLoading,
    error: makeOfferError,
  } = useMakeOffer(contract);

  const {
    mutate: makeBid,
    isLoading: makeBidLoading,
    error: makeBidError,
  } = useMakeBid(contract);

  const {
    data: offers,
    isLoading: isLoadingOffers,
    error: offersError,
  } = useOffers(contract, listingId);

  const {
    mutate: acceptOffer,
    isLoading: acceptOfferLoading,
    error: acceptOfferError,
  } = useAcceptDirectListingOffer(contract);

  useEffect(() => {
    if (!listingId || !contract || !listing) return;

    if (listing.type === ListingType.Auction) {
      fetchMinNextBid();
    }
    return () => {};
  }, [listingId, listing, contract]);

  if (isLoading) {
    return (
      <div className="text-center animate-pulse text-blue-500">
        Loading Item.....
      </div>
    );
  }

  if (!listing) {
    return <div className="">Listing not found</div>;
  }

  const fetchMinNextBid = async () => {
    if (!listingId || !contract) return;

    const { displayValue, symbol } = await contract.auction.getMinimumNextBid(
      listingId
    );

    setMinimumNextBid({
      displayValue: displayValue,
      symbol: symbol,
    });
  };

  const formatPlaceholder = () => {
    if (!listing) return;

    if (listing.type === ListingType.Direct) {
      return 'Enter Offer Amount';
    }

    if (listing.type === ListingType.Auction) {
      if (!minimumNextBid?.displayValue) {
        return 'Enter Bid Amount';
      }

      return Number(minimumNextBid?.displayValue) === 0
        ? 'Enter Bid Amount'
        : `${minimumNextBid?.displayValue} ${minimumNextBid?.symbol} or more`;
    }
  };

  const byeNft = async () => {
    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }

    byeNow(
      {
        id: listingId,
        buyAmount: 1,
        type: listing.type,
      },
      {
        onSuccess(data, variable, context) {
          console.log('SUCCESS', data);
          router.replace('/');
        },

        onError(error, variable, context) {
          console.error('ERROR', error);
        },
      }
    );
  };

  const createBidOrOffer = async () => {
    try {
      if (networkMismatch) {
        switchNetwork && switchNetwork(network);
        return;
      }

      if (listing.type === ListingType.Direct) {
        if (
          listing.buyoutPrice.toString() ===
          ethers.utils.parseEther(bidAmount).toString()
        ) {
          byeNft();
          return;
        }

        makeOffer(
          {
            quantity: 1,
            listingId,
            pricePerToken: bidAmount,
          },
          {
            onSuccess(data, variable, context) {
              console.log('SUCCESS', data);
              setBidAmount('');
            },

            onError(error, variable, context) {
              console.error('ERROR', error);
            },
          }
        );
      }

      if (listing.type === ListingType.Auction) {
        makeBid(
          {
            listingId,
            bid: bidAmount,
          },
          {
            onSuccess(data, variable, context) {
              console.log('SUCCESS', data);
              setBidAmount('');
            },

            onError(error, variable, context) {
              console.error('ERROR', error);
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptOffer = (offer: Record<string, any>) => {
    acceptOffer(
      {
        listingId,
        addressOfOfferor: offer.offeror,
      },
      {
        onSuccess(data, variable, context) {
          console.log('SUCCESS', data);
          router.replace('/');
        },

        onError(error, variable, context) {
          console.error('ERROR', error);
        },
      }
    );
  };

  return (
    <div>
      <main className="max-w-6xl mx-auto p-2 flex flex-col lg:flex-row space-y-10 space-x-5 pr-10">
        <div className="p-10 border mx-auto lg:mx-0 max-w-md lg:max-w-xl">
          <MediaRenderer src={listing.asset.image} />
        </div>

        <section className="space-y-10 pb-20 lg:pb-0">
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{listing.asset.name}</h1>
            <p className="text-gray-600">{listing.asset.description}</p>
            <p className="flex items-center text-xs sm:text-base">
              <UserCircleIcon className="h-5 pr-1" />
              <span className="font-bold pr-1">Seller:</span>
              <span className="">{listing.sellerAddress}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 items-center py-2">
            <p className="font-bold">Listing Type:</p>
            <p className="">
              {listing.type === ListingType.Direct
                ? 'Direct Listing'
                : 'Auction Listing'}
            </p>

            <p className="font-bold">Bye it Now Price:</p>
            <p className="text-4xl font-bold">
              {listing.buyoutCurrencyValuePerToken.displayValue}{' '}
              {listing.buyoutCurrencyValuePerToken.symbol}
            </p>

            <button
              disabled={isByeNowLoading}
              type="button"
              onClick={byeNft}
              className="rounded-full py-4 px-10 text-white bg-rajah-500 font-bold flex items-center justify-center space-x-2"
            >
              <span className="whitespace-nowrap">Bye Now</span>
              {isByeNowLoading && <Spinner />}
            </button>
          </div>

          {/* If Direct, show offers here  */}
          {listing.type === ListingType.Direct && offers && (
            <div className="grid grid-cols-2 gap-y-2 ">
              <p className="font-bold">Offers: </p>
              <p className="font-bold">
                {offers.length > 0 ? offers.length : 0}
              </p>

              {offers!.map((offer) => {
                return (
                  <>
                    <p className="flex items-center ml-5 text-sx italic">
                      <UserCircleIcon className="h-3 mr-2" />
                      <span>
                        {offer.offeror.slice(0, 5) +
                          '...' +
                          offer.offeror.slice(-5)}
                      </span>
                    </p>
                    <div className="">
                      <p
                        key={
                          offer.listingId +
                          offer.offeror +
                          offer.totalOfferAmount.toString()
                        }
                        className="text-sm italic"
                      >
                        {ethers.utils.formatEther(offer.totalOfferAmount)}{' '}
                        {NATIVE_TOKENS[network].symbol}
                      </p>

                      {listing.sellerAddress === address && (
                        <button onClick={() => handleAcceptOffer(offer)}>
                          Accept Offer
                        </button>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-2 space-y-6 items-center justify-end">
            <hr className="col-span-2" />
            <p className="col-span-2 font-bold">
              {listing.type === ListingType.Direct
                ? 'Make an Offer'
                : 'Bid on this Auction'}
            </p>

            {/* Remaining Time on auction  */}
            {listing.type === ListingType.Auction && (
              <>
                <p>Current Minimum Bid:</p>
                <p className="font-bold">
                  {minimumNextBid?.displayValue} {minimumNextBid?.symbol}
                </p>

                <p>Time Remaining: </p>
                <p>
                  <Countdown
                    date={
                      Number(listing.endTimeInEpochSeconds.toString()) * 1000
                    }
                  />
                </p>
              </>
            )}

            <input
              className="border p-2 rounded-lg mr-5 border-cascade-800 outline-froly-600"
              type="text"
              placeholder={formatPlaceholder()}
              onChange={(e) => {
                setBidAmount(e.target.value);
              }}
            />
            <button
              disabled={makeOfferLoading || makeBidLoading}
              onClick={createBidOrOffer}
              className="rounded-full py-4 px-10 text-white bg-froly-500 font-bold flex items-center justify-center space-x-2"
            >
              <span>
                {listing.type === ListingType.Direct ? 'Offer' : 'Bid'}
              </span>

              {(makeOfferLoading || makeBidLoading) && <Spinner />}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ListingPage;
