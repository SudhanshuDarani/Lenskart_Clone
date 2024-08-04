import { GET_WISHLISTDATA, DELETE_WISHLIST_ITEMS, ADD_WISHLIST_ITEMS } from "./wishlistAction";
const initialState = {
    isLoading: false,
    isError: false,
    wishListItem: []
};
export const reducer = (state = initialState, { type, payload }) => {
    try {
        if (state.wishListItem !== undefined && type === GET_WISHLISTDATA) {
            return {
                ...state,
                wishListItem: payload,
                isLoading: false,
                isError: false
            }
        } else if (state.wishListItem !== undefined && type === ADD_WISHLIST_ITEMS) {
            return {
                ...state,
                wishListItem: payload
            }
        } else if (state.wishListItem !== undefined && type === DELETE_WISHLIST_ITEMS) {
            return {
                ...state,
                wishListItem: state.wishListItem.filter(item => item.productId !== payload)
            }
        } else {
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        }
    } catch (err) {
        console.log(err.message)
    }
};