import { useEffect, useState } from 'react';
import { DEBUG } from '../utils/constants';
import { useTotalPublishedProjs } from '../utils/read';
import Campaign from './Campaign';
import { motion } from 'framer-motion';
import { Result } from 'ethers/lib/utils.js';

function Campaigns() {
  const [totalPublishedProjs, setTotalPublishedProjs] = useState<
    number | undefined | Result
  >(undefined);
  const getProjects = useTotalPublishedProjs();

  useEffect(() => {
    setTotalPublishedProjs(getProjects);
  }, [getProjects]);

  DEBUG &&
    console.log('totalPublishedProjs: ', totalPublishedProjs?.toString());

  // if totalPublishedProjs not present return nothing
  if (!totalPublishedProjs) {
    return <div className="font-bold text-xl mb-2">No Projects yet!</div>;
  }

  return (
    <main className="dark:text-text-color-primary">
      <motion.h1
        animate={{ y: [50, 0] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="text-center font-bold text-3xl mb-2"
      >
        Empower Women Projects
      </motion.h1>
      <div className="py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {/* create an array starting from 0 index  */}
        {Array.from(Array(totalPublishedProjs).keys()).map(
          (projectNumber: number, i) => {
            return (
              <div key={i}>
                <Campaign projectNumber={projectNumber} />
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}

export default Campaigns;
