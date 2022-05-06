import { combineReducers } from 'redux'
import { signinReducer } from './auth.reducer';
import { signupReducer } from './user.reducer';
import { getUserDataReducer } from './userData.reducer';
export const rootReducer = combineReducers({
    user : signupReducer,
    auth : signinReducer,
    allUser : getUserDataReducer
});