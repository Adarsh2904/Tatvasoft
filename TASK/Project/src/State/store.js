import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/cartSlice";
import authSliceReducer from "./Slice/authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSliceReducer,
  },
});

export default store;
