import { SET_ROUTE_PARAMS } from "./paramsActions";

const initialState = {
    routeParams: {},
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ROUTE_PARAMS:
            return {
                ...state,
                routeParams: payload,
            };
        default:
            return state;
    }
};