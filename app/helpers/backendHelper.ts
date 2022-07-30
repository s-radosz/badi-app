import {get, post} from './apiHelper';
import * as url from './urlHelper';

//Translations
export const getTranslations = async () => {
    return await get(url.GET_TRANSLATIONS)
        .then(async response => {
            if (response.status === 'OK') {
                let translations = {};

                response.result.translations.map(
                    (translation: any, i: number) => {
                        let single = {
                            [translation.name]: {
                                en: translation.en,
                                de: translation.de,
                                fr: translation.fr,
                                es: translation.es,
                                zh: translation.zh,
                            },
                        };
                        translations = Object.assign(translations, single);
                    },
                );

                return translations;
            } else {
                return;
            }
        })
        .catch(error => {
            return;
        });
};

//User Data
export const getUserDetails = async () => {
    return await get(url.GET_TRANSLATIONS)
        .then(async response => {
            if (response.status === 'OK') {
                let translations = {};

                response.result.translations.map(
                    (translation: any, i: number) => {
                        let single = {
                            [translation.name]: {
                                en: translation.en,
                                de: translation.de,
                                fr: translation.fr,
                                es: translation.es,
                                zh: translation.zh,
                            },
                        };
                        translations = Object.assign(translations, single);
                    },
                );

                return translations;
            } else {
                return;
            }
        })
        .catch(error => {
            return;
        });
};

// categories
export const getCategories = async () => {
    return await get(url.GET_CATEGORIES)
        .then(async response => {
            if (response.status === 'OK') {
                return {
                    result: response.result,
                    activeCategory: {
                        id: response.result[0].categories[0].id,
                        name: response.result[0].categories[0].name,
                    },
                };
            } else {
                return;
            }
        })
        .catch(error => {
            return;
        });
};

//events
export const getEvents = async (
    latitude?: number,
    longitude?: number,
    categoryId?: number,
) => {
    console.log(['getEvents', latitude, longitude, categoryId]);
    return await post(url.GET_EVENTS, {
        latitude: latitude ? latitude : 51.509865,
        longitude: longitude ? longitude : -0.118092,
        category_id: categoryId ? categoryId : null,
    })
        .then(async response => {
            if (response.status === 'OK') {
                return response.result;
            } else {
                return;
            }
        })
        .catch(error => {
            return;
        });
};
