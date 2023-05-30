import React, { FC } from 'react';
import CountUp from 'react-countup';
import { useActiveListings, useContract } from '@thirdweb-dev/react';
import { useTotalPublishedProjs } from '../utils/read';
import { IconBaseProps } from 'react-icons/lib';
import { BiNotepad } from 'react-icons/bi';
import { FaDonate } from 'react-icons/fa';
import { RiFundsFill } from 'react-icons/ri';
import { MdCollections } from 'react-icons/md';

const Stats = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );

  const { data: listings, isLoading } = useActiveListings(contract);
  const totalProjects = useTotalPublishedProjs();

  const StatsCard = ({
    name,
    value,
    Icon,
  }: {
    name: string;
    value: number;
    Icon: FC<IconBaseProps>;
  }) => {
    return (
      <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-froly dark:bg-froly-500">
        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 text-mandys-pink-100">
          <Icon className="text-4xl" />
        </div>
        <div className="flex flex-col justify-center align-middle">
          <p className="text-3xl font-semibold text-white leading-none">
            <CountUp end={value} duration={1} />+
          </p>
          <p className="capitalize text-froly-200">{name}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="p-6 bg-mandys-pink dark:bg-background-secondary">
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard name="NFTs" value={listings?.length!} Icon={MdCollections} />
        {totalProjects ? (
          <StatsCard
            name="Projects"
            value={totalProjects.toPrecision(2)}
            Icon={RiFundsFill}
          />
        ) : (
          <StatsCard name="Projects" value={0} Icon={RiFundsFill} />
        )}
        <StatsCard name="Supporters" value={10} Icon={FaDonate} />
        <StatsCard name="Blogs" value={6} Icon={BiNotepad} />
      </div>
    </section>
  );
};

export default Stats;
