import { run } from 'hardhat';
import { config } from 'dotenv';
config();

async function main() {
  const { PUBLIC_ADDRESS } = process.env;
  const contractAddress = PUBLIC_ADDRESS;

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: [],
      contract: 'contracts/crowdfunding.sol:Project',
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
