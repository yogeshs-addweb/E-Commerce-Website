// store/StoreSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const StoreSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    add(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { add, remove, updateQuantity } = StoreSlice.actions;
export default StoreSlice.reducer;
