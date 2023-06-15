import { createSlice } from "@reduxjs/toolkit";

export const intialUserValue = {
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  password: "",
  role: "",
  roleId: 0,
};

const initialState = {
  user: intialUserValue,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.user = intialUserValue;
      localStorage.removeItem("user");
      // navigate("/login");
    },
  },
});

export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
