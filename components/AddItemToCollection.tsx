import Image from 'next/image';
import React, { FormEvent } from 'react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import useBecomeConfidentStore from '../store/becomeConfidentStore';

type Props = {};

const AddItemToCollection = (props: Props) => {
  const address = useAddress();
  const router = useRouter();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  const [mintNft, loading, preview] = useBecomeConfidentStore((state) => [
    state.mintNft,
    state.loading,
    state.preview,
  ]);

  //Function to mint the NFTs
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (await mintNft(e, contract, address)) router.push('/create');
  };

  return (
    <section className="max-w-6xl mx-auto dark:text-text-color-primary">
      <h1 className="text-4xl font-bold pt-5">Add an Item to Collection</h1>
      <h2 className="text-xl font-semibold pt-5">Item Details</h2>
      <p className="pb-5 pt-2">
        By adding item to the collection, you&apos;re essentially Minting an NFT
        of your confident face into your wallet which you can list for sale!
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
  );
};

export default AddItemToCollection;
