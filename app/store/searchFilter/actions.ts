import {
    SET_DATE_FROM,
    SET_DATE_TO,
    SET_START_VIEW_MAP_LATITUDE,
    SET_START_VIEW_MAP_LONGITUDE,
} from './actionTypes';

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

export const setStartViewMapLatitude = latitude => {
    return {
        type: SET_START_VIEW_MAP_LATITUDE,
        payload: latitude,
    };
};

export const setStartViewMapLongitude = longitude => {
    return {
        type: SET_START_VIEW_MAP_LONGITUDE,
        payload: longitude,
    };
};
