import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Searchbar from "./Components/Searchbar";
import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductPage from "./Pages/ProductPage";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Searchbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/product-page" Component={ProductPage} />
          <Route path="/cart-page" Component={CartPage} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
