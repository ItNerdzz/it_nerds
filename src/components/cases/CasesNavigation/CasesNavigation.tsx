import React, { FC } from 'react';

import { Wrapper } from '@/components/layout/';
import { Title } from '@/components/ui';
import { CasesPost } from '@/components/cases/interfaces';
import { CasePreview } from '@/components/cases';

import styles from './CasesNavigation.module.css';

interface CasesNavigationProps {
  posts: CasesPost[] | [];
}

const CasesNavigation: FC<CasesNavigationProps> = ({ posts }) => {
  if (!posts || !posts.length || posts.length > 2) return null;

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Другие наши проекты
          </Title>
          <div className={styles.posts}>
            {posts && posts.length > 0 && posts.map(post => <CasePreview casesPost={post} key={post.id} />)}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CasesNavigation;
