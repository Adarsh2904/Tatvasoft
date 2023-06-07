import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

import Searchbar from "../Components/Searchbar";
import { ToastContainer } from "react-toastify";
function Home() {
  return (
    <div className="">
      <ToastContainer />
      <Header />
      <Searchbar />
      <hr />
      <p className="font-sans  font-bold text-2xl text-red-500 text-center my-7">
      Home Page
      </p>

      <Footer />
    </div>
  );
}

export default Home;
