import {
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Searchbar from "../Components/Searchbar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Formik } from "formik";
import * as Yup from "yup";
import userService from "../service/user.service";
import authService from "../service/auth.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link to={"/"} underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,

    <Typography key="2" color={{ color: "#f14d54" }}>
      Create an Account
    </Typography>,
  ];
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  };
  const validate = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("FirstName is Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("LastName is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password must Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    roleId: Yup.string().required("Role is required"),
  });

  const onSubmit = (values) => {
    delete values.confirmPassword;
    // alert(JSON.stringify(values));
    authService
      .create(values)
      .then((res) => {
        toast.success("Succesfully Registered");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [roleList, setRoleList] = useState([]);

  const getRoles = () => {
    userService.getAllRoles().then((res) => {
      setRoleList(res);
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="">
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
      <Typography variant="h6" sx={{ marginTop: "50px", marginLeft: "160px" }}>
        Personal Information
      </Typography>
      <Divider
        sx={{ marginTop: "20px", marginLeft: "160px", marginRight: "160px" }}
      />
      <Typography
        variant="body2"
        sx={{ marginTop: "20px", marginLeft: "160px" }}
      >
        Please enter the following information to create your account
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
          <form onSubmit={handleSubmit} className="flex-1 ml-40 mr-40">
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              <FormControl fullWidth>
                <label>First Name*</label>
                <TextField
                  size="small"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label>Last Name*</label>
                <TextField
                  size="small"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
              </FormControl>

              <FormControl fullWidth>
                <label>Email Address*</label>
                <TextField
                  size="small"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.email && touched.email && errors.email}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label htmlFor="roleId">Role*</label>
                <Select
                  id="roleId"
                  name="roleId"
                  label="RoleId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.roleId}
                  error={errors.roleId && touched.roleId}
                  size="small"
                >
                  {roleList.length > 0 &&
                    roleList.map((role) => (
                      <MenuItem value={role.id} key={"name" + role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
                <div className="text-red-600">
                  {errors.roleId && touched.roleId && errors.roleId}
                </div>
              </FormControl>
            </div>
            <Typography variant="h6" sx={{ marginTop: "70px" }}>
              Login Information
            </Typography>
            <Divider />
            <div className="flex space-x-8 mt-10">
              <FormControl fullWidth>
                <label>Password*</label>
                <TextField
                  type="password"
                  name="password"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="text-red-600">
                  {errors.password && touched.password && errors.password}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label>Password*</label>
                <TextField
                  type="confirmPassword"
                  name="confirmPassword"
                  size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <div className="text-red-600">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </div>
              </FormControl>
            </div>

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
      <Footer />
    </div>
  );
}

export default Register;
