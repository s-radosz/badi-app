import {
    SET_CATEGORIES,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    SET_ACTIVE_CATEGORY,
} from './actionTypes';

export const setCategories = (categories: any) => {
    return {
        type: SET_CATEGORIES,
        payload: {categories},
    };
};

export const getCategories = () => {
    return {
        type: GET_CATEGORIES,
    };
};

export const getCategoriesSuccess = categories => {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload: categories,
    };
};

export const getCategoriesFail = error => {
    return {
        type: GET_CATEGORIES_FAIL,
        payload: error,
    };
};

export const setActiveCategory = activeCategory => {
    return {
        type: SET_ACTIVE_CATEGORY,
        payload: activeCategory,
    };
};
