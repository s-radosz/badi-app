import {SET_ALERT, CLOSE_ALERT} from './actionTypes';

const initialState = {
    showAlert: false,
    type: null,
    text: null,
};

const alert = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            state = {
                ...state,
                showAlert: true,
                type: action.payload.type,
                text: action.payload.text,
            };
            break;

        case CLOSE_ALERT:
            state = {
                ...state,
                showAlert: false,
                type: null,
                text: null,
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default alert;
