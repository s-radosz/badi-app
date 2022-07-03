import {
    SET_LANGUAGE,
    GET_TRANSLATIONS,
    GET_TRANSLATIONS_SUCCESS,
    GET_TRANSLATIONS_FAIL,
} from './actionTypes';

export const setLanguage = (language: string) => {
    return {
        type: SET_LANGUAGE,
        payload: {language},
    };
};

export const getTranslations = () => {
    return {
        type: GET_TRANSLATIONS,
    };
};

export const getTranslationsSuccess = translations => {
    return {
        type: GET_TRANSLATIONS_SUCCESS,
        payload: translations,
    };
};

export const getTranslationsFail = error => {
    return {
        type: GET_TRANSLATIONS_FAIL,
        payload: error,
    };
};
