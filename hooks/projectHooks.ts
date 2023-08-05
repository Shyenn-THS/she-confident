import { useContract, useContractRead, useContractWrite } from 'wagmi';
import PROJECT_ABI from '../abis/project.json';
import FUNDPROJECT_ABI from '../abis/fundProject.json';
import {
  FundProject,
  Project,
} from '../contracts/crowd-funding-contract/src/types';
import { Result } from 'ethers/lib/utils.js';
import { Campaign } from '../interfaces/typings';
import { BigNumber } from 'ethers';

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

  if (!totalPublishedProjs) return undefined;

  return parseInt(totalPublishedProjs.toString()) as number;
}

export function usePublishedProjs(index: number): `0x${string}` | undefined {
  const publishedProjsReader = useProjectFunctionReader({
    functionName: 'publishedProjs',
    args: [index],
  });
  const publishedProjs = publishedProjsReader.data as `0x${string}` | undefined;

  if (!publishedProjs) return undefined;

  return publishedProjs;
}

export function useProjectContract(): Project {
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_PROJECT_CONTRACT,
    abi: PROJECT_ABI,
  });

  return contract as Project;
}

// create a generic hook to access write functions of contract
export function useProjectFunctionWriter(
  functionName: string
): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: process.env.NEXT_PUBLIC_PROJECT_CONTRACT,
    abi: PROJECT_ABI,
    functionName: functionName,
  });

  return contractWrite;
}

// create a generic hook to access read functions of contract
export function useProjectFunctionReader({
  functionName,
  args,
}: {
  functionName: string;
  args: any[];
}): ReturnType<typeof useContractRead> {
  const contractRead = useContractRead({
    address: process.env.NEXT_PUBLIC_PROJECT_CONTRACT,
    abi: PROJECT_ABI,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}

// FUND PROJECT
export function useFundProjectContract(contractAddress: string): FundProject {
  const contract = useContract({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
  });

  return contract as FundProject;
}

// create a generic hook to access write functions of contract
export function useFundProjectFunctionWriter({
  contractAddress,
  functionName,
}: {
  functionName: string;
  contractAddress: `0x${string}`;
}): ReturnType<typeof useContractWrite> {
  const contractWrite = useContractWrite({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: functionName,
    mode: 'recklesslyUnprepared',
  });

  return contractWrite;
}

// create a generic hook to access read functions of contract
export function useFundProjectData(contractAddress: `0x${string}`) {
  const {
    data: title,
    isError: isTitleError,
    isLoading: isTitleLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'title',
  });
  const {
    data: description,
    isError: isDescriptionError,
    isLoading: isDescriptionLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'description',
  });
  const {
    data: founders,
    isError: isFoundersError,
    isLoading: isFoundersLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'founders',
  });
  const {
    data: categories,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'categories',
  });
  const {
    data: image,
    isError: isImageError,
    isLoading: isImageLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'image',
  });
  const {
    data: social,
    isError: isSocialError,
    isLoading: isSocialLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'social',
  });
  const {
    data: mail,
    isError: isMailError,
    isLoading: isMailLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'mail',
  });
  const {
    data: goalAmount,
    isError: isGoalAmountError,
    isLoading: isGoalAmountLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'goalAmount',
  });
  const {
    data: raisedAmount,
    isError: isRaisedAmountError,
    isLoading: isRaisedAmountLoading,
  } = useContractRead({
    address: contractAddress,
    abi: FUNDPROJECT_ABI,
    functionName: 'raisedAmount',
  });

  return {
    title,
    description,
    founders,
    categories,
    image,
    social,
    mail,
    goalAmount,
    raisedAmount,
  } as Campaign;
}
