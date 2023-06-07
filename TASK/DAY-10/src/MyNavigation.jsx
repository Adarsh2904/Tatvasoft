import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/auth";
import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UpdateProfile from "./Pages/UpdateProfile";
import Register from "./Pages/Register";
import Book from "./Pages/Book";
import AddBook from "./Pages/AddBook";

function MyNavigation() {
  const authContext = useAuthContext();

  const Redirect = <Navigate to={"/login"} />;
  return (
    <Routes>
      <Route path="/" element={authContext.user.id ? <Home /> : Redirect} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={!authContext.user.id ? <Register /> : Redirect}
      />
      <Route
        path="/update-profile"
        element={authContext.user.id ? <UpdateProfile /> : Redirect}
      />
      <Route path="/book" element={authContext.user.id ? <Book /> : Redirect} />
      <Route
        path="/add-book"
        element={authContext.user.id ? <AddBook /> : Redirect}
      />
      <Route
        path="/edit-book/:id"
        element={authContext.user.id ? <AddBook /> : Redirect}
      />
      <Route
        path="/cart-page"
        element={authContext.user.id ? <CartPage /> : Redirect}
      />
    </Routes>
  );
}

export default MyNavigation;
// [10:26] Keval Dhol
//     Admin:
// Email: admin@tatvasoft.com
// Password: admin@123
