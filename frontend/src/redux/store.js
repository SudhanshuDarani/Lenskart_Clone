import { applyMiddleware, combineReducers, legacy_createStore, } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as productReducer } from "./productReducer/reducer";
import { reducer as cartReducer } from "./cartReducer/cartReducer";
import { reducer as paramsReducer } from "./setRoutes/paramsReducer";
import { reducer as wishlistReducer } from "./wishlistReducer/wishlistReducer";


const rootReducer = combineReducers({
    authReducer, productReducer, cartReducer, paramsReducer, wishlistReducer
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));