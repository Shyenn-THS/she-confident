import { ethers } from 'hardhat';

async function main() {
  const ProjectFactory = await ethers.getContractFactory('Project');

  // Start deployment, returning a promise that resolves to a contract object
  const projectFactory = await ProjectFactory.deploy();
  console.log('Contract deployed to address:', projectFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
