import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import network from '../utils/network';
import Layout from '../components/Layout';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from 'react-hot-toast';
import { UIProvider } from '../context/UIContext';

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
  // {
  //   groupName: 'Others',
  //   wallets: [
  //     wallet.argent({ chains }),
  //     wallet.brave({
  //       chains,
  //       shimDisconnect: true,
  //     }),
  //     wallet.imToken({ chains }),
  //     wallet.injected({
  //       chains,
  //       shimDisconnect: true,
  //     }),
  //     wallet.ledger({
  //       chains,
  //     }),
  //     wallet.steak({ chains }),
  //     wallet.trust({ chains, shimDisconnect: true }),
  //   ],
  // },
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
        <ThirdwebProvider desiredChainId={network}>
          <Toaster
            toastOptions={{
              duration: 5000,
            }}
          />
          <UIProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UIProvider>
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
