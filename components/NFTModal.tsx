import { XMarkIcon } from '@heroicons/react/24/solid';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import React from 'react';
import { fromWei } from '../utils/utilityFunctions';
import { Campaign } from '../interfaces/typings';

type Props = {
  data: any;
  closeModal: any;
};

const NFTModal = (props: Props) => {
  const { data, closeModal } = props;

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
  } = data as Campaign;

  return (
    <div className="w-screen h-screen fixed bg-black bg-opacity-60 top-0 left-0 z-10 flex justify-center items-center">
      <div className="relative flex max-h-[600px] overflow-y-auto flex-col max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 text-gray-100 scrollbar-thin scrollbar-thumb-froly-500 scrollbar-track-gray-100">
        <XMarkIcon
          className="w-5 h-5 absolute top-5 right-5 cursor-pointer"
          onClick={closeModal}
        />
        <img src={image} alt={title} className="h-40 object-cover" />
        <h2 className="text-2xl font-semibold leading-tight text-center tracking-wide">
          {title}
        </h2>
        <ul className="flex justify-center w-full flex-wrap">
          {categories.split(',').map((category, idx) => {
            return (
              <li className="projectBadge whitespace-nowrap text-xs" key={idx}>
                #{category}
              </li>
            );
          })}
        </ul>

        <div className="space-y-2">
          <h3 className="text-cascade-100 text-lg font-medium">Description</h3>
          <p className="flex-1 text-left text-sm text-cascade-200">
            {description}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-cascade-100 text-lg font-medium">Founders</h3>
          <p className="flex-1 text-left text-sm text-cascade-200">
            {founders}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-cascade-100 text-lg font-medium">Mail</h3>
          <Link
            href={`mailto:${mail}`}
            className="flex-1 text-left text-sm text-blue-500"
          >
            {mail}
          </Link>
        </div>

        <div className="space-y-2">
          <h3 className="text-cascade-100 text-lg font-medium">
            Raised and Goal Amount
          </h3>
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
        </div>

        <div className="space-y-2">
          <h3 className="text-cascade-100 text-lg font-medium">Social</h3>
          <ul className="flex space-x-2 w-full flex-wrap">
            {social.split(',').map((socialLink, idx) => {
              return (
                <SocialIcon
                  bgColor="#f5cac3"
                  fgColor="#2b3635"
                  url={socialLink}
                  key={idx}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NFTModal;
