import { ethers } from 'hardhat';

async function main() {
  const Blogging = await ethers.getContractFactory('Blogging');
  const blogging = await Blogging.deploy();

  await blogging.deployed();

  console.log(`deployed to ${blogging.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
