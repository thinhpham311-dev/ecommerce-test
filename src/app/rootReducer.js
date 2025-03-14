import { combineReducers } from "@reduxjs/toolkit";
import cart from "../redux/features/Cart";
import product from "../redux/features/Product"
import auth from "../redux/features/Auth"
import order from "../redux/features/Order"

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        cart,
        product,
        auth,
        order,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}


export default rootReducer

