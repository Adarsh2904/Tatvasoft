import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Searchbar from "./Components/Searchbar";
import { AuthWarpper, useAuthContext } from "./context/auth";
import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductPage from "./Pages/ProductPage";
import Register from "./Pages/Register";

function App() {
  const authContext = useAuthContext();
  const Redirect = <Navigate to={"/login"} />;
  return (
    <BrowserRouter>
      <AuthWarpper>
        <ToastContainer />
        <Header />
        <Searchbar />
        <Routes>
          {/* <Route path="/" element={authContext.user.id ? <Home /> : Redirect} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/cart-page" element={<CartPage />} />
        </Routes>

        <Footer />
      </AuthWarpper>
    </BrowserRouter>
  );
}

export default App;
