import { useContract, useContractRead, useContractWrite } from 'wagmi';
import BLOGLIST_ABI from '../abis/blogList.json';
import BLOG_ABI from '../abis/blog.json';
import { Blog, BlogList } from '../contracts/blogs-contract/src/types';
import { Result } from 'ethers/lib/utils.js';
import { BigNumber } from 'ethers';
import { BlogData } from '../interfaces/typings';

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

  if (!publishedBlog) return undefined;

  return publishedBlog;
}

export function useBlogListContract(): BlogList {
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_BLOGLIST_CONTRACT,
    abi: BLOGLIST_ABI,
  });

  return contract as BlogList;
}

// create a generic hook to access write functions of contract
export function useBlogListWriter(
  functionName: string
): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: process.env.NEXT_PUBLIC_BLOGLIST_CONTRACT,
    abi: BLOGLIST_ABI,
    functionName: functionName,
  });

  return contractWrite;
}

// create a generic hook to access read functions of contract
export function useBlogListReader({
  functionName,
  args,
}: {
  functionName: string;
  args: any[];
}): ReturnType<typeof useContractRead> {
  const contractRead = useContractRead({
    address: process.env.NEXT_PUBLIC_BLOGLIST_CONTRACT,
    abi: BLOGLIST_ABI,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}

export function useBlog(contractAddress: string): Blog {
  const contract = useContract({
    address: contractAddress,
    abi: BLOG_ABI,
  });

  return contract as Blog;
}

// create a generic hook to access write functions of contract
export function useBlogWriter({
  contractAddress,
  functionName,
}: {
  functionName: string;
  contractAddress: `0x${string}`;
}): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: functionName,
    mode: 'recklesslyUnprepared',
  });

  return contractWrite;
}

// create a generic hook to access read functions of contract
export const useBlogData = (contractAddress: `0x${string}`) => {
  const {
    data: title,
    isError: isTitleError,
    isLoading: isTitleLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'title',
  });

  const {
    data: description,
    isError: isDescriptionError,
    isLoading: isDescriptionLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'description',
  });

  const {
    data: owner,
    isError: isOwnerError,
    isLoading: isOwnerLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'owner',
  });

  const {
    data: categories,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'categories',
  });

  const {
    data: image,
    isError: isImageError,
    isLoading: isImageLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'image',
  });

  const {
    data: social,
    isError: isSocialError,
    isLoading: isSocialLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'social',
  });

  const {
    data: ownerWallet,
    isError: isOwnerWalletError,
    isLoading: isOwnerWalletLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'ownerWallet',
  });

  const {
    data: timestamp,
    isError: isTimestampError,
    isLoading: isTimestampLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'timestamp',
  });

  const {
    data: likes,
    isError: isLikesError,
    isLoading: isLikesLoading,
  } = useContractRead({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: 'like',
  });

  return {
    title,
    description,
    owner,
    categories,
    image,
    social,
    ownerWallet,
    timestamp,
    likes,
  } as BlogData;
};
