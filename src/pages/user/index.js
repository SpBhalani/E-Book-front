import React, { useEffect, useState } from "react";
import { productStyle } from "./style";
import * as Yup from "yup";
import { Formik } from "formik";
// import authService from "../../service/auth/auth.service";
import {
  defaultFilter,
  RecordsPerPage,
  StatusCode,
} from '../../utils/constant';
import { Navigate, useNavigate } from "react-router-dom";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Checkbox } from "@material-ui/core";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userData } from "../../redux/action/userData.actions";
/**
* @author
* @function User
**/

export const User = (props) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.allUser)
  const auth = useSelector(state => state.auth)
  const classes = productStyle();
  const [filters, setFilters] = useState(defaultFilter);
  const [userRecords, setUserRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const history = useNavigate();
  useEffect(() => {
    searchAllUsers();
  }, []);
  useEffect(() => {
    if (users) setUserRecords(users.user);
  })
  const searchAllUsers = () => {
    dispatch(userData());
    if (users) setUserRecords(users.user);
  };

  const columns = [
    { id: "id", label: "Id", minWidth: 80 },
    { id: "firstName", label: "First Name", minWidth: 100 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "roleName", label: "Role", minWidth: 130 }
  ];

  const onConfirmDelete = () => {
    dispatch(deleteUser({ _id: selectedId }))
    setOpen(false);
  };

  if (!auth.authenticated) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={classes.productWrapper}>
      <div className="container">
        <Typography variant="h1">User</Typography>
        <div className="btn-wrapper">
          <TextField
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{ className: "small" }}
            onChange={(e) => {
              setFilters({ ...filters, keyword: e.target.value, page: 1 });
            }}
          />
        </div>
        <TableContainer>
          <Table aria-label="simple table">
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
            <TableBody>
              {userRecords?.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.roleid}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        className="green-btn btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => {
                          history(`/edit-user/${row._id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        className="btn pink-btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => {
                          setOpen(true);
                          setSelectedId(row._id ?? 0);
                        }}
                      > 
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={RecordsPerPage}
        component="div"
        count={userRecords?.length ? userRecords.length : 0}
        rowsPerPage={filters.pageSize}
        page={filters.page}
        onPageChange={(e, newPage) => {
          setFilters({ ...filters, page: newPage });
        }}
        onRowsPerPageChange={(e) => {
          setFilters({ ...filters, page: 0, pageSize:parseInt(e.target.value, 10) });
        }}
      /> */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="cancel-popup"
        >
          <DialogTitle id="alert-dialog-title">Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="btn pink-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirmDelete();
              }}
              autoFocus
              className="btn green-btn"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>)

}