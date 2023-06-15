import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import { defaultFilter, RecordsPerPage } from "../../Constant/constant";

import categoryService from "../../service/category.service";
import shared from "../../utils/shared";
import { useSelector } from "react-redux";
function Categories() {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth.user);
  const [filters, setFilters] = useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [categoryRecords, setCategoryRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllCategories({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllCategories = (filters) => {
    categoryService.getAll(filters).then((res) => {
      setCategoryRecords(res);
    });
  };
  const columns = [{ id: "name", label: "Category Name" }];

  const onConfirmDelete = async () => {
    await categoryService
      .deleteCategory(selectedId)
      .then((res) => {
        if (res) {
          toast.success(shared.messages.DELETE_SUCCESS);
          setOpen(false);
          setFilters({ ...filters });
        }
      })
      .catch((err) => {
        toast.error(shared.messages.DELETE_FAIL);
      });
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
        Categories Page
      </Typography>
      <div className="flex items-center justify-center m-6">
        <div className="border-t-2 border-[#f14d54] w-32"></div>
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
            navigate("/add-category");
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
              {categoryRecords?.items?.map((row, index) => (
                <TableRow key={`${row.id}-${index}`}>
                  <TableCell>{row.name}</TableCell>
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
                        navigate(`/add-category/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    {row.id !== authData.id && (
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
                          setSelectedId(row.id ?? 0);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!categoryRecords.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Category
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
          count={categoryRecords?.totalItems || 0}
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
        title="Delete Category"
        description="Are you sure you want to delete this category?"
      />
    </div>
  );
}

export default Categories;
