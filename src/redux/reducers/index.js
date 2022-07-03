import { combineReducers } from 'redux'
import { signinReducer } from './auth.reducer';
import { bookReducer } from './book.reducer';
import { cartReducer } from './cart.reducer';
import { categoryReducer } from './category.reducer';
import { signupReducer } from './user.reducer';
import { getUserDataReducer } from './userData.reducer';
export const rootReducer = combineReducers({
    user: signupReducer,
    auth: signinReducer,
    allUser: getUserDataReducer,
    categories: categoryReducer,
    books: bookReducer,
    cart : cartReducer
});