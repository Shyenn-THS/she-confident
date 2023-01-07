import React from 'react';
import CreateCampaign from '../components/CreateCampaign';
import ForInvestorsBanner from '../components/ForInvestorsBanner';

type Props = {};

const AddProject = (props: Props) => {
  return (
    <main>
      <ForInvestorsBanner />
      <CreateCampaign />
    </main>
  );
};

export default AddProject;
