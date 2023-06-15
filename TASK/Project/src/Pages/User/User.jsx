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

import userService from "../../service/user.service";
import shared from "../../utils/shared";
import { useSelector } from "react-redux";

function User() {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth.user);

  const [filters, setFilters] = useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [userList, setUserList] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      getAllUsers({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const getAllUsers = async (filters) => {
    await userService.getAllUsers(filters).then((res) => {
      if (res) {
        setUserList(res);
      }
    });
  };
  const columns = [
    { id: "FirstName", label: "First Name" },
    { id: "LastName", label: "LastName" },
    { id: "Email", label: "Email" },
    { id: "roleName", label: "Role" },
  ];
  const onConfirmDelete = async () => {
    await userService
      .deleteUser(selectedId)
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
        User
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
              {userList?.items?.map((row, index) => (
                <TableRow key={`${row.id}-${index}`}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
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
                        navigate(`/edit-user/${row.id}`);
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
              {!userList.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No user
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
          count={userList?.totalItems || 0}
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
        description={shared.messages.USER_DELETE}
      />
    </div>
  );
}

export default User;
