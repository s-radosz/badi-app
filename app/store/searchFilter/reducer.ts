import {SET_DATE_FROM, SET_DATE_TO} from './actionTypes';

const initialState = {
    dateFrom: null,
    dateTo: null,
};

const searchFilter = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATE_FROM:
            state = {
                ...state,
                dateFrom: action.payload,
            };

        case SET_DATE_TO:
            state = {
                ...state,
                dateTo: action.payload,
            };

        default:
            state = {...state};
            break;
    }
    return state;
};

export default searchFilter;
