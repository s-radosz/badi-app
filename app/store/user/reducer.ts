import {
    SET_USER_DETAILS,
    SET_USER_DETAILS_SUCCESS,
    SET_USER_DETAILS_FAIL,
} from './actionTypes';

const initialState = {
    userDetails: [],
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            state = {
                ...state,
            };
            break;

        case SET_USER_DETAILS_SUCCESS:
            state = {
                ...state,
                userDetails: action.payload.userDetails,
            };
            break;

        case SET_USER_DETAILS_FAIL:
            state = {
                ...state,
                userDetails: [],
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default user;
