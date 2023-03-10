/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ProjectInterface extends utils.Interface {
  functions: {
    "createProject(string,string,string,string,string,string,string,uint256)": FunctionFragment;
    "publishedProjs(uint256)": FunctionFragment;
    "totalPublishedProjs()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createProject"
      | "publishedProjs"
      | "totalPublishedProjs"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createProject",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "publishedProjs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalPublishedProjs",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publishedProjs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalPublishedProjs",
    data: BytesLike
  ): Result;

  events: {
    "ProjectCreated(string,string,string,string,string,string,string,uint256,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProjectCreated"): EventFragment;
}

export interface ProjectCreatedEventObject {
  title: string;
  description: string;
  founders: string;
  categories: string;
  image: string;
  social: string;
  mail: string;
  goalAmount: BigNumber;
  ownerWallet: string;
  projAddress: string;
  timestamp: BigNumber;
}
export type ProjectCreatedEvent = TypedEvent<
  [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    string,
    string,
    BigNumber
  ],
  ProjectCreatedEventObject
>;

export type ProjectCreatedEventFilter = TypedEventFilter<ProjectCreatedEvent>;

export interface Project extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ProjectInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createProject(
      projectTitle: PromiseOrValue<string>,
      projDescription: PromiseOrValue<string>,
      projFounders: PromiseOrValue<string>,
      projCategories: PromiseOrValue<string>,
      projImage: PromiseOrValue<string>,
      projSocial: PromiseOrValue<string>,
      projMail: PromiseOrValue<string>,
      projGoalAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    publishedProjs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    totalPublishedProjs(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  createProject(
    projectTitle: PromiseOrValue<string>,
    projDescription: PromiseOrValue<string>,
    projFounders: PromiseOrValue<string>,
    projCategories: PromiseOrValue<string>,
    projImage: PromiseOrValue<string>,
    projSocial: PromiseOrValue<string>,
    projMail: PromiseOrValue<string>,
    projGoalAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  publishedProjs(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  totalPublishedProjs(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    createProject(
      projectTitle: PromiseOrValue<string>,
      projDescription: PromiseOrValue<string>,
      projFounders: PromiseOrValue<string>,
      projCategories: PromiseOrValue<string>,
      projImage: PromiseOrValue<string>,
      projSocial: PromiseOrValue<string>,
      projMail: PromiseOrValue<string>,
      projGoalAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    publishedProjs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    totalPublishedProjs(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "ProjectCreated(string,string,string,string,string,string,string,uint256,address,address,uint256)"(
      title?: null,
      description?: null,
      founders?: null,
      categories?: null,
      image?: null,
      social?: null,
      mail?: null,
      goalAmount?: null,
      ownerWallet?: PromiseOrValue<string> | null,
      projAddress?: null,
      timestamp?: PromiseOrValue<BigNumberish> | null
    ): ProjectCreatedEventFilter;
    ProjectCreated(
      title?: null,
      description?: null,
      founders?: null,
      categories?: null,
      image?: null,
      social?: null,
      mail?: null,
      goalAmount?: null,
      ownerWallet?: PromiseOrValue<string> | null,
      projAddress?: null,
      timestamp?: PromiseOrValue<BigNumberish> | null
    ): ProjectCreatedEventFilter;
  };

  estimateGas: {
    createProject(
      projectTitle: PromiseOrValue<string>,
      projDescription: PromiseOrValue<string>,
      projFounders: PromiseOrValue<string>,
      projCategories: PromiseOrValue<string>,
      projImage: PromiseOrValue<string>,
      projSocial: PromiseOrValue<string>,
      projMail: PromiseOrValue<string>,
      projGoalAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    publishedProjs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalPublishedProjs(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createProject(
      projectTitle: PromiseOrValue<string>,
      projDescription: PromiseOrValue<string>,
      projFounders: PromiseOrValue<string>,
      projCategories: PromiseOrValue<string>,
      projImage: PromiseOrValue<string>,
      projSocial: PromiseOrValue<string>,
      projMail: PromiseOrValue<string>,
      projGoalAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    publishedProjs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalPublishedProjs(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
