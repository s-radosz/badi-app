import {SET_USER_DETAILS} from './actionTypes';

const initialState = {
    details: null,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            state = {
                ...state,
                details: action.payload.userDetails,
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default user;
