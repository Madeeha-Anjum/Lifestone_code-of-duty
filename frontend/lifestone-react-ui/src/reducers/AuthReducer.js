import { UPDATE_LOGIN_STATE, UPDATE_USER_ID } from "../actions";

const INITIAL_STATE = {
    isAuth: false,
    userId: 1
};

const AuthReducer = ( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
    case UPDATE_LOGIN_STATE:
        return { ...state, isAuth: action.payload };
    case UPDATE_USER_ID:
        return { ...state, userId: action.payload };
    default:
        return state;
    }
};

export default AuthReducer;