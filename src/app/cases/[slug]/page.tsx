import React, { FC } from 'react';

import { casesData } from '@/data';

import type { Metadata } from 'next';

interface CasesPostProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: CasesPostProps): Metadata => {
  const post = casesData.find(post => post.id === params.slug);

  if (!post)
    return {
      title: 'Тут должен быть кейс IT Nerds',
      description: 'Тут должно быть описание кейса IT Nerds',
    };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.preview,
          width: 1600,
          height: 900,
          alt: post.title,
        },
      ],
      url: `/blog/${post.id}`,
    },
  };
};

const CasesPost: FC<CasesPostProps> = ({ params }) => {
  const post = casesData.find(post => post.id === params.slug);

  if (!post) {
    return <div>Упс! Кейс не найден</div>;
  }

  return <>{post.content}</>;
};

export async function generateStaticParams() {
  return casesData.map(post => ({
    slug: post.id,
  }));
}

export default CasesPost;
