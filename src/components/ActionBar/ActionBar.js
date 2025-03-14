import React from 'react'

import { toggleView } from "../../redux/features/Product/stateSlice"
import { useDispatch, useSelector } from 'react-redux'
import styles from "./actionbar.module.scss"
import { IoGridOutline, IoListOutline } from "react-icons/io5";


const ActionBar = () => {
    const dispatch = useDispatch()
    const { view } = useSelector((state) => state.product.state)

    return (
        <div className={styles.actionBarWrapper}>

            <div className={styles.actionBarContext}>
                <h3>Danh sách sản phẩm</h3>
                <button type='button'
                    className={styles.btnToggle}
                    onClick={() => dispatch(toggleView(view === 'grid' ? 'list' : 'grid'))}
                    variant="plain"
                    size="sm"
                >
                    {view === 'grid' ? < IoListOutline size={20} /> : <IoGridOutline size={20} />}
                </button>
            </div>

        </div>
    )
}

export default ActionBar