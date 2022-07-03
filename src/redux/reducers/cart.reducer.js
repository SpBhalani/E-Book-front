import { addToCartConstant, getCartConstant, removeItemCartConstant } from "../constant/cart.constant";

const initialState = {
    cartItems: [],
    loading: false
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case getCartConstant.GET_CART_REQUEST:
        case addToCartConstant.ADD_TO_CART_REQUEST:
        case removeItemCartConstant.REMOVE_ITEM_CART_REQUEST:
            return {
                ...state,
                loading: true
            }
        case getCartConstant.GET_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload.data.cartItems,
                loading: false
            }
        case getCartConstant.GET_CART_FAILURE:
            return {
                ...initialState
            }
        case addToCartConstant.ADD_TO_CART_FAILURE:
        case removeItemCartConstant.REMOVE_ITEM_CART_FAILURE:
            return {
                ...state,
                loading: false
            }
        case addToCartConstant.ADD_TO_CART_SUCCESS:
        case removeItemCartConstant.REMOVE_ITEM_CART_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}