import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import { headerStyle } from './style'
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import ListItem from "@material-ui/core/ListItem";
import siteLogo from "../../assets/images/site-logo.svg";
import crossIcon from "../../assets/images/cross.svg";
import cartIcon from "../../assets/images/cart.png";
import flagIcon from "../../assets/images/flag.png";
import searchIcon from "../../assets/images/search.png";
import { StatusCode, defaultFilter } from '../../utils/constant';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/action/cart.action';
import { getBook } from '../../redux/action/book.action';
import { getCategory } from '../../redux/action/category.action';


/**
* @author
* @function Header
**/
// Searching Remaining

export const Header = () => {
    const auth = useSelector(state => state.auth)
    const cartItems = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()
    const classes = headerStyle();
    const [open, setOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [cartCount,setCartCount] = useState(0)
    const openMenu = () => {
        document.body.classList.toggle("open-menu");
    };
    const [bookRecords, setBookRecords] = useState([]);
    useEffect(() => {
        dispatch(getBook())
        dispatch(getCategory())
        
    },[])
    useEffect(()=> {
        let count = 0;
        cartItems.map(cart => {
            count += cart.Quantity
        })
        setCartCount(count)
    },[cartItems])

    return (
        <div className={classes.headerWrapper}>
            <AppBar className='site-header' id="header" position="static">
                <div
                    className="top-header"
                    style={{ display: open ? "none" : "block" }}>
                </div>
                <div className='bottom-header'>
                    <div className="container">
                        <div className="header-wrapper">
                            <div className="logo-wrapper">
                                <Link to="/" className="site-logo" title="logo">
                                    <img src={siteLogo} alt="logo" />
                                </Link>
                            </div>
                            <div className="nav-wrapper">
                                <div className="top-right-bar">
                                    {
                                        !auth.authenticated ?
                                            <List className="top-nav-bar">
                                                <ListItem>
                                                    <Link to="/login" title="Login">
                                                        Login
                                                    </Link>
                                                </ListItem>
                                                <ListItem>
                                                    <Link to="/register" title="Register">
                                                        Register
                                                    </Link>
                                                </ListItem>
                                            </List>
                                            :
                                            <List className="top-nav-bar">
                                                <ListItem>
                                                    <Link to="/user" title="User">
                                                        User
                                                    </Link>
                                                </ListItem>
                                                <ListItem>
                                                    <Link to="/category" title="Category">
                                                        Category
                                                    </Link>
                                                </ListItem>
                                                <ListItem>
                                                    <Link to="/book" title="Category">
                                                        Book
                                                    </Link>
                                                </ListItem>
                                            </List>

                                    }
                                    {
                                        auth.authenticated ?
                                            <List className="cart-country-wrap">
                                                <ListItem className="cart-link">
                                                    <Link to="/cart" title="Cart">
                                                        <img src={cartIcon} alt="cart.png" />
                                                        <span>{cartCount}</span>
                                                        Cart
                                                    </Link>
                                                </ListItem>
                                                <ListItem className="hamburger" onClick={openMenu}>
                                                    <span></span>
                                                </ListItem>
                                            </List>
                                            :
                                            " "
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    auth.authenticated ?
                        <div className="header-search-wrapper">
                            <div className="container">
                                <div className="header-search-outer">
                                    <div className="header-search-inner">
                                        <div className="text-wrapper">
                                            <TextField
                                                id="text"
                                                name="text"
                                                placeholder="What are you looking for..."
                                                variant="outlined"
                                                onChange={(e) => {
                                                    setSearchKeyword(e.target.value?.trim());
                                                }}
                                            />
                                            {searchKeyword && (
                                                <div className="product-listing">
                                                    {bookRecords?.length ? (
                                                        <>
                                                            <List className="related-product-list">
                                                                {bookRecords.map((book) => (
                                                                    <ListItem key={book.id}>
                                                                        <div className="inner-block">
                                                                            <div className="left-col">
                                                                                <span className="title">{book.name}</span>
                                                                                <p>{book.description}</p>
                                                                            </div>
                                                                            <div className="right-col">
                                                                                <span className="price">{book.price}</span>
                                                                                <Link to="/">Add to cart</Link>
                                                                            </div>
                                                                        </div>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {loading ? (
                                                                <p className="loading">Loading....</p>
                                                            ) : (
                                                                <p className="no-product">No product found</p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            className="green-btn btn"
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                        >
                                            <em>
                                                <img src={searchIcon} alt="search" />
                                            </em>
                                            Search
                                        </Button>
                                        {/* <Button
                                    type="submit"
                                    className="btn pink-btn"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                >
                                    Cancel
                                </Button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null

                }
            </AppBar>
        </div>
    )

}