import React from 'react';

type CasesPostTags = 'лендинг' | 'ux/ui дизайн' | 'wordpress' | 'бот';

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
  content: React.ReactNode;
};
