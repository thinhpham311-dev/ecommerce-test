import { useState } from "react";

const useForm = (validator, onSubmit, initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);

    const setValue = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validator(values);
        setErrors(validationErrors);

        if (validationErrors.length === 0) {
            setSubmitting(true);
            onSubmit(values); // Truyền giá trị của form vào hàm onSubmit
            setSubmitting(false);
        }
    };

    return { values, errors, setValue, handleSubmit, isSubmitting };
};

export default useForm;