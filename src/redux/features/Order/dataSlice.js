import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import {
    apiPutOrdersData,
} from "../../../services/OrderService"

export const putOrder = createAsyncThunk("data/putOrder", async (data) => {
    const response = await apiPutOrdersData(data)
    return response.data;
});

const initialState = {
    status: "",
    orders: [],
};

const orderSlice = createSlice({
    name: "data",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(putOrder.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(putOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.status = STATUS.IDLE;
            })
            .addCase(putOrder.rejected, (state) => {
                state.status = STATUS.ERROR;
            })
    },
});

export default orderSlice.reducer;
