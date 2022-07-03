import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { productListingStyle } from "./style";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import prodcutImage from "../../assets/images/levis.png";
import { defaultFilter, StatusCode } from "../../utils/constant";
// import bookService from "../../service/book/book.service";
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../redux/action/book.action";
import { addToCart, getCart } from "../../redux/action/cart.action";

const BookList = () => {
  const auth = useSelector(state => state.auth)
  const books = useSelector(state => state.books.book)
  const dispatch = useDispatch()
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const filter = defaultFilter;
  filter.pageSize = 12;
  const [filters, setFilters] = useState(filter);
  const [bookRecords, setBookRecords] = useState([]);
  useEffect(() => {
    searchAllBooks();
  }, []);

  useEffect(() => {
    searchAllBooks();
  }, [filters]);

  const searchAllBooks = () => {
    dispatch(getCart({
      userId: auth.user._id
    }))
    dispatch(getBook())
    setBookRecords(books);
  };

  const addItemToCart = (book) => {
    dispatch(addToCart({
      userId: auth.user._id,
      cartItems: {
        bookId: book._id,
        Quantity: 1,
        price: book.price
      }
    }))
  }

  if (!auth.authenticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h1">Book Listing</Typography>
        <div className="title-wrapper">
          {bookRecords?.length && (
            <Typography variant="h2">
              Total Records
              <span> - {bookRecords?.length} items</span>
            </Typography>
          )}
          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
              className={materialClasses.customSelect}
              MenuProps={{
                classes: { paper: materialClasses.customSelect },
              }}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {bookRecords?.map((book) => (
              <div className="product-list" key={book._id}>
                <div className="product-list-inner">
                  <em>
                    <img src={book.Base64image} alt={book.name} />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <p className="description">{book.Description}</p>
                    <p className="price">
                      <span className="discount-price">MRP</span>
                      &#8377; {book.price}
                    </p>
                    <button
                      className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation"
                      onClick={() => addItemToCart(book)}
                    >
                      <span className="MuiButton-label">ADD TO CART</span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {bookRecords?.length && (
          <div className="pagination-wrapper">
            <Pagination
              count={Math.ceil(bookRecords.length / 12)}
              onChange={(e, page) => {
                setFilters({ ...filter, page });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { BookList };
