import React from 'react';
import styles from './input.module.scss';

const Input = ({ type = 'text', placeholder, value, onChange, color, size, disabled = false }) => {
    // Combine classes
    const inputClasses = `${styles.input} ${styles[color]} ${styles[size]} ${disabled ? styles.disabled : ''
        }`;

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={inputClasses}
            disabled={disabled}
            required={false}
        />
    );
};



export default Input;