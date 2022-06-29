import {SET_LOADER} from './actionTypes';

export const setLoader = (status: boolean) => {
    return {
        type: SET_LOADER,
        payload: {status},
    };
};
