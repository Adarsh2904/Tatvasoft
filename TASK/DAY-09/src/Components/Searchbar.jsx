import { Button, List, ListItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import bookService from "../service/book.service";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setBookList(res);
  };
  const search = () => {
    searchBook();
    setOpenSearchResult(true);
  };

  return (
    <div className="flex bg-[#efefef] h-20 items-center justify-center space-x-3">
      <div style={{ position: "relative" }}>
        <TextField
          hiddenLabel
          label="What are you Looking for..."
          type={"text"}
          value={query}
          variant="outlined"
          size="small"
          sx={{
            width: "550px",
            backgroundColor: "white",
            fontStyle: "italic",
            "& .MuiInputBase-input": {
              fontStyle: "normal",
            },
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          // onBlur={() => {
          //   setOpenSearchResult(false);
          // }}
        />

        {openSearchResult && (
          <div
            className="bg-white w-[550px] shadow-lg"
            style={{
              position: "absolute",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            {bookList?.length === 0 && <p>No Product Found</p>}
            <List>
              {bookList?.length > 0 &&
                bookList.map((item, index) => (
                  <ListItem className="flex-1" key={index}>
                    <div className="flex  w-full ">
                      <div className="flex-1 ">
                        <p className="font-semibold">{item.name}</p>
                        <p className=" line-clamp-1">{item.description}</p>
                      </div>
                      <div className=" text-right ml-4">
                        <p>{item.price}</p>
                        <Button
                          sx={{
                            color: "#f14d54",
                            textTransform: "capitalize",
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                ))}
            </List>
          </div>
        )}
      </div>

      <Button
        variant="contained"
        startIcon={<AiOutlineSearch />}
        sx={{
          color: "white",
          backgroundColor: "#71da71",
          "&:hover": {
            backgroundColor: "#71da71", // Change the hover background color
          },
          textTransform: "capitalize",
        }}
        onClick={search}
      >
        Search
      </Button>
      <Button
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#f14d54",
          "&:hover": {
            backgroundColor: "#f14d54", // Change the hover background color
          },
          textTransform: "capitalize",
        }}
        onClick={() => {
          setOpenSearchResult(false);
          setQuery("");
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
