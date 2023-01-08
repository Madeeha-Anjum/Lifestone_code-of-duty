// All the reducers are combined here to make one global redux state
import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
    auth: AuthReducer
});

export default rootReducer;