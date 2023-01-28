import { ethers } from 'hardhat';

async function main() {
  const BlogList = await ethers.getContractFactory('BlogList');
  const blogging = await BlogList.deploy();

  await blogging.deployed();

  console.log('Contract deployed to address:', blogging.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
