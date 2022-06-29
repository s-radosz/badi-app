import {SET_LOADER} from './actionTypes';

const initialState = {
    showLoader: false,
};

const loader = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            state = {
                ...state,
                showLoader: action.payload.status,
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default loader;
