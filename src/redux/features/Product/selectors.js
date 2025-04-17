import { createSelector } from 'reselect';

const selectProduct = (state) => state.product;

export const selectProductDataItems = createSelector(
    [selectProduct],
    (product) => product.data
);


export const selectProductStateItems = createSelector(
    [selectProduct],
    (product) => product.state
);
