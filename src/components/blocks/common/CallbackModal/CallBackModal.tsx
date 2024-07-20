'use client';

import React, {FC} from 'react';
import clsx from 'clsx';

import useCallbackModalStore from "@/store/useCallbackModalStore";
import Title from "@/components/ui/Title";
import CloseIcon from '/public/assets/images/icons/cross.svg';
import CallbackForm from "@/components/blocks/common/CallbackForm";

import styles from './CallbackModal.module.css';

const CallBackModal: FC = () => {
  const isOpen = useCallbackModalStore(state => state.isOpen);
  const closeModal = useCallbackModalStore(state => state.closeModal);

  const classNames = clsx(styles.root, isOpen && styles.opened)

  return <section className={classNames}>
    <div className={styles.inner}>
      <div className={styles.heading}>
        <Title className={styles.title} size={'small'}>Обратный звонок</Title>
        <button className={styles.close} onClick={closeModal}>
          <CloseIcon className={styles.closeIcon} />
        </button>
      </div>
      <div className={styles.contnet}>
        <CallbackForm />
      </div>
    </div>
  </section>
};

export default CallBackModal;
