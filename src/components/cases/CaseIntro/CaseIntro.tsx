import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { Title, Text } from '@/components/ui';

import styles from './CaseIntro.module.css';

interface CaseIntroProps {
  title: string;
  preview: string;
  text: string;
  tags: string[];
  link: {
    url: string;
    text: string;
  };
  date: string;
}

const CaseIntro: FC<CaseIntroProps> = ({ title, text, preview, tags, link, date }) => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'extra-large'} as={'h1'}>
            {title}
          </Title>
          <Image
            className={styles.preview}
            src={preview}
            width={1920}
            height={1080}
            alt={title + ' IT Nerds'}
            quality={100}
          />
          <Text className={styles.text}>{text}</Text>
          <ul className={styles.tags}>{tags && tags.length > 0 && tags.map(tag => <li key={tag}>#{tag}</li>)}</ul>
          <div className={styles.row}>
            <Link className={styles.link} href={link.url} target={'_blank'}>
              {link.text}
            </Link>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CaseIntro;
