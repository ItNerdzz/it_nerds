import React, { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { blogPostsData } from '@/data';
import { BlogPreview } from '@/components/blog';

import styles from './BlogArchive.module.css';

import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'IT Nerds | Блог',
    description: 'Блог команды IT Nerds',
  };
};

const BlogArchive: FC = () => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'large'}>
            Блог команды IT Nerds
          </Title>
          <div className={styles.posts}>
            {blogPostsData.map(blogPost => (
              <BlogPreview blogPost={blogPost} key={blogPost.id} />
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default BlogArchive;
