import { axiosInstance } from "../../utils/axios"
import { userDataConstant, userDeleteConstant, userUpdateConstant } from "../constant/userData.constant"

export const userData = () => {
    return async (dispatch) => {
        dispatch({
            type : userDataConstant.GET_USERDATA_REQUEST
        })
        const res = await axiosInstance.post('/get-user-data');
        if(res.status === 200) {
            dispatch({
                type : userDataConstant.GET_USERDATA_SUCCESS,
                payload : res.data
            })
        }
        else{
            dispatch({
                type:userDataConstant.GET_USERDATA_FAILURE
            })
        }
    }
}

export const updateUser = (data) =>{
    return async (dispatch) => {
        dispatch({
            type : userUpdateConstant.UPDATE_USERDATA_REQUEST
        })
        const res = await axiosInstance.post('/update-user-data', data );
        if(res.status === 200) {
            dispatch({
                type: userUpdateConstant.UPDATE_USERDATA_SUCCESS
            })
            const dataRes = await axiosInstance.post('/get-user-data');
            if(dataRes.status === 200) {
                dispatch({
                    type : userDataConstant.GET_USERDATA_SUCCESS,
                    payload : dataRes.data
                })
            }
            else{
                dispatch({
                    type:userDataConstant.GET_USERDATA_FAILURE
                })
            }
        }
        else{
            dispatch({
                type:userUpdateConstant.UPDATE_USERDATA_FAILURE
            })
        }
    }
}

export const deleteUser = (data) => {
    return async (dispatch) => {
        dispatch({
            type:userDeleteConstant.DELETE_USERDATA_REQUEST
        })
        console.log(data);
        const res = await axiosInstance.post('/delete-user-data' , data);
        if(res.status === 200){
            dispatch({
                type: userDeleteConstant.DELETE_USERDATA_SUCCESS
            })
            const dataRes = await axiosInstance.post('/get-user-data');
            if(dataRes.status === 200) {
                dispatch({
                    type : userDataConstant.GET_USERDATA_SUCCESS,
                    payload : dataRes.data
                })
            }
            else{
                dispatch({
                    type:userDataConstant.GET_USERDATA_FAILURE
                })
            }
        }
        else{
            dispatch({
                type:userDeleteConstant.DELETE_USERDATA_FAILURE
            })
        }
    }
}