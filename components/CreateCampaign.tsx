import { toWei } from '../utils/utilityFunctions';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import StorageClient from '../utils/storageClient';
import toast from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import { Campaign } from '../interfaces/typings';
import { Project } from '../contracts/crowd-funding-contract/src/types';
import { useProjectFunctionWriter } from '../hooks/projectHooks';

function CreateCampaign() {
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File | undefined>();
  const { address } = useAccount();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Campaign>();
  const [processing, setProcessing] = useState(false);

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
      const amountToWei = toWei(amount.toString());
      if (!image) throw Error('Please upload an image.');
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
        throw Error('Something went wrong. Please try again later.');
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
    <form
      className="bg-white dark:bg-background-secondary text-text-color-secondary dark:text-text-color-tertiary shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Campaign Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Campaign Title"
            {...register('title')}
            required
          />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Required Amount
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Upload Cover Image
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Upload Image"
            type="file"
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Founders
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Jhon Doe, Ashok Kumar, ...."
            {...register('founders')}
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Categories
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Social Links
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Github, Linkedin"
            {...register('social')}
            required
          />
        </div>

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Mail
          </label>
          <input
            className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="email"
            placeholder="Campaign Title"
            {...register('mail')}
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
            Story
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
  );
}

export default CreateCampaign;
