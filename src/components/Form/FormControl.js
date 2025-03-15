import React from "react";
import styles from "./form.module.scss"
import Input from "../Input/Input";

const FormControl = ({ type, placeholder, name, value, onChange, error, isDisabled }) => {
    return (
        <div className={styles.formControl}>
            <Input
                size="medium"
                color="primary"
                type={type}
                disabled={isDisabled}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <span className={styles.msgError}>{error}</span>}
        </div>
    );
};

export default FormControl;