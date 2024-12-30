'use client';

import React, { FC, useState } from 'react';
import { getCookie } from 'cookies-next';

import { Button, Input } from '@/components/ui/';

import styles from './CallbackForm.module.css';

const CallbackForm: FC = () => {
  const [nameValue, setNameValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [messageValue, setMessageValue] = useState<string>('');
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const referrer = getCookie('referrer');

  const handlerPhoneInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(evt.target.value);
    setIsPhoneInvalid(false);
  };

  const handlerNameInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(evt.target.value);
  };

  const handlerMessageInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(evt.target.value);
  };

  const handlerSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!phoneValue || phoneValue.length < 4) {
      setIsPhoneInvalid(true);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/api/sendForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          phone: phoneValue,
          comment: messageValue,
          referrer: referrer,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setPhoneValue('');
        setNameValue('');
        setMessageValue('');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlerSubmit} id={'contact-form'}>
      <Input
        className={styles.input}
        value={nameValue}
        onChange={handlerNameInput}
        placeholder='Ваше имя'
        type={'name'}
        name='name'
      />
      <Input
        className={styles.input}
        value={phoneValue}
        onChange={handlerPhoneInput}
        ariaInvalid={isPhoneInvalid}
        placeholder='Ваш телефон/telegram'
        type={'phone'}
        name='phone'
      />
      <Input
        className={styles.input}
        value={messageValue}
        onChange={handlerMessageInput}
        placeholder='Комментарий'
        type={'message'}
        name='message'
      />
      <Button className={styles.submit} size={'large'} type={'submit'} disabled={isSubmitted}>
        {isLoading && 'Отправляем..'}
        {isPhoneInvalid && 'Неверно заполнено поле'}
        {isSubmitted && 'Спсибо! Уже связываемся с Вами'}
        {!isLoading && !isSubmitted && !isPhoneInvalid && 'Отправить'}
      </Button>
    </form>
  );
};

export default CallbackForm;
