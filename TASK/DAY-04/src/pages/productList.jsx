import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";



function productList () {
    return (
    <>
        <Header />
        <h1>Product List component</h1>
         <Link to="/login">Login</Link>
        
        <Footer />
        
        
    </>
    );
}


export default productList;