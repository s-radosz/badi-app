import {
    SET_LANGUAGE,
    GET_TRANSLATIONS,
    GET_TRANSLATIONS_SUCCESS,
    GET_TRANSLATIONS_FAIL,
} from './actionTypes';

const initialState = {
    translations: null,
    language: 'en',
    error: null,
};

const translations = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSLATIONS:
            state = {...state};
            break;
        case GET_TRANSLATIONS_SUCCESS:
            state = {...state, translations: [action.payload]};
            break;
        case GET_TRANSLATIONS_FAIL:
            state = {
                ...state,
                error: {
                    message: 'Error',
                },
            };
            break;

        case SET_LANGUAGE:
            state = {
                ...state,
                language: action.payload.language,
            };
            break;

        default:
            state = {...state};
            break;
    }
    return state;
};

export default translations;
