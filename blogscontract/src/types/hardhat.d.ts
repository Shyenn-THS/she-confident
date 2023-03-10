/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Blog",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Blog__factory>;
    getContractFactory(
      name: "BlogList",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlogList__factory>;

    getContractAt(
      name: "Blog",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Blog>;
    getContractAt(
      name: "BlogList",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BlogList>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
