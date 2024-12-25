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
}

const CaseIntro: FC<CaseIntroProps> = ({ title, text, preview, tags, link }) => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'big'} as={'h1'}>
            {title}
          </Title>
          <Image className={styles.preview} src={preview} width={'300'} height={'150'} alt={title + ' IT Nerds'} />
          <Text className={styles.text}>{text}</Text>
          <ul className={styles.tags}>{tags && tags.length > 0 && tags.map(tag => <li key={tag}>#{tag}</li>)}</ul>
          <Link className={styles.link} href={link.url}>
            {link.text}
          </Link>
        </div>
      </Wrapper>
    </section>
  );
};

export default CaseIntro;
