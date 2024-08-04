import {  GET_CARTDATA } from "./cartAction";
const initialState = {
    isLoading: false,
    isError: false,
    cartItem: []
};
export const reducer = (state = initialState, { type, payload }) => {
    try {
        if (state.cartItem !== undefined && type === GET_CARTDATA) {
            // state.cartItem.push(payload)
            return {
                ...state,
                cartItem: payload,
                isLoading: false
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
    // console.log(state.cartItem.push(payload))
};