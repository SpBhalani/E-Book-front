import React, { useEffect, useState } from "react";
import { cartStyle } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Link, Tooltip } from "@material-ui/core";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import Box from "@material-ui/core/Box";
import { addToCart, getCart, removeCartItems } from "../../redux/action/cart.action";
import { getBook } from "../../redux/action/book.action";
import { useNavigate, Navigate } from "react-router-dom";


const Cart = () => {
    const _cart = useSelector(state => state.cart.cartItems)
    const books = useSelector(state => state.books.book)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const classes = cartStyle();
    const [cart, setCart] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartPrice, setCartPrice] = useState(0)

    useEffect(() => {
        searchCart();
    }, [])
    useEffect(() => {
        if (_cart) {
            setCart(_cart)
            let price = 0;
            let count = 0;
            _cart?.map(cart => {
                price += cart.price
                count += cart.Quantity
            })
            setCartPrice(price)
            setCartCount(count)
        }
    }, [_cart])

    const searchCart = () => {
        if (auth.authenticated) {
            dispatch(getBook())
            dispatch(getCart({
                userId: auth.user._id
            }))
            if (_cart) setCart(_cart);
        }
    };

    const incrementCartItem = (book) => {
        dispatch(addToCart({
            userId: auth.user._id,
            cartItems: {
                bookId: book._id,
                Quantity: 1,
                price: book.price
            }
        }))
    }

    const decrementCartItem = (book) => {
        dispatch(addToCart({
            userId: auth.user._id,
            cartItems: {
                bookId: book._id,
                Quantity: -1,
                price: book.price
            }
        }))
    }
    const removeFromCart = (book) => {
        dispatch(removeCartItems({
            userId: auth.user._id,
            bookId: book._id,
        }))
    }
    if (!auth.authenticated) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <div className={classes.cartWrapper}>
                <div className="container">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"

                    >
                        <Typography variant="h3">Cart</Typography>
                    </Box>
                    <div className="cart-heading-block">
                        <Typography variant="h2">My Shopping Bag {cartCount}</Typography>
                        <div className="total-price">Total price: {cartPrice}</div>
                    </div>
                    {cart.map((product) => {
                        const book = books?.filter(b => product.bookId === b._id)[0]
                        return (
                            <div className="cart-list-wrapper" key={product._id}>
                                <div className="cart-list-item">
                                    <div className="cart-item-img">
                                        <Link>
                                            <img src={book.Base64image} alt={book.name}
                                                style={{
                                                    objectFit: "contain"
                                                }} />
                                        </Link>
                                    </div>
                                    <div className="cart-item-content">
                                        <div className="cart-item-top-content">
                                            <div className="cart-item-left">
                                                <p className="brand"></p>
                                                <Link>{book.name}</Link>
                                            </div>
                                            <div className="price-block">
                                                <span className="current-price">MRP &#8377; {book.price} ({product.Quantity}) = &#8377; {product.price}</span>
                                            </div>
                                        </div>
                                        <div className="cart-item-bottom-content">
                                            <div className="qty-group">
                                                <Button className="btn pink-btn" onClick={() => incrementCartItem(book)}>
                                                    +
                                                </Button>
                                                <span className="number-count">{product.Quantity}</span>
                                                <Button
                                                    className="btn pink-btn"
                                                    onClick={() => decrementCartItem(book)}
                                                    disabled={product.Quantity === 1 ? true : false}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                            <Link onClick={() => removeFromCart(book)}>Remove</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Cart