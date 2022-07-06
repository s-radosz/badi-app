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
import ButtonComponent from './../Utils/ButtonComponent';
import InputComponent from './../Utils/InputComponent';
import lang from './../../assets/lang/Auth/ResetPassword';
import {
    customOrangeColor,
    fontSizeBig,
} from './../../assets/global/globalStyles';
import {useDispatch} from 'react-redux';
import {setAlert} from '../../../app/store/alert/actions';
import {API_URL} from './../../helpers/globalVariables';

interface IRegisterProps {
    navigation: any;
}

const ResetPassword = ({navigation}: IRegisterProps) => {
    const dispatch = useDispatch();

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
                            setAlert('success', lang.chackEmailSuccess['pl']),
                        );
                    } else {
                        setEmail('');
                        dispatch(setAlert('danger', lang.resetError['pl']));
                    }
                })
                .catch(error => {
                    dispatch(
                        setAlert('danger', lang.checkCredentialsError['pl']),
                    );
                });
        } catch (e) {
            dispatch(setAlert('danger', lang.resetError['pl']));
        }
    };

    return (
        <React.Fragment>
            <SafeAreaView style={styles.areaContainer}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>
                            {lang.header['pl']}
                        </Text>

                        <InputComponent
                            placeholder={lang.email['pl']}
                            inputOnChange={(email: string) => setEmail(email)}
                            value={email}
                            secureTextEntry={false}
                            maxLength={100}
                        />

                        <ButtonComponent
                            pressButtonComponent={resetPassword}
                            buttonComponentText={lang.header['pl']}
                            fullWidth={false}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                        />

                        <View style={styles.subBtnSection}>
                            <Text style={styles.subBtnSectionAsk}>
                                {lang.hasAccount['pl']}
                            </Text>
                            <TouchableHighlight
                                onPress={() => navigation.navigate('Login')}
                                underlayColor={'#fff'}>
                                <Text style={styles.registerBtn}>
                                    {lang.login['pl']}
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
