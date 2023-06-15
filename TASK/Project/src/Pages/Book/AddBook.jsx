import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import bookService from "../../service/book.service";
import categoryService from "../../service/category.service";

function AddBook() {
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const initialValues = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };
  const [initialValuestate, setInitialValueState] = useState(initialValues);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBookById();
    }
    categoryService.getAll().then((res) => {
      setCategories(res);
    });
    // eslint-disable-next-line
  }, [id]);

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
        price: res.price,
        categoryId: res.categoryId,
        description: res.description,
        base64image: res.base64image,
      });
    });
  };

  const validate = Yup.object({
    name: Yup.string().required("Book name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
  });

  const onSubmit = (values) => {
    bookService
      .save(values)
      .then(() => {
        toast.success(
          values.id
            ? "Record update successfully"
            : "Record creates successfully"
        );
        navigate("/book");
      })
      .catch(() => toast.error("Recored update fail"));
  };

  const onSelectFile = (e, setFieldValue, setFiledError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 50000) {
          toast.error("File size must be less then 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };

        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg, jpeg and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };
  return (
    <div className="flex-1 ml-40 mr-40">
      {id ? (
        <Typography
          variant="h4"
          sx={{
            marginTop: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#474747",
          }}
        >
          Edit Book
        </Typography>
      ) : (
        <Typography
          variant="h4"
          sx={{
            marginTop: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#474747",
          }}
        >
          Add Book
        </Typography>
      )}

      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-black w-32"></div>
      </div>
      <Formik
        initialValues={initialValuestate}
        validationSchema={validate}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFiledError,
        }) => (
          <form onSubmit={handleSubmit} className="flex-1 ml-40 mr-40">
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              <FormControl fullWidth>
                <label>Book Name*</label>
                <TextField
                  size="small"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.name && touched.name && errors.name}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label>Book Price*</label>
                <TextField
                  size="small"
                  type="text"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  sx={{ height: "40px" }}
                />
                <div className="text-red-600">
                  {errors.price && touched.price && errors.price}
                </div>
              </FormControl>
              <FormControl fullWidth>
                <label htmlFor="roleId">Book Category*</label>
                <Select
                  name="categoryId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryId}
                  size="small"
                >
                  {categories?.map((rl) => (
                    <MenuItem value={rl.id} key={"categories" + rl.id}>
                      {rl.name}
                    </MenuItem>
                  ))}
                </Select>
                <div className="text-red-600">
                  {errors.categoryId && touched.categoryId}
                </div>
              </FormControl>
              <FormControl fullWidth>
                {!values.base64image && (
                  <>
                    <Input
                      type="file"
                      size="small"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        onSelectFile(e, setFieldValue, setFiledError);
                      }}
                    />
                    <Button
                      variant="contained "
                      sx={{
                        color: "white",
                        backgroundColor: "#f14d54",
                        "&:hover": {
                          backgroundColor: "#f14d54",
                        },
                        marginLeft: "8px",
                        width: "100px",
                        marginTop: "5px",
                      }}
                    >
                      Upload
                    </Button>
                    <div className="text-red-600">
                      {errors.base64image && touched.base64image}
                    </div>
                  </>
                )}
                {values.base64image && (
                  <div>
                    <em>
                      <img
                        src={values.base64image}
                        alt=""
                        style={{ height: "140px", width: "100px" }}
                      />
                    </em>
                    image
                    <span
                      onClick={() => {
                        setFieldValue("base64image", "");
                      }}
                    >
                      X
                    </span>
                  </div>
                )}
              </FormControl>
            </div>
            <FormControl fullWidth>
              <label>Book Description*</label>
              <TextField
                size="small"
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                sx={{ height: "full", width: "full" }}
              />
              <div className="text-red-600">
                {errors.description &&
                  touched.description &&
                  errors.description}
              </div>
            </FormControl>
            <div className="mt-16">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  color: "white",
                  backgroundColor: "#80BF32",
                  "&:hover": {
                    backgroundColor: "#80BF32",
                  },
                  marginLeft: "8px",
                  width: "100px",
                }}
                disableElevation
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/book");
                }}
                sx={{
                  color: "white",
                  backgroundColor: "#f14d54",
                  "&:hover": {
                    backgroundColor: "#f14d54",
                  },
                  marginLeft: "8px",
                  width: "100px",
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddBook;
