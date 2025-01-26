import React from 'react';

type CasesPostTags = 'лендинг' | 'инфорамционный сайт' | 'дизайн' | 'разработка' | 'wordpress' | 'бот' | 'чат';

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
