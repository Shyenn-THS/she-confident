import { collection, Firestore, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/firebase';

type Phrase = {
  phrase: string;
  owner: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Phrase>
) {
  async function getPhrases(db: Firestore) {
    const citiesCol = collection(db, 'phrases');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    return cityList;
  }

  const phrases = (await getPhrases(db)) as Phrase[];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  res.status(200).send(randomPhrase);
}
