import { getCategotyConstant, deletCategotyConstant, addCategotyConstant, editCategotyConstant } from "../constant/cateory.constant"

const initialState = {
    categories: [],
    loading: false
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case getCategotyConstant.GET_CATEGORY_REQUEST:
        case addCategotyConstant.ADD_CATEGORY_REQUEST:
        case deletCategotyConstant.DELETE_CATEGORY_REQUEST:
        case editCategotyConstant.EDIT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case getCategotyConstant.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload.data,
                loading: false
            }
        case getCategotyConstant.GET_CATEGORY_FAILURE:
            return {
                ...initialState
            }
        case addCategotyConstant.ADD_CATEGORY_SUCCESS:
        case addCategotyConstant.ADD_CATEGORY_FAILURE:
        case deletCategotyConstant.DELETE_CATEGORY_SUCCESS:
        case deletCategotyConstant.DELETE_CATEGORY_FAILURE:
        case editCategotyConstant.EDIT_CATEGORY_FAILURE:
        case editCategotyConstant.EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}