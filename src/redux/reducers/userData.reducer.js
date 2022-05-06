import { userDataConstant } from "../constant/userData.constant";

const initialState = {
    user : [],
    loading : false
}

export const getUserDataReducer = (state = initialState , action) => {
    switch (action.type) {
        case userDataConstant.GET_USERDATA_REQUEST:
            return{
                ...state,
                loading : true
            }
        case userDataConstant.GET_USERDATA_SUCCESS:
            return{
                ...state,
                user : action.payload.data,
                loading:false
            }    
        case userDataConstant.GET_USERDATA_FAILURE:
            return{
                ...state,
                loading:false
            }            
    
        default:
            return{
                ...state
            }
    }
}