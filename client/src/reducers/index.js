import { combineReducers } from 'redux';
import products from './productReducer';
import user from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import requestState from './statusReducer';

const rootReducer = combineReducers({
    products,
    user,
    ajaxCallsInProgress,
    requestState
});

export default rootReducer;