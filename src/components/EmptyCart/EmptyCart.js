import React from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../assests/cart.webp";
import styles from "./emptycart.module.scss";
import Button from "../Button/Button";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (

    <div className={styles.emptyCartWrapper}>
      <img src={cart} alt="empty-cart-img" />
      <Button size="small" onClick={() => navigate("/")}>
        Trở về trang chủ
      </Button>
    </div>

  );
};

export default EmptyCart;
