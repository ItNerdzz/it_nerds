import React from 'react';

type CasesPostTags = 'лендинг' | 'ux/ui дизайн' | 'разработка' | 'бот';

export type CasesPost = {
  id: string;
  title: string;
  tags: CasesPostTags[];
  description: string;
  preview: string;
  link: string;
  content: React.ReactNode;
};
