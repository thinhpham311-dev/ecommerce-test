import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/Cart/stateSlice";
import { toast } from "react-toastify";
import styles from "./productCardGridItem.module.scss";
import Button from "../Button/Button";
import formatToVND from "../../utils/formatCurrentVn"
import imageNotFound from "../../assests/imageNotFound.png";
import { LoaderImage } from "../../components/Loader/Loader"

const ProductCardGridItem = ({ product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const addProduct = () => {
        dispatch(addToCart(product));
        toast.success(
            <span>{product?.product_name.slice(0, 20)} đã được thêm vào giỏ hàng!</span>,
            {
                autoClose: 1000,
            }
        )
    };

    const buyNowProduct = () => {
        dispatch(addToCart(product));
        toast.success(
            <span>{product?.product_name.slice(0, 20)} đã được thêm vào giỏ hàng!</span>,
            {
                autoClose: 1000,
            }
        )
        navigate("/checkout")
    };

    return (
        <div
            style={{ textAlign: "center" }}
            className={styles.productCardGridItem}
        >
            <div className={styles.productCardImg} onClick={() => navigate(`/product/${product?.product_id}`)}
            >

                <LoaderImage
                    src={product?.product_image ?? imageNotFound}
                    alt={product?.product_name}

                />
            </div>
            <div className={styles.productCardBody} aria-hidden="true">
                <h5 className="clamp-line-1">{product?.product_name}</h5>
                <span className="clamp-line-1">{formatToVND(product?.product_price)}</span>
            </div>
            <div className={styles.productCardFooter}>
                <Button color="primary" size="small" type="button" className={styles.btnAddToCard} onClick={addProduct}>
                    Thêm vào giỏ
                </Button>
                <Button color="danger" size="small" type="button" className={styles.btnBuyNow} onClick={buyNowProduct}>
                    Mua ngay
                </Button>
            </div>
        </div>

    );
};

export default memo(ProductCardGridItem);
