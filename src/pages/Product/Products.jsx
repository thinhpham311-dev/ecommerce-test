import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import styles from "./product.module.scss";

const Product = () => {
    return (
        <div className={styles.mainWrapper}>
            <div className="container">

                <ProductList />
            </div>
        </div>
    );
};

export default Product;
