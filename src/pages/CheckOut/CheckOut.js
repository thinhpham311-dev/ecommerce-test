
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useCheckOut } from "../../utils/hooks"
import { Link } from "react-router-dom";
import styles from "./checkout.module.scss"
import { toast } from "react-toastify";
import Form from "../../components/Form/Form";
import DataTable from "../../components/DataTable/DataTable";
import formatToVND from '../../utils/formatCurrentVn';

const formValidator = (values) => {
    const errors = [];

    if (!values || !values.fullName) {
        errors.push({ fullName: "Họ và tên không được để trống" });
    }

    if (!values || !values.address) {
        errors.push({ address: "Địa chỉ không được để trống" });
    }

    if (!values || !values.phone) {
        errors.push({ phone: "Số điện thoại không được để trống" });
    } else {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(values.phone)) {
            errors.push({ phone: "Số điện thoại phải có 10 chữ số và chỉ chứa số" });
        }
    }

    return errors;
};
const Checkout = () => {
    const { handleCheckOut, loading } = useCheckOut();

    const { cart } = useSelector((state) => state.cart.state);

    const totalPrice = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
    }, [cart])

    async function handleValidationSuccessOnSubmit(values) {
        const result = await handleCheckOut(values);
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
            name: "fullName",
            type: "text",
            label: "Họ và tên",
            placeholder: "Vui lòng nhập tên",
            required: true
        },
        {
            name: "phone",
            type: "text",
            label: "Số điện thoại",
            placeholder: "Vui lòng nhập số điện thoại",
            required: true

        },
        {
            name: "address",
            type: "text",
            label: "Địa chỉ",
            placeholder: "Vui lòng nhập địa chỉ",
            required: true

        },
    ];

    const columns = [
        {
            header: 'Sản phẩm', key: 'product_name', render: (item) => {
                return (<h5><strong>{item.product_name}</strong></h5>)
            }
        },
        {
            header: 'Giá', key: 'product_price', render: (item) => {
                return (<span>{formatToVND(item.product_price)}</span>)
            }
        },
        {
            header: 'Số lượng', key: 'quantity', render: (item) => {
                return (<span>{item.quantity}</span>)
            }
        },
        {
            header: 'Giá bán', key: 'product_total_price', render: (item) => {
                return (<span>{formatToVND(item.product_price * item.quantity)}</span>)
            }
        },

    ];


    return (
        <div className={styles.mainWrapper}>
            <div className="container">
                <div className={styles.checkoutContext}>
                    <div>
                        <Form
                            initialValues={{ fullName: "Phạm Trí Thịnh", phone: "0702895474", address: "Long Xuyên, An Giang" }}
                            onSubmit={handleValidationSuccessOnSubmit}
                            validator={formValidator}
                            fields={fields}
                            submitButtonText="Xác nhận"
                            loadingText="Đang thanh toán..."
                            title="Thanh Toán"
                            isSubmitting={loading}
                            isDisabled={!cart.length > 0}
                        />
                    </div>
                    <div>
                        <div className={styles.actionBarWrapper}>
                            <div className={styles.actionBarContext}>
                                <h3>Giỏ hàng <strong>({cart.length})</strong></h3>
                                <Link to="/cart">Cập nhật</Link>
                            </div>
                        </div>

                        <DataTable data={cart} columns={columns} />

                        <h3>Tổng: {formatToVND(totalPrice)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
