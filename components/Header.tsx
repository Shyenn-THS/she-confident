import {
  useAddress,
  useContract,
  useDisconnect,
  useMetamask,
  useTokenBalance,
} from '@thirdweb-dev/react';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { useRouter } from 'next/router';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
import { HeartIcon } from '@heroicons/react/24/solid';
import { links } from '../utils/constants';
import useUiStore from '../store/uiStore';

const Header = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchRef.current?.value;
    router.push(`/search?term=${term}`);
  };

  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  const [darkMode, setDarkMode] = useUiStore((state) => [
    state.darkMode,
    state.setDarkMode,
  ]);

  const { contract: sheCoinContract } = useContract(
    process.env.NEXT_PUBLIC_SHECOIN_CONTRACT,
    'token'
  );
  const {
    data: balance,
    isLoading,
    error,
  } = useTokenBalance(sheCoinContract, address);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return () => {};
  }, [darkMode]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4 text-sm">
          {address ? (
            <div className="flex items-center space-x-2">
              <button onClick={disconnect} className="buttons">
                Hi, {address.slice(0, 5) + '...' + address.slice(-4)}
              </button>

              <h3 className="text-text-color-primary bg-rajah-600 py-2 px-4 text-sm rounded-md">
                {isLoading ? (
                  'Loading...'
                ) : error ? (
                  'Error'
                ) : (
                  <span>
                    {balance!.displayValue} {balance!.symbol}
                  </span>
                )}
              </h3>
            </div>
          ) : (
            <button onClick={() => connectWithMetamask()} className="buttons">
              Connect your wallet
            </button>
          )}

          <Link href="/my-profile" className="link hidden md:block">
            My Profile
          </Link>
          <Link href="/contact" className="link hidden md:block">
            Help &#38; Contact
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 text-sm">
          <div
            onClick={handleDarkMode}
            className="text-lg dark:text-text-color-primary cursor-pointer"
          >
            {darkMode ? <BsFillSunFill /> : <BsMoonFill />}
          </div>

          <Link href="/claim" className="link">
            <div className="flex space-x-2 items-center text-froly-500">
              <span className="whitespace-nowrap hidden lg:block">
                {' '}
                Claim Rewards{' '}
              </span>
              <HeartIcon className="w-5 h-5" />
            </div>
          </Link>

          <Link href="/become-confident">
            <div className="flex items-center text-rajah-500 space-x-1 hover:link font-bold">
              <span className="hidden lg:block">Become Confident</span>
              <StarIcon className="h-4" />
            </div>
          </Link>
        </div>
      </nav>

      <hr className="mt-2" />

      <form
        onSubmit={handleSearch}
        className="flex flex-col w-full space-y-4 sm:space-y-0 sm:flex-row items-center sm:space-x-5 py-5"
      >
        <div className="w-full items-center flex space-x-2 sm:space-x-5">
          <Logo />
          <div className="flex flex-1 space-x-5 items-center">
            <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black dark:bg-background-secondary border-2 flex-1">
              <MagnifyingGlassIcon className="w-5 text-text-color-tertiary" />
              <input
                type="text"
                name="search"
                id="searchBar"
                placeholder="Search for Anything"
                className="flex-1 outline-none bg-transparent dark:text-text-color-tertiary"
                ref={searchRef}
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 hidden lg:block w-fit md:px-10 py-2 border-2 transition-colors ease-in-out duration-200 border-froly-500 text-froly-500 hover:bg-froly-400 hover:text-white cursor-pointer"
          >
            Search
          </button>
        </div>

        <Link
          type="button"
          href="/create"
          className="bg-froly-500 text-white px-5 md:px-10 py-2 border-2 transition-colors ease-in-out duration-200 border-froly-700 hover:bg-froly-600 w-full sm:w-fit whitespace-nowrap text-center"
        >
          List Your NFT
        </Link>
      </form>

      <hr />

      <ul className="flex flex-wrap gap-4 xl:gap-0 justify-center items-center py-3 xl:space-x-6 text-sm whitespace-nowrap">
        {links.map((link, idx) => {
          const { name, path } = link;
          return (
            <Link key={idx} href={path} className="link">
              {name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
