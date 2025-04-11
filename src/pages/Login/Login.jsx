import React from "react";
import { useAuth } from "../../utils/hooks";
import Form from "../../components/Form/Form"; // Import component Form chung
import styles from "./login.module.scss";
import { toast } from "react-toastify";

const formValidator = (values) => {
    const errors = [];

    if (!values || !values.email) {
        errors.push({ email: "Email không được để trống" });
    } else {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(String(values.email).toLowerCase())) {
            errors.push({ email: "Email không hợp lệ" });
        }
    }

    if (!values || !values.password) {
        errors.push({ password: "Password không được để trống" });
    } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (!passwordRegex.test(values.password)) {
            errors.push({ password: "Password phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt" });
        }
    }

    return errors;
};

const Login = () => {
    const { signIn, loading } = useAuth();

    const handleValidationSuccessOnSubmit = async (values) => {
        const result = await signIn(values);
        if (result.status === 'failed') {
            toast.error(<span> {result.message}</span>, {
                autoClose: 1000,
            });
        }

        if (result.status === 'success') {
            toast.success(<span>{result.message}</span>, {
                autoClose: 1000,
            });
        }
    };

    const fields = [
        {
            name: "email",
            type: "text",
            label: "Email",
            placeholder: "Vui lòng nhập email",
            required: true
        },
        {
            name: "password",
            type: "password",
            label: "Mật khẩu",
            placeholder: "Vui lòng nhập mật khẩu",
            required: true

        },
    ];


    return (
        <div className={styles.mainWrapper}>
            <div className="container">
                <Form
                    initialValues={{ email: "thinhpham67ag@gmail.com", password: "123456@Qwe" }}
                    onSubmit={handleValidationSuccessOnSubmit}
                    validator={formValidator}
                    fields={fields}
                    submitButtonText="Đăng nhập"
                    loadingText="Đang đăng nhập..."
                    isSubmitting={loading}
                    title="Đăng nhập" // Truyền tiêu đề vào đây
                />
            </div>
        </div>
    );
};

export default Login;