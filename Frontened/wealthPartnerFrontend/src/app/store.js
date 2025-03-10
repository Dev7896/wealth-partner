import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../context/invoiceSlice";

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

export default store;
