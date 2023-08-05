import React, { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="dark:bg-background-primary pt-2">
      <Header />
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <main className="max-w-6xl mx-auto py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
