import {
    SET_EVENTS,
    GET_EVENTS,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,
} from './actionTypes';

export const setEvents = (events: any) => {
    return {
        type: SET_EVENTS,
        payload: {events},
    };
};

export const getEvents = (
    latitude?: number,
    longitude?: number,
    categoryId?: number,
) => {
    return {
        type: GET_EVENTS,
        payload: {latitude, longitude, categoryId},
    };
};

export const getEventsSuccess = events => {
    return {
        type: GET_EVENTS_SUCCESS,
        payload: events,
    };
};

export const getEventsFail = error => {
    return {
        type: GET_EVENTS_FAIL,
        payload: error,
    };
};
