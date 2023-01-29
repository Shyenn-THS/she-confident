import { useContract, useContractRead, useContractWrite } from 'wagmi';
import PROJECT_ABI from '../abis/project.json';
import FUNDPROJECT_ABI from '../abis/fundProject.json';
import { PROJECT_CONTRACT_ADDRESS } from '../utils/constants';
import { FundProject, Project } from '../crowdfunding/src/types';
import { Result } from 'ethers/lib/utils.js';
import { Campaign } from '../typings';

// PROJECT
export function useProjectContract(): Project {
  const contract = useContract({
    address: PROJECT_CONTRACT_ADDRESS,
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
    address: PROJECT_CONTRACT_ADDRESS,
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
    address: PROJECT_CONTRACT_ADDRESS,
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
