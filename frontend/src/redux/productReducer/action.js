import axios from "axios"
import { GET_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST } from "./actionTypes";


export const getProducts = (obj) => (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST })
    axios.get(`http://localhost:5000/eyeglasses`, obj).then((res) => {
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: res.data })
    }).then(() => {
        dispatch({ type: PRODUCT_FAILURE })
    })
};


// export const settingParams = (params) => (dispatch) => {
//     try {
//         // dispatch({ type: PRODUCT_REQUEST })
//         const newParams = [params];
//         const value = params
//         if (newParams.includes(value)) {
//             newParams = newParams.filter((el) => console.log("inside paransnsnsn : ", el !== value))
//             console.log("if condition : ", newParams)
  
//         } else {
//             newParams.push(value)
//             console.log("else condition : ", newParams)
//         }
//     } catch (err) {
//         console.log("error message : ", err.message)
//     }
// }