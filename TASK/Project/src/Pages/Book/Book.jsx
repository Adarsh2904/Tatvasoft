import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { defaultFilter, RecordsPerPage } from "../../Constant/constant";
import categoryService from "../../service/category.service";
import bookService from "../../service/book.service";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import { toast } from "react-toastify";
function Book() {
  const [filters, setFilters] = useState(defaultFilter);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const navigate = useNavigate();
  const [bookRecords, setBookRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookRecords(res);
    });
  };
  // console.log("Catt : ", bookRecords);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // console.log(bookRecords);
  const columns = [
    { id: "BookName", label: "Book Name" },
    { id: "Price", label: "Price" },
    { id: "Category", label: "Category" },
  ];

  const onConfirmDelete = () => {
    bookService
      .deleteBook(selectedId)
      .then((res) => {
        toast.success(" BOOK DELETE SUCESSFULLY");
        setOpen(false);
        setFilters({ ...filters, pageIndex: 1 });
      })
      .catch((e) => toast.error("FAIL TO DELETE"));
  };
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
        Book Page
      </Typography>
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-black w-32"></div>
      </div>
      <div className="flex justify-end mt-11">
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
          sx={{ width: "280px" }}
        />
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#f14d54",
            "&:hover": {
              backgroundColor: "#f14d54",
            },
            marginLeft: "8px",
            width: "100px",
          }}
          onClick={() => {
            navigate("/add-book");
          }}
        >
          add
        </Button>
      </div>
      <div className="mt-8">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ marginTop: "20px" }}>
              {bookRecords?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {categories.find((c) => c.id === row.categoryId)?.name}
                  </TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      disableElevation
                      sx={{
                        borderColor: "#80BF32",
                        "&:hover": {
                          backgroundColor: "#80BF32", // Change the hover background color
                          color: "white",
                        },
                        textTransform: "capitalize",
                        color: "#80BF32",
                        width: "90px",
                        marginRight: "20px",
                      }}
                      onClick={() => {
                        navigate(`/add-book/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      disableElevation
                      sx={{
                        borderColor: "#f14d54",
                        "&:hover": {
                          backgroundColor: "#f14d54", // Change the hover background color
                          color: "white",
                        },
                        textTransform: "capitalize",
                        width: "90px",
                        color: "#f14d54",
                      }}
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!bookRecords.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Books
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-10 mb-10 flex justify-end">
        <TablePagination
          rowsPerPageOptions={RecordsPerPage}
          component="div"
          count={bookRecords.totalItems}
          rowsPerPage={filters.pageSize || 0}
          page={filters.pageIndex - 1}
          onPageChange={(e, newPage) => {
            setFilters({ ...filters, pageIndex: newPage + 1 });
          }}
          onRowsPerPageChange={(e) => {
            setFilters({
              ...filters,
              pageIndex: 1,
              pageSize: Number(e.target.value),
            });
          }}
        />
      </div>
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirmDelete()}
        title="Delete book"
        description="Are you sure you want to delete this book?"
      />
    </div>
  );
}

export default Book;
