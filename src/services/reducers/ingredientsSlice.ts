import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  isLoading: boolean;
  isError: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredientsState = {
  isLoading: false,
  isError: false,
  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export default ingredientsSlice.reducer;
