import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Button,TextField,styled } from "@mui/material";

function Login () {
    
    return (
    <>
    <Header />
        <h1>Login component</h1><br />
        <Link to="/register" >Register</Link>
        <br />

        <Link to="/product-list" >Product-List</Link>
        <br />
<br />
        <Button variant="text" >Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>

        <br /> <br />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
       <TextField id="filled-basic" label="Filled" variant="filled" />
       <TextField id="standard-basic" label="Standard" variant="standard" />
 
        
        <Footer />
    </>
    )
}
export default Login;