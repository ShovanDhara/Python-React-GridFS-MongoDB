import * as types from '../actions/actionTypes';
import initialState from './initialState';

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_USER_SUCCESS:
            return state;
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginData: action.user
            }
        case types.LOGIN_USER_ERROR:
            return { ...state, isLoggedIn: false, loginData: [] }
        case types.LOG_OUT_SUCCESS:
            return { ...state, isLoggedIn: false, loginData: [] }
        default:
            return state;
    }
}

export default user