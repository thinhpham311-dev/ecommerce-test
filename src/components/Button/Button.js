import React from 'react';
import styles from './button.module.scss';

const Button = ({ children, color = 'primary', size = 'medium', onClick, disabled = false }) => {
    // Combine classes
    const buttonClasses = `${styles.button} ${styles[color]} ${styles[size]} ${disabled ? styles.disabled : ''
        }`;

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};



export default Button;