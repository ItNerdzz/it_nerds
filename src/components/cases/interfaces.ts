import React from 'react';

type CasesPostTags =
  | 'лендинг'
  | 'инфорамционный сайт'
  | 'каталог'
  | 'дизайн'
  | 'разработка'
  | 'поддомены'
  | 'wordpress'
  | 'woocommerce'
  | 'бот'
  | 'чат'
  | 'api интеграция';

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
