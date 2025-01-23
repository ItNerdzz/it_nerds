import React from 'react';

type CasesPostTags = 'лендинг' | 'дизайн' | 'разработка' | 'wordpress' | 'бот';

export type CasesPost = {
  id: string;
  title: string;
  tags: CasesPostTags[];
  description: string;
  preview: string;
  link: {
    url: string;
    text: string;
  };
  date: string;
  content: React.ReactNode;
};
