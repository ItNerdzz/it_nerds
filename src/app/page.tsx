import Header from '@/components/layout/header/header';
import Hero from '@/components/blocks/hero/hero';
import AboutUs from '@/components/blocks/about-us/about-us';
import HowWeWorks from '@/components/blocks/how-we-works/how-we-works';
import Footer from '@/components/layout/footer/footer';
import Services from '@/components/blocks/services/services';

const servicesData = [
  {
    category: 'Разработка',
    items: [
      {
        id: 0,
        title: 'Визитка',
        description:
          'Небольшой веб сайт. Позволяет быстро предоставить описание компании, контактную информацию, услуги.',
        price: 5000,
      },
      {
        id: 1,
        title: 'Лендинг',
        description:
          'Посадочная страница для сбора контактов на регистрацию или покупку. Иными словами презентация на одной странице с раскрытием преимуществ, важности продукта. А также установка доверия между посетилем и компанией.',
        price: 15000,
      },
      {
        id: 2,
        title: 'Корпоративный сайт',
        description:
          'Крупный многостраничный ресурс. Это имиджевый инструмент работы бизнеса через интернет. На нем размещают полную информацию для представительства в интернете - описание услуг, преимущества, продукцию, контакты.',
        price: 25000,
      },
      {
        id: 2,
        title: 'Интернет магазин',
        description:
          'Онлайн-магазин с карточками товаров или услуг, различными категориями и вариациями. Управление ценами, скидками прямо на сайте, онлайн-оплата с возможностью интеграции более 10 платежных систем или эквайринга. Интеграция с CRM-системами, онлайн-консультантом, виджетами, каталогом. Каталог с фильтрацией, категориями, поиску по ассортименту, возможностью импорта или экспорта продукции',
        price: 45000,
      },
    ],
  },
  {
    category: 'Продвижение',
    items: [
      {
        id: 0,
        title: 'Продвижение',
        description:
          'Небольшой веб сайт. Позволяет быстро предоставить описание компании, контактную информацию, услуги.',
        price: 5000,
      },
    ],
  },
  {
    category: 'Другие услуги',
    items: [
      {
        id: 0,
        title: 'Геткурс',
        description:
          'Небольшой веб сайт. Позволяет быстро предоставить описание компании, контактную информацию, услуги.',
        price: 5000,
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <HowWeWorks />
        <Services servicesData={servicesData} />
      </main>
      <Footer />
    </>
  );
}
