import React from 'react';
import styles from './input.module.scss';
import Button from '../Button/Button';

const Numberic = ({ value, onChange, min = 1, max = 100, disabled = false }) => {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className={styles.numericInput}>
            <Button size="small"
                onClick={handleDecrement}
                disabled={value <= min || disabled}
            >
                -
            </Button>
            <div>
                {value}
            </div>
            <Button
                size="small"
                onClick={handleIncrement}
                disabled={value >= max || disabled}
            >
                +
            </Button>
        </div>
    );
};

export default Numberic;
