import PageLayout from '@/components/layout/PageLayout/PageLayout';
import Hero from '@/components/blocks/Hero';
import AboutUs from '@/components/blocks/AboutUs';
import HowWeWorks from '@/components/blocks/HowWeWorks';
import Services from '@/components/blocks/Services';
import Cases from '@/components/blocks/Cases';
import CallToAction from '@/components/blocks/CallToAction';

const servicesData = [
  {
    category: 'Разработка',
    items: [
      {
        id: 0,
        title: 'Визитка',
        description:
          'Небольшой веб сайт. Позволяет быстро предоставить описание компании, контактную информацию, услуги.',
        price: 10000,
      },
      {
        id: 1,
        title: 'Лендинг',
        description:
          'Посадочная страница для сбора контактов на регистрацию или покупку. Иными словами презентация на одной странице с раскрытием преимуществ, важности продукта. А также установка доверия между посетилем и компанией.',
        price: 25000,
      },
      {
        id: 2,
        title: 'Корпоративный сайт',
        description:
          'Крупный многостраничный ресурс. Это имиджевый инструмент работы бизнеса через интернет. На нем размещают полную информацию для представительства в интернете - описание услуг, преимущества, продукцию, контакты.',
        price: 35000,
      },
      {
        id: 3,
        title: 'Интернет магазин',
        description:
          'Онлайн-магазин с карточками товаров или услуг, различными категориями и вариациями. Управление ценами, скидками прямо на сайте, онлайн-оплата с возможностью интеграции более 10 платежных систем или эквайринга. Интеграция с CRM-системами, онлайн-консультантом, виджетами, каталогом. Каталог с фильтрацией, категориями, поиску по ассортименту, возможностью импорта или экспорта продукции',
        price: 55000,
      },
    ],
  },
  {
    category: 'Продвижение',
    items: [
      {
        id: 4,
        title: 'SEO продвижение',
        description:
          'Проанилизируем ваш сайт, сайты ваших конкурентов, найдем точки роста и релизуем все технические моменты своей командой.',
        price: 15000,
      },
      {
        id: 5,
        title: 'Таргет',
        description:
          'Бесплатная настройка рекламы. Оплата только за ведение рекламной кампании',
        price: 15000,
      },
    ],
  },
  {
    category: 'Другие услуги',
    items: [
      {
        id: 6,
        title: 'Чат-бот',
        description: 'Разработка чат-бота под ваши задачи.',
        price: 5000,
      },
      {
        id: 7,
        title: 'Оформление Геткурс',
        description: 'Свежий дизайн основных страниц и блоков для вшей школы.',
        price: 25000,
      },
    ],
  },
];

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <AboutUs />
      <HowWeWorks />
      <Services servicesData={servicesData} />
      <Cases />
      <CallToAction />
    </PageLayout>
  );
}
