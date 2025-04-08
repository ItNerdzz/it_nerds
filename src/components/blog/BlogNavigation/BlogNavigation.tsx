import React, { FC } from 'react';
import Link from 'next/link';

import { Wrapper } from '@/components/layout';
import { BlogPost } from '@/components/blog';

import styles from './BlogNavigation.module.css';

interface BlogOtherProps {
  posts: [BlogPost, BlogPost];
}

const BlogNavigation: FC<BlogOtherProps> = ({ posts }) => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.posts}>
            <Link className={styles.postPreview} href={`/blog/${posts[0].id}`}>
              <span className={styles.navName}>Предыдущая запись</span>
              <p className={styles.postTitle}>{posts[0].title}</p>
            </Link>
            <Link className={styles.postPreview} href={`/blog/${posts[0].id}`}>
              <span className={styles.navName}>Следующая запись</span>
              <p className={styles.postTitle}>{posts[1].title}</p>
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default BlogNavigation;
