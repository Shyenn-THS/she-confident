import React from 'react';
import Campaigns from '../components/Campaigns';
import HeadingWithWallet from '../components/HeadingWithWallet';

type Props = {};

const Empower = (props: Props) => {
  return (
    <main className="px-4 space-y-10">
      <HeadingWithWallet heading="Empower Women Projects" />
      <Campaigns />
    </main>
  );
};

export default Empower;
