import React, { useEffect, useState } from "react";
import { productStyle } from "./style";
import {
  defaultFilter,
  RecordsPerPage,
  StatusCode,
} from "../../utils/constant";
import { useNavigate, Navigate } from "react-router-dom";
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
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
// import bookService from "../../service/book/book.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBook } from "../../redux/action/book.action";
import { getCategory } from "../../redux/action/category.action";
import { getCart } from "../../redux/action/cart.action";

const Book = () => {
  const auth = useSelector(state => state.auth)
  const books = useSelector(state => state.books.book)
  const categories = useSelector(state => state.categories.categories)
  const dispatch = useDispatch()
  const classes = productStyle();
  const [filters, setFilters] = useState(defaultFilter);
  const [bookRecords, setBookRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    searchAllBooks();
    if (books) setBookRecords(books);
  }, []);

  useEffect(() => {
    searchAllBooks();
  }, [filters]);

  const searchAllBooks = () => {
    dispatch(getBook())
    dispatch(getCategory())
    dispatch(getCart({
      userId: auth.user._id
    }))
    if (books) setBookRecords(books);
  };

  const columns = [
    { id: "id", label: "Id", minWidth: 80 },
    { id: "name", label: "Book Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 100 },
  ];

  const onConfirmDelete = () => {
    dispatch(deleteBook({ _id: selectedId }))
    setOpen(false);
    if (books) setBookRecords(books);
  };

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const result = bookRecords.filter(book => {
        return book.name.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setBookRecords(result)
    }
    else {
      setBookRecords(books)
    }
  }

  if (!auth.authenticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={classes.productWrapper}>
      <div className="container">
        <Typography variant="h1">Book Page</Typography>
        <div className="btn-wrapper">
          <TextField
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{ className: "small" }}
            onChange={e => {
              filter(e)
            }}
          />
          <Button
            type="button"
            className="btn pink-btn"
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => history("/add-book")}
          >
            Add
          </Button>
        </div>
        {
          bookRecords.length === 0 ?
            <Typography style={{
              textAlign: "center",
              fontSize:"30px"
            }}>No data Found</Typography>
            :

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

                  {bookRecords?.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        {
                          categories.map(category => {
                            if (row.CategoryId === category._id) {
                              return category.name
                            }
                          })
                        }
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          className="green-btn btn"
                          variant="contained"
                          color="primary"
                          disableElevation
                          onClick={() => {
                            history(`/edit-book/${row._id}`)
                            if (books) setBookRecords(books)
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        }
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="cancel-popup"
        >
          <DialogTitle id="alert-dialog-title">Delete book</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this book?
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
    </div>
  );
};

export { Book };
