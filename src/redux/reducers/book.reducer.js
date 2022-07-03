import { addBookConstant, deletBookConstant, editBookConstant, getBookConstant } from "../constant/book.constant"

const initialState = {
    book: [],
    loading: false
}

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case getBookConstant.GET_BOOK_REQUEST:
        case addBookConstant.ADD_BOOK_REQUEST:
        case deletBookConstant.DELETE_BOOK_REQUEST:
        case editBookConstant.EDIT_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case getBookConstant.GET_BOOK_SUCCESS:
            return {
                ...state,
                book: action.payload.data,
                loading: false
            }
        case getBookConstant.GET_BOOK_FAILURE:
            return {
                ...initialState
            }
        case addBookConstant.ADD_BOOK_SUCCESS:
        case addBookConstant.ADD_BOOK_FAILURE:
        case deletBookConstant.DELETE_BOOK_SUCCESS:
        case deletBookConstant.DELETE_BOOK_FAILURE:
        case editBookConstant.EDIT_BOOK_FAILURE:
        case editBookConstant.EDIT_BOOK_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}