import { signupConstant } from "../constant/auth.constant";

const initialState = {
    done : false,
    loading : false,
    statusCode : 0
} 

export const signupReducer = (state = initialState , action ) => {
    switch (action.type) {
        case signupConstant.SIGNUP_REQUEST:
            return{
                ...state,
                loading : true
            }
        case signupConstant.SIGNUP_SUCCESS:
            return{
                ...state,
                done : true,
                loading: false
            }
        case signupConstant.SIGNUP_FAILURE:
            return{
                ...state,
                done : false,
                loading:false,
                statusCode : action.payload?.status
            }    
        default:
            return{
                ...state
            }
    }
}