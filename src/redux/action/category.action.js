import { axiosInstance } from "../../utils/axios"
import { StatusCode } from "../../utils/constant"
import { getCategotyConstant, deletCategotyConstant, addCategotyConstant, editCategotyConstant } from "../constant/cateory.constant"

export const getCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: getCategotyConstant.GET_CATEGORY_REQUEST
            })
            const res = await axiosInstance.post('/get-category')
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: getCategotyConstant.GET_CATEGORY_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: getCategotyConstant.GET_CATEGORY_FAILURE,
                    payload: {
                        status: res.status
                    }
                })
            }
        }
        catch (e) {
            dispatch({
                type: getCategotyConstant.GET_CATEGORY_FAILURE,
            })
        }
    }
}

export const editCategory = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: editCategotyConstant.EDIT_CATEGORY_REQUEST
            })
            const res = await axiosInstance.post('/update-category', data)
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: editCategotyConstant.EDIT_CATEGORY_SUCCESS
                })
                const categoryRes = await axiosInstance.post('/get-category')
                if (categoryRes.status === StatusCode.Success) {
                    dispatch({
                        type: getCategotyConstant.GET_CATEGORY_SUCCESS,
                        payload: categoryRes.data
                    })
                }
                else {
                    dispatch({
                        type: getCategotyConstant.GET_CATEGORY_FAILURE,
                        payload: {
                            status: categoryRes.status
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: editCategotyConstant.EDIT_CATEGORY_FAILURE,
                    payload: {
                        status: res.status
                    }
                })
            }
        }
        catch (e) {
            dispatch({
                type: editCategotyConstant.EDIT_CATEGORY_FAILURE
            })
        }
    }
}

export const addCategory = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: addCategotyConstant.ADD_CATEGORY_REQUEST
            })
            const res = await axiosInstance.post('/add-category', data)
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: addCategotyConstant.ADD_CATEGORY_SUCCESS
                })
                const categoryRes = await axiosInstance.post('/get-category')
                if (categoryRes.status === StatusCode.Success) {
                    dispatch({
                        type: getCategotyConstant.GET_CATEGORY_SUCCESS,
                        payload: categoryRes.data
                    })
                }
                else {
                    dispatch({
                        type: getCategotyConstant.GET_CATEGORY_FAILURE,
                        payload: {
                            status: categoryRes.status
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: addCategotyConstant.ADD_CATEGORY_FAILURE,
                    payload: {
                        status: res.status
                    }
                })
            }
        }
        catch (e) {
            dispatch({
                type: addCategotyConstant.ADD_CATEGORY_FAILURE
            })
        }
    }
}

export const deleteCategory = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: deletCategotyConstant.DELETE_CATEGORY_REQUEST
            })
            const res = await axiosInstance.post('/delete-category', data)
            if (res.status === StatusCode.Success) {
                dispatch({
                    type: deletCategotyConstant.DELETE_CATEGORY_SUCCESS
                })
                const categoryRes = await axiosInstance.post('/get-category')
                if (categoryRes.status === StatusCode.Success) {
                    dispatch({
                        type: getCategotyConstant.GET_CATEGORY_SUCCESS,
                        payload: categoryRes.data
                    })
                }
                else {
                    dispatch({
                        type: getCategotyConstant.GET_CATEGORY_FAILURE,
                        payload: {
                            status: categoryRes.status
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: deletCategotyConstant.DELETE_CATEGORY_FAILURE,
                    payload: {
                        status: res.status
                    }
                })
            }
        }
        catch (e) {
            dispatch({
                type: deletCategotyConstant.DELETE_CATEGORY_FAILURE
            })
        }
    }
}