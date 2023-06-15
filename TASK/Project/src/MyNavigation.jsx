import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UpdateProfile from "./Pages/UpdateProfile";
import Register from "./Pages/Register";
import Book from "./Pages/Book/Book";
import AddBook from "./Pages/Book/AddBook";
import EditUser from "./Pages/User/EditUser";
import User from "./Pages/User/User";
import Categories from "./Pages/Categories/Categories";
import AddCategories from "./Pages/Categories/AddCategories";
import CartPage from "./Pages/CartPage";
import { useSelector } from "react-redux";

function MyNavigation() {
  const authData = useSelector((state) => state.auth.user);
  const Redirect = <Navigate to={"/login"} />;

  return (
    <Routes>
      <Route path="/" element={authData.id ? <Home /> : Redirect} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={!authData.id ? <Register /> : Redirect}
      />
      <Route
        path="/update-profile"
        element={authData.id ? <UpdateProfile /> : Redirect}
      />

      <Route path="/user" element={authData.id ? <User /> : Redirect} />
      <Route
        path="/edit-user/:id"
        element={authData.id ? <EditUser /> : Redirect}
      />
      <Route
        path="/categories"
        element={authData.id ? <Categories /> : Redirect}
      />
      <Route
        path="/add-category"
        element={authData.id ? <AddCategories /> : Redirect}
      />
      <Route
        path="/add-category/:id"
        element={authData.id ? <AddCategories /> : Redirect}
      />
      <Route path="/book" element={authData.id ? <Book /> : Redirect} />
      <Route path="/add-book" element={authData.id ? <AddBook /> : Redirect} />

      <Route
        path="/add-book/:id"
        element={authData.id ? <AddBook /> : Redirect}
      />
      <Route
        path="/cart-page"
        element={authData.id ? <CartPage /> : Redirect}
      />
    </Routes>
  );
}

export default MyNavigation;
// [10:26] Keval Dhol
//     Admin:
// Email: admin@tatvasoft.com
// Password: admin@123
