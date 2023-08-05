import { useEffect, useState } from 'react';
import Campaign from './Campaign';
import { Result } from 'ethers/lib/utils.js';
import { useTotalPublishedProjs } from '../hooks/projectHooks';

function Campaigns() {
  const [totalPublishedProjs, setTotalPublishedProjs] = useState<
    number | undefined | Result
  >(undefined);

  const getProjects = useTotalPublishedProjs();

  useEffect(() => {
    setTotalPublishedProjs(getProjects);
  }, [getProjects]);

  if (!totalPublishedProjs) {
    return <div className="font-bold text-xl mb-2">No Projects yet!</div>;
  }

  return (
    <main className="dark:text-text-color-primary">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
