import {SET_API_URL} from './actionTypes';

const initialState = {
    API_URL: '',
};

const api = (state = initialState, action) => {
    switch (action.type) {
        case SET_API_URL:
            state = {
                ...state,
                API_URL: action.payload.API_URL,
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default api;
