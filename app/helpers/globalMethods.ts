export const returnTranslation = (
    name: string,
    translations: any,
    activeLanguage: string,
) => {
    if (name) {
        let value = translations?.find(
            translation => translation?.name === name,
        );

        return value[activeLanguage];
    }
    return '';
};
