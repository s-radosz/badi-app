import {SET_DATE_FROM, SET_DATE_TO} from './actionTypes';

export const setDateFrom = date => {
    return {
        type: SET_DATE_FROM,
        payload: date,
    };
};

export const setDateTo = date => {
    return {
        type: SET_DATE_TO,
        payload: date,
    };
};
