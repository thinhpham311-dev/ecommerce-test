import { combineReducers } from "@reduxjs/toolkit";
import cart from "../redux/features/Cart";
import auth from "../redux/features/Auth"

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        cart,
        auth,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}


export default rootReducer

