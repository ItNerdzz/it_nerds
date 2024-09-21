import { FC } from 'react';
import clsx from 'clsx';

import WhatsappIcon from '/public/assets/images/icons/whatsapp.svg';
import TelegramIcon from '/public/assets/images/icons/telegram.svg';

import Config from '@/config.json';

import styles from './Socials.module.css';

const socialItems = [
  {
    icon: <TelegramIcon />,
    link: Config.Telegram,
  },
];

interface ISocialsProps {
  className?: string;
}

const Socials: FC<ISocialsProps> = ({ className }) => {
  const socialsClassName = clsx(className, styles.socials);

  return (
    <p className={socialsClassName}>
      {socialItems &&
        socialItems.length &&
        socialItems.map((item, index) => (
          <li key={index}>
            <a className={styles.link} href={item.link} target={'_blank'}>
              {item.icon}
            </a>
          </li>
        ))}
    </p>
  );
};

export default Socials;
