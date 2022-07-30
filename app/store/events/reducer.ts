import {
    SET_EVENTS,
    GET_EVENTS,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,
} from './actionTypes';

const initialState = {
    events: null,
    error: null,
};

const events = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            state = {...state};
            break;
        case GET_EVENTS_SUCCESS:
            state = {
                ...state,
                events: action.payload,
            };
            break;
        case GET_EVENTS_FAIL:
            state = {
                ...state,
                error: {
                    message: 'Error',
                },
            };
            break;

        case SET_EVENTS:
            state = {
                ...state,
                events: action.payload,
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default events;
