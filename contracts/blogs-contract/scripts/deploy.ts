import { ethers } from 'hardhat';

async function main() {
  const BlogList = await ethers.getContractFactory('BlogList');

  // Start deployment, returning a promise that resolves to a contract object
  const blogList = await BlogList.deploy();
  console.log('Contract deployed to address:', blogList.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
