import {
    SET_DATE_FROM,
    SET_DATE_TO,
    SET_START_VIEW_MAP_LATITUDE,
    SET_START_VIEW_MAP_LONGITUDE,
} from './actionTypes';

const initialState = {
    dateFrom: null,
    dateTo: null,
    startViewMapLatitude: null,
    startViewMapLongitude: null,
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

        case SET_START_VIEW_MAP_LATITUDE:
            state = {
                ...state,
                startViewMapLatitude: action.payload,
            };

        case SET_START_VIEW_MAP_LONGITUDE:
            state = {
                ...state,
                startViewMapLongitude: action.payload,
            };

        default:
            state = {...state};
            break;
    }
    return state;
};

export default searchFilter;
