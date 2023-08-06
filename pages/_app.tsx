import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import Layout from '../components/Layout';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: 'https://rpc.ankr.com/polygon_mumbai',
        };
      },
    }),
    publicProvider(),
  ]
);

const wallets = [
  injectedWallet({ chains }),
  rainbowWallet({ chains }),
  metaMaskWallet({ chains }),
  coinbaseWallet({ chains, appName: 'My App' }),
  walletConnectWallet({ chains }),
];

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets,
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        chains={chains}
        coolMode
      >
        <ThirdwebProvider activeChain="mumbai">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
