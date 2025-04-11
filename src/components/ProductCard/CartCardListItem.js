import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementProduct, reduceProduct, removeFromCart } from "../../redux/features/Cart/stateSlice";
import styles from "./cartCartListItem.module.scss";
import formatToVND from "../../utils/formatCurrentVn";
import imageNotFound from "../../assests/imageNotFound.png";
import Numberic from "../Input/Numberic"
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { LoaderImage } from "../Loader/Loader";

const ProductCardListItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > product.quantity) {
      dispatch(incrementProduct(product));
    } else {
      dispatch(reduceProduct(product));
    }
  };
  const removeProductHandler = (item) => {
    dispatch(removeFromCart(item));
    toast.warning(<span>{item.product_name.slice(0, 20)} Đã được xóa khỏi giỏ hàng</span>, {
      autoClose: 1000,
    });
  };

  return (

    <div
      className={styles.productCardListItem}
    >
      <div className={styles.productCardImg} onClick={() => navigate(`/product/${product?.product_id}`)}>
        <LoaderImage
          src={product?.product_image ?? imageNotFound}
          alt={product?.product_name}
        />
      </div>
      <div className={styles.productCardBody}>
        <p className="clamp-line-1 "><strong>{product?.product_name}</strong></p>
        <span className="clamp-line-1 ">{formatToVND(product?.product_price)}</span>
        <Numberic value={product.quantity} onChange={handleQuantityChange} min={1} />
      </div>
      <div className={styles.productCardFooter}>
        <Button size="small" color="danger" onClick={() => removeProductHandler(product)}>Xóa</Button>
      </div>
    </div>

  );
};

export default memo(ProductCardListItem);
