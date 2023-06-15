import { createSlice } from "@reduxjs/toolkit";
import cartService from "../../service/cart.service";

const initialCartState = {
  cartData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    addtoCart: (state, action) => {
      state.cartData.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setCartData, addtoCart, removeFromCart } = cartSlice.actions;

export const fetchCartData = (userId) => async (dispatch) => {
  try {
    const res = await cartService.getList(userId);
    dispatch(setCartData(res));
  } catch (error) {}
};

export default cartSlice.reducer;
