import {SET_ALERT, CLOSE_ALERT} from './actionTypes';

export const setAlert = (type: string, text: string) => {
    return {
        type: SET_ALERT,
        payload: {type, text},
    };
};

export const closeAlert = () => {
    return {
        type: CLOSE_ALERT,
    };
};
