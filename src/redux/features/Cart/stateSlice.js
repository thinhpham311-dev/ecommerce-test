import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "",
};

export const CartSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    addToCart(state, action) {
      //if that action product has already in cart then if block will work
      const itemIndex = state.items?.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const product = { ...action.payload, quantity: 1 };
        state.items?.push(product);
      }
    },
    removeFromCart(state, action) {
      const updatedCart = state.items.filter((p) => p.id !== action.payload.id);
      state.items = updatedCart;
    },
    removeAll(state, action) {
      state.items = [];
    },

    reduceProduct(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      } else if (state.items[itemIndex].quantity === 1) {
        const updatedCart = state.items.filter(
          (p) => p.id !== action.payload.id
        );
        state.items = updatedCart;
      }
    },
    incrementProduct(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.items[itemIndex].quantity >= 1) {
        state.items[itemIndex].quantity += 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeAll,
  reduceProduct,
  incrementProduct,
} = CartSlice.actions;

export default CartSlice.reducer;
