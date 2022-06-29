import {SET_TRANSLATIONS, SET_LANGUAGE} from './actionTypes';

export const setAlert = (translations: any) => {
    return {
        type: SET_TRANSLATIONS,
        payload: {translations},
    };
};

export const setLanguage = (language: string) => {
    return {
        type: SET_LANGUAGE,
        payload: {language},
    };
};
