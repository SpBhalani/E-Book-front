import { signinConstant  , signupConstant } from '../constant/auth.constant'
import { axiosInstance } from '../../utils/axios'
import { StatusCode } from '../../utils/constant'
export const signin = (user) => {
    return async (dispatch) => {
        try{
            dispatch({
                type : signinConstant.SIGNIN_REQUEST
            })
            const {email , password} = user;
            const res = await axiosInstance.post('/signin',{email,password} );
            const _user = {
                _id: res.data.user._id,
                firtsname: res.data.user.firstname,
                lastname: res.data.user.lastname,
                email: res.data.user.email,
                role:res.data.user.roleid
            }
            if(res.status === StatusCode.Success ){
                dispatch({
                    type : signinConstant.SIGNIN_SUCCESS,
                    payload : {
                        _user,token : res.data.token
                    }
                })
            }
            else{
                dispatch({
                    type : signinConstant.SIGNIN_FAILURE,
                    payload : {
                        status : res.status
                    }
                })
            }
        }
        catch(e){
            dispatch({
                type : signinConstant.SIGNIN_FAILURE,
            })
        }
    }
}

export const signup = (user) => {
    return async (dispatch) => {
        try{
            dispatch({
                type : signupConstant.SIGNUP_REQUEST
            })
            const res = await axiosInstance.post('/signup' , user);
            if(res.status === StatusCode.Success){
                dispatch({
                    type : signupConstant.SIGNUP_SUCCESS,
                })
            }
            else{
                dispatch({
                    type : signupConstant.SIGNUP_FAILURE,
                    payload: {
                        status : res.status
                    }
                })
            }
        }
        catch(e){
            dispatch({
                type : signupConstant.SIGNUP_FAILURE
            })
        }
    }
}

