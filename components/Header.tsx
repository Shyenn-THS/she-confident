import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { UIContext } from '../context/UIContext';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
import { HeartIcon } from '@heroicons/react/24/solid';

const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'NFT Marketplace',
    path: '/nft-marketplace',
  },
  {
    name: 'Become Confident',
    path: '/become-confident',
  },
  {
    name: 'Empower Women Projects',
    path: '/empower',
  },
  {
    name: 'Add Projects',
    path: '/add-project',
  },
  {
    name: 'Blogs',
    path: '/blogs',
  },
  {
    name: 'Add Blog',
    path: '/add-blog',
  },
  {
    name: 'Confidence Guide',
    path: '/confidence-guide',
  },
  {
    name: 'Support Us',
    path: '/support-us',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

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

  // Darkmode
  const { state, dispatch } = useContext(UIContext);
  const { darkMode } = state;

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
    return () => {};
  }, [darkMode]);

  return (
    <div className="max-w-6xl mx-auto p-2">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm">
          {address ? (
            <button onClick={disconnect} className="buttons">
              Hi, {address.slice(0, 5) + '...' + address.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWithMetamask} className="buttons">
              Connect your wallet
            </button>
          )}

          <Link href="/my-profile" className="link">
            My Profile
          </Link>
          <Link href="/contact" className="link">
            Help &#38; Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          {/* <Link href="/nft-marketplace" className="link">
            NFT Marketplace
          </Link>
          <Link href="/confidence-guide" className="link">
            Confidence Guide
          </Link> */}

          <div className="text-lg dark:text-text-color-primary cursor-pointer">
            {dark ? (
              <BsFillSunFill className="" onClick={darkModeChangeHandler} />
            ) : (
              <BsMoonFill className="" onClick={darkModeChangeHandler} />
            )}
          </div>

          <Link href="/claim" className="link">
            <div className="flex space-x-2 items-center text-froly-500">
              <span className="whitespace-nowrap"> Claim Rewards </span>
              <HeartIcon className="w-5 h-5" />
            </div>
          </Link>

          <Link href="/become-confident">
            <div className="flex items-center text-rajah-500 space-x-1 hover:link font-bold">
              <span>Become Confident</span>
              <StarIcon className="h-4" />
            </div>
          </Link>
        </div>
      </nav>

      <hr className="mt-2" />

      <form
        onSubmit={handleSearch}
        className="flex flex-wrap items-center space-x-5 py-5"
      >
        <Logo />

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

        <button
          type="submit"
          className="px-5 w-full sm:w-fit md:px-10 py-2 border-2 transition-colors ease-in-out duration-200 border-froly-500 text-froly-500 hover:bg-froly-400 hover:text-white cursor-pointer"
        >
          Search
        </button>
        <Link
          type="button"
          href="/create"
          className="bg-froly-500 text-white px-5 md:px-10 py-2 border-2 transition-colors ease-in-out duration-200 border-froly-700 hover:bg-froly-600"
        >
          List Your NFT
        </Link>
      </form>

      <hr />

      <ul className="flex justify-center items-center py-3 space-x-6 text-xs md:text-sm whitespace-nowrap">
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
