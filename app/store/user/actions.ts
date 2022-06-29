import {
    SET_USER_DETAILS,
    SET_USER_DETAILS_SUCCESS,
    SET_USER_DETAILS_FAIL,
} from './actionTypes';

export const setUserDetails = () => {
    return {
        type: SET_USER_DETAILS,
    };
};

export const setUserDetailsSuccess = (userDetails: any) => {
    return {
        type: SET_USER_DETAILS_SUCCESS,
        payload: {userDetails},
    };
};

export const setUserDetailsFail = () => {
    return {
        type: SET_USER_DETAILS_FAIL,
    };
};
