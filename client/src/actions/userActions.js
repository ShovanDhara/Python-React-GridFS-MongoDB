import * as types from './actionTypes';
import UserApi from '../api/userApi';
import processErrorMsg from './processErrorMsg';
import { beginAjaxCall, ajaxCallError } from './ajaxCallStatusAction';
import { statusIsError, statusIsSuccess } from './statusAction';

export function registerUserSuccess(user) {
    return { type: types.CREATE_USER_SUCCESS, user };
}

export function registerUserError() {
    return { type: types.CREATE_USER_ERROR };
}

export function loginUserSuccess(user) {
    return { type: types.LOGIN_USER_SUCCESS, user };
}

export function loadUserError(error) {
    return { type: types.LOGIN_USER_ERROR, error };
}

export function logOutSuccess() {
    return { type: types.LOG_OUT_SUCCESS };
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logOutSuccess());
        dispatch(statusIsSuccess('Logged out successfully'));
        sessionStorage.removeItem('token');
    };
};

export const registerUser = user => {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return UserApi.createUser(user).then(user => {
            dispatch(registerUserSuccess(user.data));
        }).catch(error => {
            dispatch(ajaxCallError());
            dispatch(registerUserError());
            dispatch(ajaxCallError());
            throw (processErrorMsg(error));
        });
    };
};

export const loginUser = user => {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return UserApi.loginUser(user).then(user => {
            sessionStorage.setItem('token', user.data.token);
            dispatch(loginUserSuccess(user.data));
            dispatch(statusIsSuccess('Logged in successfully'));
        }).catch(error => {
            dispatch(loadUserError(error));
            dispatch(statusIsError(error));
            dispatch(ajaxCallError());
            throw (processErrorMsg(error));
        });
    };
};

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return UserApi.loginUser().then(user => {
            dispatch(loginUserSuccess(user.data));
            dispatch(statusIsSuccess('User data loaded successfully'));
        }).catch(error => {
            dispatch(loadUserError(error));
            dispatch(statusIsError(error));
            dispatch(ajaxCallError());
        });
    };
};