import React from "react";
import { Link } from "react-router-dom";


function Login() {
  return (
    <>
      
      <h1>Login Component</h1>
      <Link to="/Register">Register</Link><br />
      <Link to="/Production_list">Production list</Link><br />
    </>
  );
}

export default Login;

   