import { FC } from 'react';
import styles from './socials.module.css';
import Ul from '@/components/elements/Ul';
import WhatsappIcon from '/public/assets/images/icons/whatsapp.svg';
import TelegramIcon from '/public/assets/images/icons/telegram.svg';

const socialItems = [
  {
    icon: <WhatsappIcon />,
    link: '#',
  },
  {
    icon: <TelegramIcon />,
    link: 'https://t.me/kirillbshrn',
  },
];

const Socials: FC = () => {
  return (
    <Ul className={styles.Socials}>
      {socialItems &&
        socialItems.length &&
        socialItems.map((item, index) => (
          <li key={index}>
            <a
              className={styles.Socials_Link}
              href={item.link}
              target={'_blank'}
            >
              {item.icon}
            </a>
          </li>
        ))}
    </Ul>
  );
};

export default Socials;
