import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BlogPost } from '@/components/blog';
import { Title } from '@/components/ui';

import styles from './BlogPreview.module.css';

const BlogPreview: FC<{ blogPost: BlogPost }> = ({ blogPost }) => {
  return (
    <Link className={styles.root} href={`/blog/${blogPost.id}`}>
      <Image
        className={styles.preview}
        src={blogPost.preview}
        width={700}
        height={380}
        alt={'IT Nerds ' + blogPost.title}
      />
      <Title className={styles.title} size={'extra-small'} as={'h3'}>
        {blogPost.title}
      </Title>
      <p className={styles.readingTime}>Время прочтения: {blogPost.readingTime} мин.</p>
      <p className={styles.date}>{blogPost.date}</p>
    </Link>
  );
};

export default BlogPreview;
