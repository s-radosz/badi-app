import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from './../../store/translations/actions';

const enFlag: any = require('./../../assets/images/en-flag.png');
const plFlag: any = require('./../../assets/images/pl-flag.png');
const deFlag: any = require('./../../assets/images/de-flag.jpg');
const frFlag: any = require('./../../assets/images/fr-flag.png');
const esFlag: any = require('./../../assets/images/es-flag.png');
const zhFlag: any = require('./../../assets/images/zh-flag.png');

const Languages = (props: any) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    useEffect(() => {
        console.log(['languages', activeLanguage]);
    }, [activeLanguage]);

    const [showLanguages, setShowLanguages] = useState(false);
    const languages = [
        {
            icon: enFlag,
            text: 'en',
        },
        {
            icon: plFlag,
            text: 'pl',
        },
        {
            icon: deFlag,
            text: 'de',
        },
        {
            icon: frFlag,
            text: 'fr',
        },
        {
            icon: esFlag,
            text: 'es',
        },
        {
            icon: zhFlag,
            text: 'zh',
        },
    ];

    return (
        <View style={styles.activeFlag}>
            {languages.map((language, i) => {
                if (language.text === activeLanguage) {
                    return (
                        <TouchableOpacity
                            onPress={() => setShowLanguages(!showLanguages)}
                            key={`active-flag`}>
                            <Image style={styles.flag} source={language.icon} />
                        </TouchableOpacity>
                    );
                }
            })}

            {showLanguages &&
                languages &&
                languages.map((languageFlag, i) => {
                    if (languageFlag.text !== activeLanguage) {
                        return (
                            <Animatable.View
                                animation="fadeIn"
                                key={`flag-${i}`}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(
                                            setLanguage(languageFlag.text),
                                        );
                                        setShowLanguages(false);
                                    }}>
                                    <Image
                                        style={styles.flag}
                                        source={languageFlag.icon}
                                    />
                                </TouchableOpacity>
                            </Animatable.View>
                        );
                    }
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    activeFlag: {
        position: 'absolute',
        zIndex: 10,
        right: 10,
        top: 10,
        backgroundColor: 'Red',
    },
    flag: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 10,
    },
});

export default Languages;
