import React, {useState} from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import axios from 'axios';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import InputComponent from './../../components/Utils/InputComponent';
import lang from './../../lang/Auth/ResetPassword';
import {
    customOrangeColor,
    fontSizeBig,
} from './../../assets/global/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../../../app/store/alert/actions';
import {API_URL} from './../../helpers/globalVariables';

interface IRegisterProps {
    navigation: any;
}

const ResetPassword = ({navigation}: IRegisterProps) => {
    const dispatch = useDispatch();
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [email, setEmail] = useState('');

    const resetPassword = (): void => {
        try {
            axios
                .post(API_URL + '/password-reset', {
                    email: email,
                })
                .then(response => {
                    if (response.data.status === 'OK') {
                        setEmail('');
                        dispatch(
                            setAlert(
                                'success',
                                lang.chackEmailSuccess[activeLanguage],
                            ),
                        );
                    } else {
                        setEmail('');
                        dispatch(
                            setAlert('danger', lang.resetError[activeLanguage]),
                        );
                    }
                })
                .catch(error => {
                    dispatch(
                        setAlert(
                            'danger',
                            lang.checkCredentialsError[activeLanguage],
                        ),
                    );
                });
        } catch (e) {
            dispatch(setAlert('danger', lang.resetError[activeLanguage]));
        }
    };

    return (
        <React.Fragment>
            <SafeAreaView style={styles.areaContainer}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>
                            {lang.header[activeLanguage]}
                        </Text>

                        <InputComponent
                            placeholder={lang.email[activeLanguage]}
                            inputOnChange={(email: string) => setEmail(email)}
                            value={email}
                            secureTextEntry={false}
                            maxLength={100}
                        />

                        <ButtonComponent
                            pressButtonComponent={resetPassword}
                            buttonComponentText={lang.header[activeLanguage]}
                            fullWidth={false}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                        />

                        <View style={styles.subBtnSection}>
                            <Text style={styles.subBtnSectionAsk}>
                                {lang.hasAccount[activeLanguage]}
                            </Text>
                            <TouchableHighlight
                                onPress={() => navigation.navigate('Login')}
                                underlayColor={'#fff'}>
                                <Text style={styles.registerBtn}>
                                    {lang.login[activeLanguage]}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </React.Fragment>
    );
};

interface Style {
    container: ViewStyle;
    headerText: TextStyle;
    subBtnSection: ViewStyle;
    subBtnSectionAsk: TextStyle;
    registerBtn: TextStyle;
    areaContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: '600',
        fontSize: fontSizeBig,
        marginTop: 70,
        paddingBottom: 50,
        //fontFamily: "Open Sans"
    },
    subBtnSection: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    subBtnSectionAsk: {
        color: '#333',
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
    registerBtn: {
        color: customOrangeColor,
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
});

export default ResetPassword;
