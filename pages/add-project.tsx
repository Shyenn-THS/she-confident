import React from 'react';
import CreateCampaign from '../components/CreateCampaign';
import ForInvestorsBanner from '../components/ForInvestorsBanner';
import HeadingWithWallet from '../components/HeadingWithWallet';

type Props = {};

const AddProject = (props: Props) => {
  return (
    <main className="px-4 space-y-10">
      <ForInvestorsBanner />
      <HeadingWithWallet heading="Create new project listing" />
      <CreateCampaign />
    </main>
  );
};

export default AddProject;
