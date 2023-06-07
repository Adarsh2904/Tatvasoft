import {
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Searchbar from "../Components/Searchbar";
import { Formik } from "formik";
import * as Yup from "yup";
import authService from "../service/auth.service";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validate = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(5, "Password must be 5 charaters at minimum")
      .required("Password must Required"),
  });

  const onSubmit = (values) => {
    // alert(JSON.stringify(values));
    authService
      .login(values)
      .then((res) => {
        delete res._id;
        delete res.__v;
        setTimeout(() => {
          toast.success("successfully logged in");
        }, 3000);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      <ToastContainer />
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
            Registeration is free and easy.
          </Typography>

          <ul className="list-disc mt-5 ml-5">
            <li>Faster Checkout</li>
            <li>Save Multiple shipping addresses</li>
            <li>View and track orders and more</li>
          </ul>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#f14d54",
              "&:hover": {
                backgroundColor: "#f14d54", // Change the hover background color
              },
              textTransform: "capitalize",
              marginTop: "165px",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Create an Account
          </Button>
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
            If you have account with us,please log in.
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="">
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                  <label>Email Address*</label>
                  <TextField
                    size="small"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    sx={{ width: "357px" }}
                  />
                  <div className="text-red-600">
                    {errors.email && touched.email && errors.email}
                  </div>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: "40px" }}>
                  <label>Password*</label>
                  <TextField
                    type="password"
                    name="password"
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    sx={{ width: "357px" }}
                  />
                  <div className="text-red-600">
                    {errors.password && touched.password && errors.password}
                  </div>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    color: "white",
                    backgroundColor: "#f14d54",
                    "&:hover": {
                      backgroundColor: "#f14d54", // Change the hover background color
                    },
                    marginTop: "60px",
                  }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
