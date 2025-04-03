import React from 'react';

export type BlogPost = {
  id: string;
  title: string;
  preview: string;
  date: string;
  readingTime: number;
  meta: {
    title: string;
    description: string;
  };
  content: React.ReactNode;
};
