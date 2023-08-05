import { ethers } from 'hardhat';
import { config } from 'dotenv';
config();

const { PUBLIC_ADDRESS } = process.env;

async function main() {
  const contract = await ethers.getContractAt(
    'BlogList',
    PUBLIC_ADDRESS!
  );

  await contract.createBlog(
    'SheConfident',
    'Women empowerment platform that focus on generating NFT for confident faces of women and help them gain confidence on camera and ability to list them on our marketplace to earn.',
    'Shivang Mishra',
    'Computer Vision',
    'https://i.ibb.co/fd79Sdh/android-chrome-512x512.png',
    'https://github.com/Shyenn-THS'
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
