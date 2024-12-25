import React, { FC, PropsWithChildren } from 'react';

import { Wrapper } from '@/components/layout';

import styles from './PostContent.module.css';

const PostContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>{children}</div>
      </Wrapper>
    </section>
  );
};

export default PostContent;
