import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import {
  apiGetProductsData,
  apiGetProductData
} from "../../../services/ProductService"

export const fetchProducts = createAsyncThunk("data/products", async (data) => {
  const response = await apiGetProductsData(data)
  return response.data;
});

export const fetchProduct = createAsyncThunk("data/product", async (data) => {
  const response = await apiGetProductData(data)
  return response.data;
});

const initialState = {
  status: "",
  products: [],
  product: null
};

const productSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = STATUS.ERROR;
      })

      .addCase(fetchProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = STATUS.ERROR;
      })
  },
});

export default productSlice.reducer;
