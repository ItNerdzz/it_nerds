import { Hero, AboutUs, HowWeWorks, Services } from '@/components/home';
import { CasesSwiper } from '@/components/cases';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Nerds | Команда веб разработки',
  description:
    'Разработка сайта для бизнеса. Ссоздаем продуманный дизайн опираясь на анлиз рынка и увеличиваем конверсию. Ваш сайт — не просто картинка, а инструмент для роста продаж',
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Services />
      <HowWeWorks />
      <CasesSwiper />
    </>
  );
}
