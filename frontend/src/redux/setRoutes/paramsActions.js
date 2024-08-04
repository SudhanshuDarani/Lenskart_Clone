export const SET_ROUTE_PARAMS = "SET_ROUTE_PARAMS";

export const setRouteParams = (params) => ({
  type: SET_ROUTE_PARAMS,
  payload: params,
  
});


export const navigateAction = (url) => async (dispatch, getState) => {
  dispatch(setRouteParams({ url }));
};