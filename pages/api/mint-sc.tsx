import {
  SignedPayload721WithQuantitySignature,
  ThirdwebSDK,
} from '@thirdweb-dev/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SC_ADDRESS } from '../../utils/constants';

type Response = {
  state?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse<Response>
) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("You're missing PRIVATE_KEY in your .env.local file.");
  }

  // Initialize the Thirdweb SDK on the serverside using the private key on the mumbai network
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, 'mumbai');

  // Load the NFT Collection via it's contract address using the SDK
  const contract = await sdk.getContract(SC_ADDRESS, 'token');

  const userAddress: string = req.body.userAddress;

  contract
    .mintTo(userAddress, 0.1)
    .then(() => {
      res.status(200).send({ state: 'Success' });
    })
    .catch((err: any) => {
      res.status(400).send({ error: err.message });
    });
};

export default handler;
