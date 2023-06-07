import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register(){
    return(
        <>
            <Header />
            <h1>Register Component</h1>
            <Link to="/Login">Login</Link><br />
            <Link to="/Production_list">Production list</Link><br />
            <Footer />
        </>
    );
}

export default Register;
   