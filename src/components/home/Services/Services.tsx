import { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { Tabs } from '@/components/common';
import { ServiceItem } from '@/components/home';

import styles from './Services.module.css';

const Services: FC = () => {
  const servicesData = [
    {
      tabTitle: 'Разработка',
      content: (
        <ul className={styles.list}>
          {[
            {
              title: 'Визитка',
              description:
                'Мини-сайт для быстрого представления компании. Включает информацию о деятельности, контактные данные и список услуг.',
              price: 15000,
            },
            {
              title: 'Лендинг',
              description:
                'Посадочная страница для сбора контактов клиентов, регистрации или покупок. Является эффективным инструментом презентации, раскрывая преимущества продукта и создавая доверие между посетителем и компанией.',
              price: 45000,
            },
            {
              title: 'Многостраничный сайт',
              description:
                'Информационный сайт, который представляет компанию в интернете. Идеален для размещения полной информации о компании: описание услуг, преимущества, новости, сотрудничество, продукция и контактные данные.',
              price: 85000,
            },
            {
              title: 'Интернет магазин',
              description:
                'Онлайн-платформа для продажи товаров или услуг. Включает карточки товаров, категории, фильтрацию, онлайн-оплату, систему управления заказами и дополнительные интеграции. Управление ценами, скидками, и возможностью импорта/экспорта продукции, а также наличие онлайн-консультанта и дополнительных виджетов.',
              price: 120000,
            },
          ].map(item => (
            <ServiceItem key={item.title} serviceItem={item} />
          ))}
        </ul>
      ),
    },
    {
      tabTitle: 'Продвижение',
      content: (
        <ul className={styles.list}>
          {[
            {
              title: 'SEO продвижение',
              description:
                'Комплексный анализ вашего сайта и конкурентов. Определяем точки роста и реализуем все технические задачи нашей командой.',
              price: 15000,
            },
            {
              title: 'Таргет',
              description: 'Настройка рекламы бесплатно — вы платите только за ведение рекламной кампании.',
              price: 15000,
            },
          ].map(item => (
            <ServiceItem key={item.title} serviceItem={item} />
          ))}
        </ul>
      ),
    },
    {
      tabTitle: 'Другие услуги',
      content: (
        <ul className={styles.list}>
          {[
            {
              title: 'Чат-бот для мессенджера',
              description: 'Создание чат-бота под ваши задачи и цели.',
              price: 10000,
            },
            {
              title: 'Оформление GetCourse',
              description:
                'Разработка современного дизайна для ключевых страниц и блоков вашей образовательной платформы.',
              price: 25000,
            },
          ].map(item => (
            <ServiceItem key={item.title} serviceItem={item} />
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className={styles.root} id={'services'}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Наши услуги
          </Title>
          <Tabs tabItems={servicesData} />
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
