import type { BigNumber } from 'ethers';
import type { Result } from 'ethers/lib/utils';
import { BlogList } from '../../blogscontract/src/types';
import { DEBUG } from '../constants';
import { useBlogListReader } from './blogsHook';

/*//////////////////////////////////////////////////////////////
                            BLOGS
//////////////////////////////////////////////////////////////*/

export function useTotalPublishedBlogs(): number | Result | undefined {
  const totalPublishedBlogReader = useBlogListReader({
    functionName: 'totalPublishedBlogs',
    args: [],
  });
  const totalPublishedBlogs:
    | Awaited<ReturnType<BlogList['totalPublishedBlogs']>>
    | Result
    | undefined = totalPublishedBlogReader.data as
    | BigNumber
    | Result
    | undefined;

  DEBUG &&
    console.log('totalPublishedBlogs: ', totalPublishedBlogs?.toString());

  if (!totalPublishedBlogs) return undefined;

  return parseInt(totalPublishedBlogs.toString()) as number;
}

export function usePublishedBlog(index: number): `0x${string}` | undefined {
  const publishedBlogListReader = useBlogListReader({
    functionName: 'publishedBlogs',
    args: [index],
  });
  const publishedBlog = publishedBlogListReader.data as
    | `0x${string}`
    | undefined;

  DEBUG && console.log('publishedBlog: ', publishedBlog);

  if (!publishedBlog) return undefined;

  return publishedBlog;
}
