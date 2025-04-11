import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.scss";
import { removeAll, removeFromCart, incrementProduct, reduceProduct } from "../../redux/features/Cart/stateSlice";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Numberic from "../../components/Input/Numberic"
import formatToVND from "../../utils/formatCurrentVn"
import DataTable from "../../components/DataTable/DataTable"

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart.state);
  let navigate = useNavigate();

  const totalPrice = useMemo(() => cart?.reduce(
    (a, c) => a + c.quantity * c.product_price,
    0), [cart])

  const removeAllProduct = () => {
    dispatch(removeAll());
    toast.error(<span>Giỏ hàng của bãn đã trống</span>, {
      autoClose: 1000,
    });
  };

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
      header: 'Số lượng', key: 'product_price', render: (item) => {
        const handleQuantityChange = (newQuantity) => {
          if (newQuantity > item.quantity) {
            dispatch(incrementProduct(item));
          } else {
            dispatch(reduceProduct(item));
          }
        };
        return (
          <Numberic value={item.quantity} onChange={handleQuantityChange} min={1} />
        )
      }
    },
    {
      header: 'Chức năng', key: 'control', render: (item) => {
        const removeProductHandler = (item) => {
          dispatch(removeFromCart(item));
          toast.warning(<span>{item.product_name.slice(0, 20)} Đã được xóa khỏi giỏ hàng</span>, {
            autoClose: 1000,
          });
        };
        return (
          <Button
            color="danger"
            size="small"
            onClick={() => {
              removeProductHandler(item);
            }}
          >
            Xóa
          </Button>
        )
      }
    },

  ];

  return (
    <div className={styles.mainWrapper}>
      <div className="container">
        <div className={styles.actionBarWrapper}>
          <div className={styles.actionBarContext}>
            <h3>Giỏ hàng<strong> ({cart?.length})</strong></h3>
          </div>
        </div>
        <DataTable data={cart} columns={columns} />
      </div>
      <div className={styles.footerCart}>
        <div className="container">
          <div className={styles.footerCartContext}>
            <div>
              <Button color="danger" disabled={!cart.length > 0} size="small" className={styles.btnRemoveAll} onClick={removeAllProduct}>
                Xóa tất cả
              </Button>
            </div>
            <div>
              <h5>
                Tổng: <b>{formatToVND(totalPrice)}</b>
              </h5>
              {cart.length > 0 && <Button color="success" size="small" className={styles.btnCheckOut} onClick={() => navigate('/checkout')}>Thanh toán</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
