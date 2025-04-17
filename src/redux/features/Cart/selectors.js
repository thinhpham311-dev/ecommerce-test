// features/cart/cartSelectors.js
import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartStateItems = createSelector(
    [selectCart],
    (cart) => cart.state
);

