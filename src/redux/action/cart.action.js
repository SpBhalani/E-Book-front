import { axiosInstance } from "../../utils/axios"
import { StatusCode } from "../../utils/constant"
import { addToCartConstant, getCartConstant, removeItemCartConstant } from "../constant/cart.constant"

export const getCart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: getCartConstant.GET_CART_REQUEST
            })
            const res = await axiosInstance.post('/get-cart', data)
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: getCartConstant.GET_CART_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: getCartConstant.GET_CART_FAILURE
                })
            }
        }
        catch (e) {
            dispatch({
                type: getCartConstant.GET_CART_FAILURE
            })
        }
    }
}

export const addToCart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: addToCartConstant.ADD_TO_CART_REQUEST
            })
            const res = await axiosInstance.post("/add-to-cart", data)
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: addToCartConstant.ADD_TO_CART_SUCCESS
                })
                const res = await axiosInstance.post('/get-cart', data)
                if (res.status === StatusCode.Success) {
                    dispatch({
                        type: getCartConstant.GET_CART_SUCCESS,
                        payload: res.data
                    })
                }
                else {
                    dispatch({
                        type: getCartConstant.GET_CART_FAILURE
                    })
                }
            }
            else {
                dispatch({
                    type: addToCartConstant.ADD_TO_CART_FAILURE
                })
            }

        }
        catch (e) {
            dispatch({
                type: addToCartConstant.ADD_TO_CART_FAILURE
            })
        }
    }
}

export const removeCartItems = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: removeItemCartConstant.REMOVE_ITEM_CART_REQUEST
            })
            const res = await axiosInstance.post("/remove-item-cart", data)
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: removeItemCartConstant.REMOVE_ITEM_CART_SUCCESS
                })
                const res = await axiosInstance.post('/get-cart', data)
                if (res.status === StatusCode.Success) {
                    dispatch({
                        type: getCartConstant.GET_CART_SUCCESS,
                        payload: res.data
                    })
                }
                else {
                    dispatch({
                        type: getCartConstant.GET_CART_FAILURE
                    })
                }
            }
            else {
                dispatch({
                    type: removeItemCartConstant.REMOVE_ITEM_CART_FAILURE
                })
            }
        }
        catch (e) {
            dispatch({
                type: removeItemCartConstant.REMOVE_ITEM_CART_FAILURE
            })
        }
    }
}