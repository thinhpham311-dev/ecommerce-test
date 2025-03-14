import React from "react";
import styles from "./form.module.scss";
import { useForm } from "../../utils/hooks";
import FormControl from "./FormControl";
import FormLabel from "./FormLabel";
import Button from "../Button/Button";

const Form = ({
    initialValues,
    onSubmit,
    validator,
    fields,
    submitButtonText,
    loadingText,
    isSubmitting,
    title,
}) => {
    const { values, errors, setValue, handleSubmit } = useForm(
        validator,
        onSubmit,
        initialValues
    );

    return (
        <div className={styles.formWrapper}>
            {title && <h3>{title}</h3>}
            <form onSubmit={handleSubmit} >
                {fields.map((field) => (
                    <div className={styles.formGroup} key={field.name}>
                        <FormLabel className="mb-2" required={field.required}>{field.label}</FormLabel>
                        <FormControl
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={values[field.name] || ""} // Đảm bảo giá trị mặc định
                            onChange={(event) => {
                                setValue(field.name, event.target.value);
                            }}
                            error={errors.find((item) => item[field.name])?.[field.name]}
                        />
                    </div>
                ))}
                <div className={styles.handleSubmitBtnWrapper}>
                    <Button disabled={isSubmitting} color="success" size="small" type="submit">
                        {isSubmitting ? loadingText : submitButtonText}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;