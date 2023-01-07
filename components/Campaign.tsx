import { DEBUG } from '../utils/constants';
import {
  useFundProjectFunctionWriter,
  useFundProjectData,
} from '../utils/hooks';
import { usePublishedProjs } from '../utils/read';
import { fromWei, toWei } from '../utils/utilityFunctions';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import NFTModal from './NFTModal';

export type CampaignProps = { projectNumber: number };

function Campaign({ projectNumber }: CampaignProps) {
  DEBUG && console.log('projectNumber: ', projectNumber);

  const [value, setValue] = useState<string>('');
  const [modal, setModal] = useState(false);
  const publishedProjsAddress = usePublishedProjs(projectNumber);
  const data = useFundProjectData(publishedProjsAddress!);

  const togelModal = () => {
    setModal(!modal);
  };

  const {
    title,
    description,
    founders,
    categories,
    image,
    social,
    mail,
    goalAmount,
    raisedAmount,
  } = data!;

  DEBUG &&
    console.log({
      title,
      description,
      founders,
      categories,
      image,
      social,
      mail,
      goalAmount,
      raisedAmount,
    });

  // rainbow kit txn handler
  const addRecentTransaction = useAddRecentTransaction();

  // custom hook we made in hooks.ts for writing functions
  const { writeAsync, isError } = useFundProjectFunctionWriter({
    contractAddress: publishedProjsAddress || '',
    functionName: 'makeDonation',
  });

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const inputValue = e.target.value;
    DEBUG && console.log('value: ', inputValue);

    // set value
    setValue(inputValue);
  };

  const handleDonate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const valueToWei = toWei(value);
      DEBUG && console.log('valueToWei: ', valueToWei);

      if (!writeAsync)
        throw Error('useFundProjectFunctionWriter Hook not working.');
      const tx = await writeAsync({
        recklesslySetUnpreparedOverrides: {
          value: valueToWei,
        },
      });

      addRecentTransaction({
        hash: tx.hash,
        description: `Donate ${value} MATIC`,
      });

      toast.success(`Donated ${value} MATIC to ${title}`);
    } catch (error: any) {
      console.log('errror >>> ', error);
      toast.error(error);
    }
  };

  if (
    !publishedProjsAddress ||
    !title ||
    !description ||
    !goalAmount ||
    !raisedAmount
  ) {
    return null;
  }

  return (
    <>
      {modal ? (
        <NFTModal data={data} closeModal={togelModal} key={projectNumber} />
      ) : null}
      <motion.div
        whileInView={{ y: [100, 0] }}
        transition={{
          delay: projectNumber * 0.2,
          ease: 'easeInOut',
          duration: 1,
        }}
        viewport={{ once: true }}
        className="max-w-sm rounded overflow-hidden shadow-lg pb-4 group cursor-pointer"
      >
        <img
          src={
            image ||
            'https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg'
          }
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform ease-in duration-200"
          alt={`${title} | Cover Image`}
        />
        <div className="px-6 py-4 space-y-2">
          <h3
            onClick={togelModal}
            className="font-bold text-xl py-2 group-hover:underline"
          >
            {title}
          </h3>
          <ul className="flex w-full flex-wrap">
            {categories.split(',').map((category, idx) => {
              return (
                <li
                  className="projectBadge whitespace-nowrap text-xs"
                  key={idx}
                >
                  #{category}
                </li>
              );
            })}
          </ul>
          <p className="text-gray-700 text-base line-clamp-2">{description}</p>
        </div>
        <div className="px-6">
          <span className="projectBadge">
            Goal Amount:
            <span className="text-froly-600"> {fromWei(goalAmount)} MATIC</span>
          </span>
          <span className="projectBadge">
            Raised Amount:
            <span className="text-froly-600">
              {' '}
              {fromWei(raisedAmount)} MATIC
            </span>
          </span>

          <div className="flex items-center py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              placeholder="0.000"
              min={0}
              step="0.001"
              required
              onChange={handleValue}
            />
            <button className="buttons" type="button" onClick={handleDonate}>
              Donate
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Campaign;
