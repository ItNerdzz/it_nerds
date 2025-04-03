import { FC } from 'react';

import { BlogInfo, BlogNavigation } from '@/components/blog';
import { DelayedCTA, PostContent } from '@/components/common';
import { blogPostsData } from '@/data';

import type { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: BlogPostProps): Promise<Metadata> => {
  const { id } = await params;
  const post = blogPostsData.find(post => post.id === id);

  if (!post) {
    return {
      title: 'IT Nerds | Блог',
      description: 'Блог команды IT Nerds',
    };
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: [
        {
          url: 'https://itnerds.ru/' + post.preview,
          width: 700,
          height: 360,
          alt: post.meta.title,
        },
      ],
      url: `https://itnerds.ru/blog/${post.id}`,
    },
  };
};

const BlogPost: FC<BlogPostProps> = async ({ params }) => {
  const { id } = await params;
  const post = blogPostsData.find(post => post.id === id);
  if (!post) return <div>Post not found</div>;
  const currentIndex = blogPostsData.findIndex(item => item.id === post.id);
  const previousPost = currentIndex === 0 ? blogPostsData[blogPostsData.length - 1] : blogPostsData[currentIndex - 1];
  const nextPost = currentIndex === blogPostsData.length - 1 ? blogPostsData[0] : blogPostsData[currentIndex + 1];

  return (
    <>
      <BlogInfo blogPost={post} />
      <PostContent>{post.content}</PostContent>
      <BlogNavigation posts={[previousPost, nextPost]} />
      <DelayedCTA delay={20000} />
    </>
  );
};

export function generateStaticParams() {
  return blogPostsData.map(post => ({
    id: post.id,
  }));
}

export default BlogPost;
