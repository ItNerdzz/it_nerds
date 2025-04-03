import React, { FC } from 'react';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { BlogPost } from '@/components/blog';

import styles from './BlogInfo.module.css';

const BlogInfo: FC<{ blogPost: BlogPost }> = ({ blogPost }) => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'large'} as={'h1'}>
            {blogPost.title}
          </Title>
          <Image className={styles.preview} src={blogPost.preview} width={1920} height={1080} alt={''} />
          <p className={styles.readingTime}>Время прочтения: {blogPost.readingTime} мин.</p>
          <p>{blogPost.date}</p>
        </div>
      </Wrapper>
    </section>
  );
};

export default BlogInfo;
