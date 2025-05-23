import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart
} from "../../redux/features/Cart/stateSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProduct } from "../../redux/features/Product/dataSlice"
import { Loader } from "../../components/Loader/Loader";
import styles from "./detail.module.scss";
import { STATUS } from "../../constants/Status";
import Button from "../../components/Button/Button";
import { LoaderImage } from "../../components/Loader/Loader";
import reducer from "../../redux/features/Product/index"
import { injectReducer } from "../../app/store";

injectReducer("product", reducer)

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { product, status } = useSelector((state) => state.product.data);

    useEffect(() => {
        dispatch(fetchProduct({ id }));
    }, [dispatch, id]);

    if (status === STATUS.LOADING) {
        return <Loader />;
    }

    if (status !== STATUS.LOADING && status === STATUS.ERROR) {
        return <h2>{status}</h2>;
    }

    const productHandler = () => {
        dispatch(addToCart(product));
        toast.success(<span>{product?.product_name.slice(0, 20)} is added to cart</span>, {
            autoClose: 1000,
        });
    };

    return (
        <div className={styles.mainWrapper}>
            <div className="container">
                <div className={styles.detailWrapper}>
                    <div className={styles.imageWrapper}>
                        <LoaderImage src={product?.product_image}
                            alt="product-img"
                            styles={{ maxWidth: "300px", maxHeight: "300px" }} />

                    </div>
                    <div className={styles.contentWrapper}>
                        <h3>{product?.product_name}</h3>
                        <p>  <span>Price: ${product?.product_price}</span></p>
                        <div>
                            <Button type="button" size="small" onClick={productHandler}>
                                Thêm Vào giỏ
                            </Button>
                            <Button type="button" size="small" color="danger" onClick={() => {
                                productHandler()
                                navigate('/checkout')
                            }}>
                                Thêm Vào giỏ
                            </Button>
                        </div>
                    </div>
                </div>
                <p>{product?.product_description}</p>
            </div>
        </div>
    );
};

export default React.memo(Detail);