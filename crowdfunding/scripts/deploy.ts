import { ethers } from 'hardhat';

async function main() {
  const CampaignFactory = await ethers.getContractFactory('Project');

  // Start deployment, returning a promise that resolves to a contract object
  const campaignFactory = await CampaignFactory.deploy();
  console.log('Contract deployed to address:', campaignFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });