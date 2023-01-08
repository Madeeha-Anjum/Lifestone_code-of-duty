import { UPDATE_LOGIN_STATE, UPDATE_USER_ID, UPDATE_PROVIDER } from "../actions";

const INITIAL_STATE = {
    isAuth: false,
    userId: 1,
    provider: {}
};

const AuthReducer = ( state = INITIAL_STATE, action ) => {
    switch( action.type ) {
    case UPDATE_LOGIN_STATE:
        return { ...state, isAuth: action.payload };
    case UPDATE_USER_ID:
        return { ...state, userId: action.payload };
    case UPDATE_PROVIDER:
        return { ...state, provider: action.payload };
    default:
        return state;
    }
};

export default AuthReducer;