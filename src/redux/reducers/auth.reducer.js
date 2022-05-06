import { signinConstant } from "../constant/auth.constant";

const initialState = {
    user : {
        _id : '',
        firstname : "",
        lastname : "",
        email : ""
    },
    token :"",
    authenticated : false,
    authenticating : false,
    loading : false,
    statusCode : 0
}

export const signinReducer = (state = initialState,action) => {
    switch (action.type) {
        case signinConstant.SIGNIN_REQUEST: 
            return{
                ...state,
                authenticating : true,loading:true
            }
        case signinConstant.SIGNIN_SUCCESS:
            return{
                ...state,
                user:action.payload._user,
                token : action.payload.token,
                authenticating:false,
                authenticated:true,
                loading:false
            }
        case signinConstant.SIGNIN_FAILURE:
            return{
                ...state,
                authenticated:false,
                token : '',
                authenticating:false,
                loading:false,
                statusCode : action.payload?.status
            }
        default:
            return{
                ...state
            }
    }
}