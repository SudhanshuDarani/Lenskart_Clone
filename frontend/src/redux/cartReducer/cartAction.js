// import axios from "axios";
export const GET_CARTDATA = 'GET_CARTDATA';
export const ADD_CART_ITEMS = 'ADD_CART_ITEMS';
export const DELETE_CART_ITEMS = 'DELETE_CART_ITEMS';

export const addCartItems = (cartdata) => (dispatch) => {
    try {
        if (cartdata !== undefined) {
            dispatch({ type: GET_CARTDATA, payload: cartdata })
            return { type: GET_CARTDATA, payload: cartdata }
        } else {
            dispatch({ type: GET_CARTDATA, payload: cartdata })
            return {
                ...cartdata
            }
        }
    } catch (error) {
        console.log(error.message)
    }
};

