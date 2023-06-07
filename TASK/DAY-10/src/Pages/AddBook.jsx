import { Typography } from "@mui/material";
import React from "react";

function AddBook() {
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
        Edit Book
      </Typography>

      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-black w-32"></div>
      </div>
    </div>
  );
}

export default AddBook;
