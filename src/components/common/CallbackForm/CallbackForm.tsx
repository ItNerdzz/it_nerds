'use client';

import React, {FC, useState} from 'react';

import {Button, Input} from "@/components/ui/";

import styles from './CallbackForm.module.css';

const CallbackForm: FC = () => {
  const [nameValue, setNameValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [messageValue, setMessageValue] = useState<string>("");

  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setIsSubmitted(true);
      setPhoneValue('');
    } catch (error) {
      console.error(error);
    }
  };

  return <form onSubmit={handlerSubmit} id={'contact-form'}>
    <Input className={styles.input} value={nameValue} onChange={handlerNameInput}
           placeholder='Ваше имя' type={'name'} name='name'/>
    <Input className={styles.input} value={phoneValue} onChange={handlerPhoneInput} ariaInvalid={isPhoneInvalid}
           placeholder='Ваш телефон/telegram' type={'phone'} name='phone'/>
    <Input className={styles.input} value={messageValue} onChange={handlerMessageInput} placeholder='Комментарий'
           type={'message'} name='message'/>
    <Input className={styles.hidden} type={'email'} name={'email'}
           value={`${phoneValue.replace(/[^a-zA-Z0-9]/g, '')}@lead.com`}/>
    <Button className={styles.submit} size={'large'} type={'submit'} disabled={isSubmitted}>
      {isLoading && 'Отправляем..'}
      {isPhoneInvalid && 'Неверно заполнено поле'}
      {isSubmitted && 'Скоро мы свяжемся с Вами'}
      {!isLoading && !isSubmitted && !isPhoneInvalid && 'Отправить'}
    </Button>
  </form>
};

export default CallbackForm;