import { useContract, useContractRead, useContractWrite } from 'wagmi';
import BLOGLIST_ABI from '../../abis/blogList.json';
import BLOG_ABI from '../../abis/blog.json';
import { BLOGLIST_CONTRACT_ADDRESS } from '../../utils/constants';
import { Result } from 'ethers/lib/utils.js';
import { Blog, BlogList } from '../../blogscontract/src/types';
import { BlogData } from '../../typings';

// PROJECT
export function useBlogListContract(): BlogList {
  const contract = useContract({
    address: BLOGLIST_CONTRACT_ADDRESS,
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
    address: BLOGLIST_CONTRACT_ADDRESS,
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
    address: BLOGLIST_CONTRACT_ADDRESS,
    abi: BLOGLIST_ABI,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}

// FUND PROJECT
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
  contractAddress: string | Result;
}): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    address: contractAddress,
    abi: BLOG_ABI,
    functionName: functionName,
  });

  return contractWrite;
}

// create a generic hook to access read functions of contract
export function useBlogData(contractAddress: string | Result) {
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
    isError: isFoundersError,
    isLoading: isFoundersLoading,
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

  return {
    title,
    description,
    owner,
    categories,
    image,
    social,
  } as BlogData;
}
