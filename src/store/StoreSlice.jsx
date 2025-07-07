import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const StoreSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    add(state, action) {
      const itemExisted = state.some((item) => item.id === action.payload.id);
      if (!itemExisted) {
        state.push(action.payload);
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export const { add, remove } = StoreSlice.actions;
export default StoreSlice.reducer;
