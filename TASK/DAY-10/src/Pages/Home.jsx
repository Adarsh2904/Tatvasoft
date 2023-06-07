import { MenuItem } from "@mui/base";
import {
  Button,
  FormControl,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

import { useEffect } from "react";
import { defaultFilter } from "../Constant/constant";

import bookService from "../service/book.service";
import categoryService from "../service/category.service";

function Home() {
  const [filters, setFilters] = useState(defaultFilter);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  useEffect(() => {
    getAllCategories();
  }, []);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  const sortBook = (e) => {
    setSortBy(e.target.value);
    let bookList = [...bookResponse.items];
    if (e.target.value === "a-z") {
      bookList.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (e.target.value === "z-a") {
      bookList.sort((a, b) => b.name.localeCompare(a.name));
    }
    // bookList = bookList.sort((a, b) => {
    //   if (a.name < b.name) {
    //     return e.target.value === "a-z" ? -1 : 1;
    //   }
    //   if (a.name > b.name) {
    //     console.log(e.target.value);
    //     return e.target.value === "z-a" ? 1 : -1;
    //   }
    //   return 0;
    // });
    // console.log("book Response : ", bookList);
    setBookResponse({ ...bookResponse, items: bookList });
  };
  // console.log("book Response : ", bookResponse);
  return (
    <div className="flex-1 ml-40 mr-40">
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
        Book Listing
      </Typography>
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-black w-32"></div>
      </div>
      <div className="flex justify-between items-center ">
        <Typography variant="h6">
          Total - {bookResponse.totalItems} items
        </Typography>
        <div className="flex items-center space-x-10">
          <TextField
            name="text"
            placeholder="Search..."
            variant="outlined"
            size="small"
            onChange={(e) => {
              setFilters({
                ...filters,
                keyword: e.target.value,
                pageIndex: 1,
              });
            }}
            sx={{
              backgroundColor: "white",
              fontStyle: "italic",
              "& .MuiInputBase-input": {
                fontStyle: "normal",
              },
            }}
          />
          <div className="flex">
            <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
              Sort By
            </Typography>
            {/* <FormControl sx={{ width: "236px" }}>
              <Select onChange={sortBook} value={sortBy} size="small">
                <MenuItem value="a-z">a - z</MenuItem>
                <MenuItem value="z-a">z - a</MenuItem>
              </Select>
            </FormControl> */}

            <select onChange={sortBook} value={sortBy}>
              <option value="a-z">a - z</option>
              <option value="z-a">z - a</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {books.map((book, index) => (
          <div
            className="rounded-lg shadow-xl flex flex-col space-y-4 border-black"
            key={index}
          >
            <div className="w-full h-56 overflow-hidden rounded-lg">
              <img
                src={book.base64image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold line-clamp-1 text-[#474747] ">
                {book.name}
              </h2>
              <span className="text-gray-600 mt-2 font-semibold">
                {book.category}
              </span>
              <p className=" line-clamp-2 h-14 mt-2">{book.description}</p>
              <p className=" mb-2 text-xl text-gray-500">
                MRP
                <span className="mx-1">&#8377;</span>
                {book.price}
              </p>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#f14d54",
                  "&:hover": {
                    backgroundColor: "#f14d54", // Change the hover background color
                  },
                  marginTop: "8px",
                  fontWeight: "bold",
                }}
                fullWidth
              >
                add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Pagination
          sx={{
            marginTop: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          count={bookResponse.totalPages}
          page={filters.pageIndex}
          onChange={(e, newPage) => {
            setFilters({
              ...filters,
              pageIndex: newPage,
            });
          }}
        />
      </div>
    </div>
  );
}

export default Home;
