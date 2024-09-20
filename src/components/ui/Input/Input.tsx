import React, { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    ariaInvalid?: boolean;
}

const Input: FC<InputProps> = ({
                                   className,
                                   type,
                                   name,
                                   placeholder,
                                   onInput,
                                   onChange,
                                   ariaInvalid,
                                   value
                               }) => {
    return (
        <input
            className={clsx(className, styles.root)}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onInput={onInput}
            aria-invalid={ariaInvalid}
            value={value}
        />
    );
};

export default Input;
