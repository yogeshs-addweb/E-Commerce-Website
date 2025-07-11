import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cartItems")) || [];

export const StoreSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
    remove(state, action) {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      return updatedState;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state));
      }
    },
  },
});

export const { add, remove, updateQuantity } = StoreSlice.actions;
export default StoreSlice.reducer;
