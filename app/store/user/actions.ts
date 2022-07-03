import {
    SET_USER_DETAILS,
    // SET_USER_DETAILS_SUCCESS,
    // SET_USER_DETAILS_FAIL,
} from './actionTypes';

export const setUserDetails = (userDetails: any) => {
    console.log(['setUserDetails', userDetails]);
    return {
        type: SET_USER_DETAILS,
        payload: {userDetails},
    };
};

// export const setUserDetailsSuccess = (userDetails: any) => {
//     return {
//         type: SET_USER_DETAILS_SUCCESS,
//         payload: {userDetails},
//     };
// };

// export const setUserDetailsFail = () => {
//     return {
//         type: SET_USER_DETAILS_FAIL,
//     };
// };
