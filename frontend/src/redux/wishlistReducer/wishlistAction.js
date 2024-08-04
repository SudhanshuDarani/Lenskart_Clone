export const GET_WISHLISTDATA = 'GET_WISHLISTDATA';
export const ADD_WISHLIST_ITEMS = 'ADD_WISHLIST_ITEMS';
export const DELETE_WISHLIST_ITEMS = 'DELETE_WISHLIST_ITEMS';
export const getWishlistData = (wishlistdata) => ({
    type: GET_WISHLISTDATA,
    payload: wishlistdata,
});

export const deleteWishListItem = (productId) =>  ({
    // try {
    //     if (productId !== undefined) {
    //         dispatch({ type: DELETE_WISHLIST_ITEMS, payload: productId })
    //         console.log('Dispatching deleteWishListItem with:', productId);
    //         // return { type: DELETE_WISHLIST_ITEMS, payload: productId }
    //     } else {
    //         dispatch({ type: DELETE_WISHLIST_ITEMS, payload: productId })
    //         return {
    //             ...productId
    //         }
    //     }
    // } catch (error) {
    //     console.log(error.message)
    // }
    type: DELETE_WISHLIST_ITEMS,
    payload: productId
});

export const addWishListItems = (wishlistdata) => (dispatch) => {
    try {
        if (wishlistdata !== undefined) {
            dispatch({ type: GET_WISHLISTDATA, payload: wishlistdata })
            // return { type: GET_WISHLISTDATA, payload: wishlistdata }
        } else {
            dispatch({ type: GET_WISHLISTDATA, payload: wishlistdata })
            return {
                ...wishlistdata
            }
        }
    } catch (error) {
        console.log(error.message)
    }
};