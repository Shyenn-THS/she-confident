import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Barlow_Condensed } from '@next/font/google';
import { SparklesIcon } from '@heroicons/react/24/solid';
const logo_font = Barlow_Condensed({
  weight: '600',
  style: 'italic',
  subsets: ['latin'],
});

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      href="/"
      className="h-14 sm:h-16 w-fit flex justify-center items-center cursor-pointer flex-shrink-0"
    >
      <Image
        src="/logo.svg"
        className="h-full w-full object-contain"
        alt="SheConfident"
        width={100}
        height={100}
      />
      <h1
        className={`${logo_font.className} hidden sm:flex text-3xl text-cascade-800 -space-y-2 flex-col`}
      >
        <span className="text-froly flex space-x-5 items-center">
          She <SparklesIcon className="w-5 h-5" />
        </span>{' '}
        <span className="dark:text-text-color-primary">Confident</span>
      </h1>
    </Link>
  );
};

export default Logo;
