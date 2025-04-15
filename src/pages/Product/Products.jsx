import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import styles from "./product.module.scss";
import reducer from "../../redux/features/Product/index"
import { injectReducer } from "../../app/store";

injectReducer("product", reducer)

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
