import { FC } from 'react';
import styles from './wrapper.module.css';

interface IWrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default Wrapper;
