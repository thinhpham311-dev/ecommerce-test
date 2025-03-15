import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/Status";
import { fetchProducts } from "../../redux/features/Product/dataSlice";
import ProductCardListItem from "../ProductCard/ProductCardListItem";
import ProductCardGridItem from "../ProductCard/ProductCardGridItem";
import styles from "./productlist.module.scss";
import { Loader } from "../Loader/Loader";
import ActionBar from "../ActionBar/ActionBar";

const ProductList = () => {

  const dispatch = useDispatch();

  const { search, view } = useSelector((state) => state.product.state)
  const { products, status, loading } = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(fetchProducts({ search }));
  }, [dispatch, search]);

  if (status === STATUS.LOADING) {
    return <Loader />;
  }

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }

  return (

    <div className={styles.productListWrapper}>
      <ActionBar />

      {
        (view === 'grid' && products.length > 0 && !loading) && (
          <div className={styles.productsGridItem}>
            {
              products.map(item => (
                <ProductCardGridItem key={item.product_id} product={item} />
              ))
            }
          </div>
        )
      }
      {
        (view === 'list' && products.length > 0 && !loading) && (
          <div className={styles.productsLisItem}>
            {
              products.map(item => (
                <ProductCardListItem key={item.product_id} product={item} />
              ))
            }

          </div>
        )
      }

    </div>
  );
};

export default ProductList;
