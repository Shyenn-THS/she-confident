import { HeartIcon } from '@heroicons/react/24/solid';
import { MediaRenderer, useAddress, useContract } from '@thirdweb-dev/react';
import { NFT, TransactionResultWithId } from '@thirdweb-dev/sdk';
import { BigNumber } from 'ethers';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ClaimedNFTModal from '../components/ClaimedNftModal';
import Spinner from '../components/Spinner';
import { SC_ADDRESS } from '../utils/constants';
import { toWei } from '../utils/utilityFunctions';

type Props = {};

type Balance = {
  symbol: string;
  value: BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
};

const Claim = (props: Props) => {
  const { contract: signatureDropContract } = useContract(
    process.env.NEXT_PUBLIC_SIGNATUREDROP_CONTRACT,
    'signature-drop'
  );

  const { contract: sheCoinContract } = useContract(SC_ADDRESS, 'token');

  const address = useAddress();
  const [processing, setProcessing] = useState(false);
  const [claimed, setClaimed] = useState<BigNumber>();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [unclaimedNfts, setUnclaimedNfts] = useState();
  const [nft, setNft] = useState<NFT>();
  const [modal, setModal] = useState(false);
  const [balance, setBalance] = useState<Balance>();

  useEffect(() => {}, [nft]);

  useEffect(() => {
    signatureDropContract
      ?.totalUnclaimedSupply()
      .then((value) => {
        setClaimed(value);
      })
      .catch((error) => {
        console.error(error);
      });

    signatureDropContract
      ?.totalSupply()
      .then((value) => {
        setTotalSupply(value);
      })
      .catch((error) => {
        console.error(error);
      });

    signatureDropContract
      ?.getAllUnclaimed()
      .then((nfts) => {
        setUnclaimedNfts(nfts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [signatureDropContract]);

  useEffect(() => {
    sheCoinContract
      ?.balance()
      .then((bal) => {
        setBalance(bal);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [sheCoinContract && address]);

  const handleClaimNFT = async () => {
    if (!address) {
      toast.error('Please connect your wallet to claim NFT.');
      setProcessing(false);
      return;
    }

    if (balance?.value! < toWei('1')) {
      toast.error(
        'Oops, Insufficient SheCoin to mint NFT, Keep donating to projects!!'
      );
      setProcessing(false);
      return;
    }

    setProcessing(true);
    try {
      const quantity = 1; // how many unique NFTs you want to claim

      const tx = await signatureDropContract!.claim(quantity, {
        checkERC20Allowance: true,
        currencyAddress: SC_ADDRESS,
      });
      const receipt = tx[0].receipt; // the transaction receipt
      const claimedTokenId = tx[0].id; // the id of the NFT claimed
      const claimedNFT = await tx[0].data();

      setModal(true);
      setNft(claimedNFT);
      toast.success('Wohooo! claimed NFT Sucessfully');
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="space-y-10 dark:text-text-color-primary">
      {nft && modal ? (
        <ClaimedNFTModal data={nft} closeModal={() => setModal(false)} />
      ) : null}
      <div className="flex justify-between flex-1 items-center">
        <div className="space-y-10">
          <h1 className="text-7xl max-w-xl font-mono font-light">
            Claim free <span className="text-rajah-500">StarWar NFT</span> for
            your{' '}
            <span className="text-mandys-pink-500 space-x-2 whitespace-nowrap flex items-center">
              Donations! <HeartIcon className="h-10 w-10" />
            </span>
          </h1>
          <div className="space-y-1">
            {claimed && totalSupply ? (
              <h3 className="text-xl">
                {claimed?.toNumber()} NFTs available out of{' '}
                {totalSupply?.toNumber()}
              </h3>
            ) : (
              <h3 className="text-xl">loading ...</h3>
            )}
            {balance ? (
              <h3 className="text-xl">
                Your Balance is {balance.displayValue} {balance.symbol}
              </h3>
            ) : (
              <h3 className="text-xl">loading Balance ...</h3>
            )}
          </div>
          <button
            onClick={handleClaimNFT}
            disabled={processing}
            className="px-10 flex items-center disabled:bg-opacity-80 disabled:animate-pulse justify-center space-x-3 py-4 bg-gradient-to-tr from-froly-700 max-w-sm to-rajah-600 rounded-full text-text-color-primary w-full"
          >
            <span>Claim NFT</span>
            {processing ? <Spinner /> : null}
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

      <h1 className="text-4xl">Unclaimed NFTs</h1>
      <hr className="w-full" />

      <div className="grid grid-cols-3 gap-4">
        {unclaimedNfts?.map((nft) => {
          const { id, image, name, description } = nft;
          return (
            <div key={id} className="card">
              <div className="flex-1 h-52 object-cover w-full flex flex-col items-center">
                <MediaRenderer
                  className="object-cover bg-gradient-to-tr from-froly to-mandys-pink"
                  src={image}
                />
              </div>

              <div className="pt-2 space-y-4">
                <div className="">
                  <h2 className="text-lg truncate">{name}</h2>
                  <hr />
                  <p className="line-clamp-2 text-sm text-text-color-secondary dark:text-text-color-tertiary mt-2">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Claim;
