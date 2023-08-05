import { run, ethers } from 'hardhat';
import { config } from 'dotenv';
config();

const { QUERY_ADDRESS } = process.env;

async function main() {
  //replace contractAddress with the one we saved above querying the 0th publishedProj
  const contractAddress = QUERY_ADDRESS; //line5
  const args = [
    'SheConfident',
    'Women empowerment platform that focus on generating NFT for confident faces of women and help them gain confidence on camera and ability to list them on our marketplace to earn.',
    'Shivang Mishra',
    'Computer Vision',
    'https://i.ibb.co/fd79Sdh/android-chrome-512x512.png',
    'https://github.com/Shyenn-THS',
  ];

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
      contract: 'contracts/Blogging.sol:Blog',
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
