import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import network from '../utils/network';
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={network}>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  );
}

export default MyApp;
