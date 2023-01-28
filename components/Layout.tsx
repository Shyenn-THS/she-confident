import React, { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="dark:bg-background-primary pt-2">
      <Header />
      <main className="max-w-6xl mx-auto py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
