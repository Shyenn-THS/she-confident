import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

type Props = {
  heading: string;
};

const HeadingWithWallet = ({ heading }: Props) => {
  return (
    <div className="py-8 px-12 my-6 bg-froly-500 rounded flex w-full justify-between">
      <h1 className="text-4xl text-white">{heading}</h1>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </div>
  );
};

export default HeadingWithWallet;
