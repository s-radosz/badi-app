import {SET_TRANSLATIONS, SET_LANGUAGE} from './actionTypes';

const initialState = {
    translations: [],
    language: '',
};

const alert = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSLATIONS:
            state = {
                ...state,
                translations: action.payload.translations,
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

export default alert;
