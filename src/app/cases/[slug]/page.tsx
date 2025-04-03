import React, { FC } from 'react';

import { casesData } from '@/data';
import { CaseIntro, CasesNavigation } from '@/components/cases';
import { PostContent, DelayedCTA } from '@/components/common';

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
    metadataBase: new URL('https:/itnerds.ru'),
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

  const prevPostIndex = post && casesData.indexOf(post) - 1;
  const nextPostIndex = post && casesData.indexOf(post) + 1;
  const navigationPosts = [];

  if (casesData.length > 2) {
    casesData[prevPostIndex]
      ? navigationPosts.push(casesData[prevPostIndex])
      : navigationPosts.push(casesData[casesData.length - 1]);
  }

  if (casesData.length > 1) {
    casesData[nextPostIndex] ? navigationPosts.push(casesData[nextPostIndex]) : navigationPosts.push(casesData[0]);
  }

  return (
    <>
      <CaseIntro
        title={post.title}
        preview={post.preview}
        text={post.description}
        tags={post.tags}
        link={post.link}
        date={post.date}
      />
      <PostContent>{post.content}</PostContent>
      <CasesNavigation posts={navigationPosts} />
      <DelayedCTA delay={15000} />
    </>
  );
};

export async function generateStaticParams() {
  return casesData.map(post => ({
    slug: post.id,
  }));
}

export default CasesPost;
