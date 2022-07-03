import { axiosInstance } from "../../utils/axios"
import { StatusCode } from "../../utils/constant"
import { addBookConstant, deletBookConstant, editBookConstant, getBookConstant } from "../constant/book.constant"

export const getBook = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: getBookConstant.GET_BOOK_REQUEST
            })
            const res = await axiosInstance.post("/get-book")
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: getBookConstant.GET_BOOK_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: getBookConstant.GET_BOOK_FAILURE,
                    payload: {
                        status: res.status
                    }
                })
            }
        }
        catch (e) {
            dispatch({
                type: getBookConstant.GET_BOOK_FAILURE
            })
        }
    }
}

export const addBook = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: addBookConstant.ADD_BOOK_REQUEST
            })
            const resp = await axiosInstance.post("/add-book", data)
            if (resp.status === StatusCode.Success) {
                dispatch({
                    type: addBookConstant.ADD_BOOK_SUCCESS
                })

                dispatch({
                    type: getBookConstant.GET_BOOK_REQUEST
                })
                const res = await axiosInstance.post("/get-book")
                if (res.status === StatusCode.Success) {
                    dispatch({
                        type: getBookConstant.GET_BOOK_SUCCESS,
                        payload: res.data
                    })
                }
                else {
                    dispatch({
                        type: getBookConstant.GET_BOOK_FAILURE,
                        payload: {
                            status: res.status
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: addBookConstant.ADD_BOOK_FAILURE
                })
            }
        }
        catch (e) {
            dispatch({
                type: addBookConstant.ADD_BOOK_FAILURE
            })
        }
    }
}

export const editBook = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: editBookConstant.EDIT_BOOK_REQUEST
            })
            const resp = await axiosInstance.post("/update-book", data)
            if (resp.status === StatusCode.Success) {
                dispatch({
                    type: editBookConstant.EDIT_BOOK_SUCCESS
                })

                dispatch({
                    type: getBookConstant.GET_BOOK_REQUEST
                })
                const res = await axiosInstance.post("/get-book")
                if (res.status === StatusCode.Success) {
                    dispatch({
                        type: getBookConstant.GET_BOOK_SUCCESS,
                        payload: res.data
                    })
                }
                else {
                    dispatch({
                        type: getBookConstant.GET_BOOK_FAILURE,
                        payload: {
                            status: res.status
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: editBookConstant.EDIT_BOOK_FAILURE
                })
            }
        }
        catch (e) {
            dispatch({
                type: editBookConstant.EDIT_BOOK_FAILURE
            })
        }
    }
}

export const deleteBook = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: deletBookConstant.DELETE_BOOK_REQUEST
            })
            const resp = await axiosInstance.post("/delete-book", data)
            if (resp.status === StatusCode.Success) {
                dispatch({
                    type: deletBookConstant.DELETE_BOOK_SUCCESS
                })

                dispatch({
                    type: getBookConstant.GET_BOOK_REQUEST
                })
                const res = await axiosInstance.post("/get-book")
                if (res.status === StatusCode.Success) {
                    dispatch({
                        type: getBookConstant.GET_BOOK_SUCCESS,
                        payload: res.data
                    })
                }
                else {
                    dispatch({
                        type: getBookConstant.GET_BOOK_FAILURE,
                        payload: {
                            status: res.status
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: deletBookConstant.DELETE_BOOK_FAILURE
                })
            }
        }
        catch (e) {
            dispatch({
                type: deletBookConstant.DELETE_BOOK_FAILURE
            })
        }
    }
}