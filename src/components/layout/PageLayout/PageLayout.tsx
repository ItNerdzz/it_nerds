import React, { FC } from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
    </div>
  );
};

export default PageLayout;