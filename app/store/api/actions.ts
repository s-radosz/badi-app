import {SET_API_URL} from './actionTypes';

export const setApiUrl = (API_URL: string) => {
    return {
        type: SET_API_URL,
        payload: {API_URL},
    };
};
