import type { BigNumber } from 'ethers';
import type { Result } from 'ethers/lib/utils';

import { DEBUG } from './constants';
import { Project } from '../crowdfunding/src/types';
import { useProjectFunctionReader } from './hooks';

/*//////////////////////////////////////////////////////////////
                              PROJECT
//////////////////////////////////////////////////////////////*/

export function useTotalPublishedProjs(): number | Result | undefined {
  const totalPublishedProjsReader = useProjectFunctionReader({
    functionName: 'totalPublishedProjs',
    args: [],
  });
  const totalPublishedProjs:
    | Awaited<ReturnType<Project['totalPublishedProjs']>>
    | Result
    | undefined = totalPublishedProjsReader.data as
    | BigNumber
    | Result
    | undefined;

  DEBUG &&
    console.log('totalPublishedProjs: ', totalPublishedProjs?.toString());

  if (!totalPublishedProjs) return undefined;

  return parseInt(totalPublishedProjs.toString()) as number;
}

export function usePublishedProjs(index: number): string | Result | undefined {
  const publishedProjsReader = useProjectFunctionReader({
    functionName: 'publishedProjs',
    args: [index],
  });
  const publishedProjs:
    | Awaited<ReturnType<Project['publishedProjs']>>
    | Result
    | undefined = publishedProjsReader.data as string | Result | undefined;

  DEBUG && console.log('publishedProjs: ', publishedProjs);

  if (!publishedProjs) return undefined;

  return publishedProjs;
}
