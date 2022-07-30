import {
    SET_CATEGORIES,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    SET_ACTIVE_CATEGORY,
} from './actionTypes';

const initialState = {
    categoryGroups: null,
    activeCategory: {
        id: null,
        name: null,
    },
    error: null,
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            state = {...state};
            break;
        case GET_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categoryGroups: action.payload?.result,
                // activeCategory: action.payload?.activeCategory,
            };
            break;
        case GET_CATEGORIES_FAIL:
            state = {
                ...state,
                error: {
                    message: 'Error',
                },
            };
            break;

        case SET_CATEGORIES:
            state = {
                ...state,
                categoryGroups: action.payload.categories,
            };
            break;

        case SET_ACTIVE_CATEGORY:
            state = {
                ...state,
                activeCategory: action.payload,
            };

        default:
            state = {...state};
            break;
    }
    return state;
};

export default categories;
