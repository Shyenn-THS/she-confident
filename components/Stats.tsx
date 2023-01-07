import { PhotoIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';
import CountUp from 'react-countup';
import { useActiveListings, useContract } from '@thirdweb-dev/react';
import { IconBaseProps } from 'react-icons/lib';

type Props = {};

const Stats = (props: Props) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );

  const { data: listings, isLoading } = useActiveListings(contract);

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
      <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-froly">
        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-mandys-pink-300">
          <Icon className="h-8 w-8" />
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
    <section className="p-6 my-6 bg-mandys-pink">
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard name="NFTs" value={listings?.length!} Icon={PhotoIcon} />
        <StatsCard name="Projects" value={0} Icon={PhotoIcon} />
        <StatsCard name="Blogs" value={100} Icon={PhotoIcon} />
        <StatsCard name="NFTs" value={200} Icon={PhotoIcon} />
      </div>
    </section>
  );
};

export default Stats;
