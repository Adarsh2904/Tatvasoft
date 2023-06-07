import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import Searchbar from "../Components/Searchbar";
function Home() {
  return (
    <div className="">
      <Header />
      <Searchbar />
      <hr />
      <p className="font-sans  font-bold text-2xl text-blue-300 text-center my-7">
        Welcome to Home Page
      </p>

      <Footer />
    </div>
  );
}

export default Home;
