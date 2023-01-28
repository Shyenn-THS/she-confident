import {
  SignedPayload721WithQuantitySignature,
  ThirdwebSDK,
} from '@thirdweb-dev/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

type Phrase = {
  signature: SignedPayload721WithQuantitySignature;
};

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse<Phrase>,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("You're missing PRIVATE_KEY in your .env.local file.");
  }

  // Initialize the Thirdweb SDK on the serverside using the private key on the mumbai network
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, 'mumbai');

  // Load the NFT Collection via it's contract address using the SDK
  const contract = await sdk.getContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
    'nft-collection'
  );

  // Generate the signature for the NFT mint transaction
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  await runMiddleware(req, res, upload.single('image'));

  const { address, description, name } = req.body;
  const image = req.file;

  const signedPayload = await contract?.signature.generate({
    to: address,
    metadata: {
      name: name,
      image: image.buffer,
      description: description,
    },
  });

  res.status(200).send({ signature: signedPayload });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
