export const START_SIGNIN = 'SIGNIN_START';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';

export const START_SIGNUP = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

import instance,{setAuthHeader, deleteAuthToken} from '../config/authConfig'

const initialState = {
    isAuthorized: false,
    token:null,
    loggingIn: false,
    loginError: null,
    registerIn: false,
    registerError: null
};

export function auth(state = initialState, action = {}) {
    switch (action.type) {
        case START_SIGNIN:
            return {
                ...state,
                loggingIn: true,
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                loggingIn: false,
                loginError: null,
                errorStatus: null,
                token: action.response.data.token
            };
        case SIGNIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                loginError: action.error,
                errorStatus: action.error,
                token: null
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                isAuthorized: false,
                token: null
            };
        case START_SIGNUP:
            return {
                ...state,
                registerIn: true,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthorized: true,
                registerIn: false,
                registerError: null,
                errorStatus:null
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                registerIn: false,
                registerError: action.error,
                errorStatus: action.error,
                token: null
            };
        default:
            return state;
    }
}

export function loginUser(username, password, navigate) {

    return function(dispatch) {
        dispatch({type:START_SIGNIN});
        instance.post('/api/auth/login', { username, password })
            .then(response => {
                setAuthHeader(response.data.token);
                dispatch({ type: SIGNIN_SUCCESS, response});
                navigate('App');
            })
            .catch((error) => {
                dispatch({ type: SIGNIN_FAIL, error});
            });
    }
}

export function registerUser(login, password, email, navigate) {

    return function(dispatch) {
        dispatch({type:START_SIGNUP});
        instance.post('/api/auth/register', { login, password, email })
           .then(response => {
               navigate.goBack();
               dispatch({ type: SIGNUP_SUCCESS, response});
            })
            .catch((error) => {
                dispatch({ type: SIGNUP_FAIL, error});
            });
    }
}

export function logOutUser(navigate) {
    return function (dispatch) {
        dispatch({ type: LOG_OUT_SUCCESS });
        deleteAuthToken();
        navigate('Auth');
    }
}
