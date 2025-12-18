import React, { useMemo } from 'react'
import Button from "../Button/Button"
import Drawer from 'react-modern-drawer'
import { useSelector } from 'react-redux'
import formatToVND from "../../utils/formatCurrentVn"
import styles from "./cartdrawer.module.scss"
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartCardListItem from "../ProductCard/CartCardListItem"
import { useNavigate } from 'react-router-dom'
import { selectCartStateItems } from "../../redux/features/Cart/selectors"

const CartDrawer = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false)
    const { cart } = useSelector(selectCartStateItems);
    const { items = [] } = cart

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const totalPrice = useMemo(() => items?.reduce(
        (a, c) => a + c.quantity * c.product_price,
        0), [items])


    return (
        <div>
            <div className={styles.cartIcon} onClick={toggleDrawer}>
                <AiOutlineShoppingCart size={23} />
                <div className={styles.cartLength}>
                    <span>{items?.length}</span>
                </div>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                size={350}
                className={styles.cartDrawerWrapper}
            >
                <div className={styles.cartDrawerHeader}>
                    <h5>Giỏ hàng</h5>
                    <Button color="secondary" size="small" onClick={toggleDrawer}>
                        Đóng
                    </Button>
                </div>

                <div className={styles.productsLisItem}>
                    {
                        items.map(item => (
                            <CartCardListItem key={item.product_id} product={item} />
                        ))
                    }
                </div>
                <div className={styles.cartDrawerFooter}>
                    <Button size="small" onClick={() => {
                        toggleDrawer()
                        navigate("/cart")
                    }}>  Xem chi tiết</Button>
                    {items.length > 0 &&
                        <Button color="success" size="small" onClick={() => {
                            toggleDrawer()
                            navigate("/checkout")
                        }}>
                            Thanh toán: {formatToVND(totalPrice)}
                        </Button>
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default CartDrawer