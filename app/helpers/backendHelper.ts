import {get} from './apiHelper';
import * as url from './urlHelper';

//Post
export const getTranslations = async () => {
    // console.log(['getTranslations backend', url.GET_TRANSLATIONS]);
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
                        // translations.push(single);
                        translations = Object.assign(translations, single);
                    },
                );

                // console.log(['translations', translations]);

                return translations;
            } else {
                return;
            }
        })
        .catch(error => {
            return;
        });
};
