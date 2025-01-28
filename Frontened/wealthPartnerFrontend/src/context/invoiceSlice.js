import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Holds the product list
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products.splice(action.payload, 1);
    },
    updateProduct: (state, action) => {
      const { index, field, value } = action.payload;
      state.products[index][field] = value;
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = invoiceSlice.actions;

export default invoiceSlice.reducer;
