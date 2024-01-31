import { FC } from 'react';
import clsx from 'clsx';
import Ul from '@/components/elements/Ul';
import WhatsappIcon from '/public/assets/images/icons/whatsapp.svg';
import TelegramIcon from '/public/assets/images/icons/telegram.svg';
import styles from './socials.module.css';

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

interface ISocialsProps {
  className?: string;
}

const Socials: FC<ISocialsProps> = ({ className }) => {
  const socialsClassName = clsx(className, styles.Socials);

  return (
    <Ul className={socialsClassName}>
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
