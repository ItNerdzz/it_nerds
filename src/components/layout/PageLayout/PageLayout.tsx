import React, { FC } from 'react';

import { Header, Footer } from '@/components/layout';
import { CallBackModal } from '@/components/common';

import styles from './PageLayout.module.css';

interface IPageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <main>{children}</main>
      <Footer />
      <CallBackModal />
    </div>
  );
};

export default PageLayout;
