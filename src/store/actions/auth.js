import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (experationTime) => {
    return dispatch => {
       setTimeout(() => {
            dispatch(logout());
       }, experationTime * 1000)
    };
};


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {email,password,returnSecureToken:true};

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCY80xyzaSRqB8BNeUcYZZEdLxeI0LTZmI';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY80xyzaSRqB8BNeUcYZZEdLxeI0LTZmI';
        }

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    };
};