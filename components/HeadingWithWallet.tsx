import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  heading: string;
};

const HeadingWithWallet = ({ heading }: Props) => {
  return (
    <motion.div
      animate={{ y: [50, 0] }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="py-4 lg:py-8 px-6 lg:px-12 bg-froly-500 rounded flex w-full justify-between"
    >
      <h1 className="text-xl sm:text-3xl lg:text-4xl text-white">{heading}</h1>
      <ConnectButton showBalance={false} />
    </motion.div>
  );
};

export default HeadingWithWallet;
