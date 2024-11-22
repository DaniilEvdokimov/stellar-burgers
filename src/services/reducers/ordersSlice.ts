import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isLoading: boolean;
  isError: boolean;
  orders: TOrder[];
};

const initialState: TOrdersState = {
  isLoading: false,
  isError: false,
  orders: []
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export default ordersSlice.reducer;
