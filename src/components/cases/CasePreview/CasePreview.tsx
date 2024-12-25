import React, { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { CasesPost } from '@/components/cases/interfaces';
import { Title, Text, Button } from '@/components/ui';

import styles from './CasePreview.module.css';

interface CasePreviewProps {
  className?: string;
  casesPost: CasesPost;
}

const CasePreview: FC<CasePreviewProps> = ({ className, casesPost }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Image
        className={styles.image}
        src={casesPost.preview}
        width={300}
        height={169}
        alt={casesPost.title + ' IT Nerds'}
      />
      <Title className={styles.title} size={'small'} as={'h3'}>
        {casesPost.title}
      </Title>
      <ul className={styles.tags}>
        {casesPost.tags && casesPost.tags.length > 0 && casesPost.tags.map(tag => <li key={tag}>#{tag}</li>)}
      </ul>
      <Text className={styles.text}>{casesPost.description}</Text>
      <Button className={styles.button} size={'big'} href={`/cases/${casesPost.id}`}>
        Подробнее
      </Button>
    </div>
  );
};

export default CasePreview;
