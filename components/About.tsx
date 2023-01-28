import React from 'react';
import { MdCollections, MdFaceRetouchingNatural } from 'react-icons/md';
import { BiHappyBeaming, BiNotepad } from 'react-icons/bi';
import { RiFundsFill } from 'react-icons/ri';
import { FaDonate } from 'react-icons/fa';
import { KeyPointProps } from '../typings';

const points = [
  {
    name: 'Get Confident',
    description:
      'Use our AI model to determine and improve your confidence on camera and also in real life.',
    Icon: BiHappyBeaming,
  },
  {
    name: 'Raise Funding',
    description:
      'Raise funding to support your projects, let your dreams take a jump.',
    Icon: RiFundsFill,
  },
  {
    name: 'NFT Marketplace',
    description:
      'Generate NFT from your confident face and sell it on our marketplace, by creating auctions or by direct lisitng.',
    Icon: MdFaceRetouchingNatural,
  },
  {
    name: 'Collect NFTs',
    description:
      'Collect unique NFTs from our market place and support womens by purchasing their confident movements.',
    Icon: MdCollections,
  },
  {
    name: 'Support Projects',
    description:
      'Support womens by funding their ideas and supporting their startups. Or contact creators regarding their idea.',
    Icon: FaDonate,
  },
  {
    name: 'Explore Blogs',
    description:
      'Create / Read blogs on women empowerment, and also grow your knwoledge from our community.',
    Icon: BiNotepad,
  },
];

const About = () => {
  const KeyPointCard = (props: KeyPointProps) => {
    const { description, name, Icon } = props;
    return (
      <div className="flex flex-col items-center p-4">
        <Icon className="text-6xl text-froly-400 dark:text-froly-500" />
        <h3 className="my-3 text-3xl font-semibold">{name}</h3>
        <div className="space-y-1 text-text-color-secondary dark:text-text-color-tertiary text-center w-3/4 leading-tight">
          <p>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="my-16 bg-white-linen-50 dark:text-text-color-primary dark:bg-background-secondary rounded-lg py-6">
      <div className="container mx-auto p-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">Built to empower every Women</h2>
        <p className="dark:text-text-color-tertiary text-text-color-secondary">
          A decentralized platform build to empower and support womens on their
          journey.
        </p>
      </div>
      <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point, idx) => {
          const { name, description, Icon } = point;
          return (
            <KeyPointCard
              key={idx}
              name={name}
              description={description}
              Icon={Icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default About;
