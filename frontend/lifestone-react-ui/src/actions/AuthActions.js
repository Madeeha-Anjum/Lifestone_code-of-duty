import { UPDATE_LOGIN_STATE, UPDATE_USER_ID } from "./index";

export const updateLoginState = isAuth => {
    return async dispatch => {
        // Updates the login isAuth variable in Redux store
        dispatch({ type: UPDATE_LOGIN_STATE, payload: isAuth });
    }
}

export const updateOwnerId = id => {
    return async dispatch => {
        // Updates the user Id variable in Redux store
        dispatch({ type: UPDATE_USER_ID, payload: id });
    }
}