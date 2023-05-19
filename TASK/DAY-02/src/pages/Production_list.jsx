import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProductList(){
    return(
        <>
            <Header />
            <h1>Product Component</h1>
            <Link to="/Login">Login</Link><br />
            <Link to="/Register">Register</Link><br />
            <Footer />
        </>
    );
}

export default ProductList;