import { BigNumber } from 'ethers';
import { IconBaseProps } from 'react-icons/lib';

export type Campaign = {
  title: string;
  founders: string;
  description: string;
  categories: string;
  image: string;
  social: string;
  mail: string;
  story: string;
  amount: number;
  goalAmount: BigNumber;
  raisedAmount: BigNumber;
};

export type BlogData = {
  title: string;
  owner: string;
  description: string;
  categories: string;
  image: string;
  social: string;
  ownerWallet: string;
  timestamp: number;
};

export type Phrase = {
  phrase: string;
  owner: string;
};

export type Transcribed = {
  text: string;
  similarity: string;
};

export type KeyPointProps = {
  description: string;
  name: string;
  Icon: FC<IconBaseProps>;
};

export type ModalContent = {
  title: string;
  confirmTitle: string;
  action: any;
  description: string;
  possitive?: boolean;
};

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
}
