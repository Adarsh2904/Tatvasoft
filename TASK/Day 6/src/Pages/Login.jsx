/*import { Breadcrumbs, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Searchbar from "../Components/Searchbar";

function Login() {
  const breadcrumbs = [
    <Link to={"/"} underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,

    <Typography key="2" color={{ color: "#f14d54" }}>
      Login
    </Typography>,
  ];
  return (
    <div className="flex-1 ">
      <Header />
      <Searchbar />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          marginTop: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          marginTop: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Login or Create an Account
      </Typography>
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-[#f14d54] w-32"></div>
      </div>
      <div className="grid grid-cols-2 gap-36 mt-12 ">
        <div className="ml-40">
          <Typography variant="h6">New Customer</Typography>
          <Divider
            sx={{
              marginTop: "20px",
            }}
          />
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Reagine
          </Typography>
        </div>
        <div>
          <Typography variant="h6">Ragistered Customers</Typography>
          <Divider
            sx={{
              marginTop: "20px",
              marginRight: "160px",
            }}
          />
          <Typography variant="body2" sx={{ marginTop: "20px" }}>
            Please enter the following information to create your account
          </Typography>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
*/
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

const Login = () => {

  
    const validate = (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = 'Field is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!/^.{8,20}$/.test(values.password)) {
            errors.password = 'Password must be between 8 and 20 characters long';
        }

        return errors
    }

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    console.log(loginFormik.values)

    return (
        <main className="py-12 px-12 sm:px-12 md:px-12 lg:px-28 xl:px-28 text-[#414141]">
            <div className="mb-12 flex gap-4 justify-center items-center text-lg font-light">
                <Link className="hover:text-[#f14d54] transition" to="/">Home</Link>
                <span>&gt;</span>
                <Link className="text-[#f14d54]" to="/">Login</Link>
            </div>
            <h1 className="text-center text-3xl font-semibold leading-tight">Login or Create an Account</h1>
            <div className="w-[10%] mx-auto mt-6 h-0.5 bg-[#f14d54] min-w-[100px] mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
                <div className="">
                    <h3 className="text-xl font-medium mb-5">New Customer</h3>
                    <hr className="mb-4" />
                    <div className="text-[#838383] font-light">
                        <p className="mb-5">Free and easy registration</p>
                        <ul className="list-disc list-inside">
                            <li>Faster checkout</li>
                            <li>Save multiple shipping addresses</li>
                            <li>View and track your order and more</li>
                        </ul>
                        <Link className="inline-block mt-16 bg-[#ff492c] bg-opacity-90 hover:bg-opacity-80 transition py-2 px-6 rounded-sm text-white font-semibold" to="/auth/register">Create an Account</Link>
                    </div>
                </div>
                <div>
                    <form onSubmit={loginFormik.handleSubmit} noValidate>
                        <h3 className="text-xl font-medium mb-5">Registered Customer</h3>
                        <hr className="mb-4" />
                        <p className="text-[#838383] font-light mb-5">Please enter the following information to login</p>
                        <div className="grid grid-cols-1 gap-10 mb-16">
                            <div>
                                <label className="block mb-4" htmlFor="email">Email <span className="text-[#f14d54]">*</span></label>
                                <input className="w-full rounded-sm border border-gray-300 text-sm py-2 px-5" type="email" id="email" name="email" value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
                                {loginFormik.touched.email && loginFormik.errors.email ? <div className="text-[#f14d54] font-light text-sm">{loginFormik.errors.email}</div> : <div>&nbsp;</div>}
                            </div>
                            <div>
                                <label className="block mb-4" htmlFor='password'>Password <span className="text-[#f14d54]">*</span></label>
                                <input className="w-full rounded-sm border border-gray-300 text-sm py-2 px-5" id="password" name="password" value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
                                {loginFormik.touched.password && loginFormik.errors.password ? <div className="text-[#f14d54] font-light text-sm">{loginFormik.errors.password}</div> : <div>&nbsp;</div>}
                            </div>
                        </div>
                        <button className="inline-block mb-8 bg-[#ff492c] bg-opacity-90 hover:bg-opacity-80 transition py-2 px-6 rounded-sm text-white font-semibold" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </main >
    )
}

export default Login