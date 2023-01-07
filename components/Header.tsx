import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Logo from './Logo';
import { useRouter } from 'next/router';
// import { ConnectButton } from '@rainbow-me/rainbowkit';

type Props = {};

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

const Header = (props: Props) => {
  const router = useRouter();
  const searchRef = useRef(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const term = searchRef.current?.value;
    router.push(`/search?term=${term}`);
  };

  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <div className="max-w-6xl mx-auto p-2">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm">
          {address ? (
            <button onClick={disconnect} className="connectWalletBtn">
              Hi, {address.slice(0, 5) + '...' + address.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWithMetamask} className="connectWalletBtn">
              Connect your wallet
            </button>
          )}

          {/* <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          /> */}

          <Link href="/my-profile" className="headerLink">
            My Profile
          </Link>
          <Link href="/contact" className="headerLink">
            Help &#38; Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link href="/empower" className="headerLink">
            Women Projects
          </Link>
          <Link href="/nft-marketplace" className="headerLink">
            NFT Marketplace
          </Link>
          <Link href="/confidence-guide" className="headerLink">
            Confidence Guide
          </Link>

          <Link href="/become-confident">
            <div className="flex items-center text-rajah-500 space-x-1 hover:link font-bold">
              <span>Become Confident</span>
              <StarIcon className="h-4" />
            </div>
          </Link>

          {/* <BellIcon className="h-6 w-6" />
          <ShoppingCartIcon className="h-6 w-6" /> */}
        </div>
      </nav>

      <hr className="mt-2" />

      <form
        onSubmit={handleSearch}
        className="flex flex-wrap items-center space-x-5 py-5"
      >
        <Logo />
        {/* <button className="hidden lg:flex items-center space-x-2 w-20">
          <p className="text-sm text-gray-600">Shop by Category</p>
          <ChevronDownIcon className="h-4 flex-shrink-0" />
        </button> */}

        <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black border-2 flex-1">
          <MagnifyingGlassIcon className="w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            id="searchBar"
            placeholder="Search for Anything"
            className="flex-1 outline-none"
            ref={searchRef}
          />
        </div>

        <button
          type="submit"
          className="hidden sm:inline bg-froly text-white px-5 md:px-10 py-2 border-2 border-froly-500"
        >
          Search
        </button>
        <Link
          type="button"
          href="/create"
          className="px-5 w-full sm:w-fit md:px-10 py-2 border-2 border-froly-500 text-froly-500 hover:bg-froly-500/50 hover:text-white cursor-pointer"
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
