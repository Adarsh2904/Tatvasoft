import { Button, TextField } from "@mui/material";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Searchbar() {
  return (
    <div className="flex bg-[#efefef] h-20 items-center justify-center space-x-4">
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        label="What are you Looking for..."
        type={"text"}
        variant="outlined"
        size="small"
        sx={{ width: "422px", backgroundColor: "white" }}
      />

      <Button
        variant="contained"
        startIcon={<AiOutlineSearch />}
        sx={{
          color: "white",
          backgroundColor: "#71da71",
          "&:hover": {
            backgroundColor: "#71da71", // Change the hover background color
          },
        }}
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
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
