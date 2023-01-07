import { useProjectFunctionWriter } from '../utils/hooks';
import { toWei } from '../utils/utilityFunctions';
import { ConnectButton, useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { DEBUG } from '../utils/constants';
import StorageClient from '../utils/StorageClient';
import toast from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Project } from '../crowdfunding/src/types';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import { Campaign } from '../typings';

function CreateCampaign() {
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File>();
  const { address } = useAccount();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Campaign>();
  const [processing, setProcessing] = useState(false);

  // custom hook we made in hooks.ts for writing functions
  const { writeAsync, isError } = useProjectFunctionWriter('createProject');

  // rainbow kit txn handler
  const addRecentTransaction = useAddRecentTransaction();

  const onSubmit: SubmitHandler<Campaign> = async (data) => {
    setProcessing(true);
    const { title, founders, story, categories, amount, social, mail } = data;

    if (!address) {
      toast.error('Please connect your wallet to continue.');
      setProcessing(false);
      return;
    }

    if ((errors as Error[]).length > 0) {
      toast.error('Please fill correct information.');
      console.error(errors);
      setProcessing(false);
      return;
    }

    try {
      DEBUG && console.log({ title, amount, story });
      const amountToWei = toWei(amount.toString());
      DEBUG && console.log('amountToWei: ', amountToWei);

      const imageURI = await new StorageClient().storeFiles(image);

      const functionArgs: Parameters<Project['createProject']> = [
        title,
        story,
        founders,
        categories,
        imageURI,
        social,
        mail,
        amountToWei,
      ];

      if (!writeAsync)
        throw Error('useProjectFunctionWriter Hook not working.');
      await writeAsync({
        recklesslySetUnpreparedArgs: functionArgs,
      }).then(() => {
        setProcessing(false);
        reset();
        router.push('/empower');
      });

      // addRecentTransaction({
      //   hash: tx.hash,
      //   description: 'Create Project Transaction',
      // });
    } catch (error: any) {
      toast.error(error.message);
      setProcessing(false);
    }
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  }

  return (
    <main>
      <div className="py-8 px-12 my-6 bg-froly-500 rounded flex w-full justify-between">
        <h1 className="text-4xl text-white">Create new project listing</h1>
        <ConnectButton
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Campaign Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Campaign Title"
              {...register('title')}
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Required Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              {...register('amount')}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Upload Cover Image
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Upload Image"
              type="file"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Founders
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Jhon Doe, Ashok Kumar, ...."
              {...register('founders')}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Categories
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Blockchain, ML, ...."
              {...register('categories')}
              required
            />
          </div>
        </div>

        <div className="p-5 w-40 h-40">
          <img src={preview ? preview : '/add-nft.svg'} alt="Preview Image" />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Social Links
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Github, Linkedin"
              {...register('social')}
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              placeholder="Campaign Title"
              {...register('mail')}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Story
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Story"
              {...register('story')}
              required
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button disabled={processing} className="buttons" type="submit">
            {!processing ? (
              <span>Create Campaign</span>
            ) : (
              <div className="flex space-x-2 justify-center items-center">
                <span>Processing</span>
                <Spinner />
              </div>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateCampaign;
