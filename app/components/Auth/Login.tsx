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
import lang from './../../assets/lang/Auth/Login';
import {
    customOrangeColor,
    fontSizeBig,
} from './../../assets/global/globalStyles';
import {useDispatch} from 'react-redux';
import {setAlert} from '../../../app/store/alert/actions';
import {setUserDetails} from '../../../app/store/user/actions';
import {API_URL} from './../../helpers/globalVariables';
import NavigationService from './../../routes/NavigationService';

interface ILoginProps {
    navigation: any;
}

const Login = ({navigation}: ILoginProps) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const context = useContext(GlobalContext);

    const loginUser = (): void => {
        //console.log([email, password]);
        if (email && !password) {
            dispatch(setAlert('danger', lang.passwordError['pl']));
        } else if (!email && password) {
            dispatch(setAlert('danger', lang.emailError['pl']));
        } else if (!email && !password) {
            dispatch(setAlert('danger', lang.emailPasswordError['pl']));
        } else if (email && password) {
            console.log(['API_URL', API_URL, API_URL + '/login']);
            try {
                // let API_URL = context.API_URL;
                //let navProps = navigation.state.params;
                //console.log([API_URL]);
                axios
                    .post(API_URL + '/login', {
                        email: email,
                        password: password,
                    })
                    .then(response => {
                        // console.log(response);

                        console.log([
                            'response.data.status',
                            response.data.result.token,
                        ]);
                        if (response.data.result.token) {
                            //console.log(["response.data.user", response.data]);
                            let token = response.data.result.token;

                            const config = {
                                Authorization: `Bearer ${token}`,
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                                Accept: 'application/json',
                            };

                            axios
                                .post(
                                    API_URL + '/details',
                                    {},
                                    {headers: config},
                                )
                                .then(response => {
                                    if (response.data.result) {
                                        //navProps.setUserData(response2.data.result);

                                        //console.log(["userData", response2.data.result]);

                                        //@ts-ignore
                                        dispatch(
                                            setUserDetails(
                                                response.data.result,
                                            ),
                                        );

                                        // context.setUserData(
                                        //     response.data.result,
                                        // );
                                        // context.setUserLoggedIn(true);
                                    }
                                })
                                .catch(error => {
                                    dispatch(
                                        setAlert(
                                            'danger',
                                            lang.loginError['pl'],
                                        ),
                                    );
                                });
                        } else {
                            //console.log("Nie ma tokena");
                        }
                    })
                    .catch(error => {
                        dispatch(setAlert('danger', lang.loginError['pl']));
                        // context.setAlert(true, 'danger', lang.loginError['pl']);
                    });
            } catch (e) {
                //console.log(e);
            }
        }
    };

    const adminLoginUser = () => {
        console.log(['API_URL', API_URL + '/login']);
        try {
            // let API_URL = context.API_URL;
            //let navProps = navigation.state.params;
            //console.log([API_URL]);
            axios
                .post(API_URL + '/login', {
                    email: 'radoszszymon@gmail.com',
                    password: '123qwe',
                })
                .then(response => {
                    console.log(response.data);

                    console.log([
                        'response.data.status',
                        response.data.result.token,
                    ]);
                    if (response.data.result.token) {
                        //console.log(["response.data.user", response.data]);
                        let token = response.data.result.token;

                        const config = {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Accept: 'application/json',
                        };

                        axios
                            .post(API_URL + '/details', {}, {headers: config})
                            .then((response: any) => {
                                if (response.data.result) {
                                    //navProps.setUserData(response2.data.result);

                                    console.log([
                                        'userData',
                                        response.data.result,
                                    ]);

                                    // const userDetails = response.data.result

                                    dispatch(
                                        setUserDetails({
                                            ...response.data.result,
                                            token: token,
                                        }),
                                    );

                                    // context.setUserData(response.data.result);
                                    // context.setUserLoggedIn(true);

                                    dispatch(
                                        setAlert(
                                            'success',
                                            'Poprawnie zalogowano',
                                        ),
                                    );

                                    NavigationService.navigate('Start', {});
                                }
                            })
                            .catch(error => {
                                console.log(['error', error]);
                                // context.setAlert(
                                //     true,
                                //     'danger',
                                //     lang.loginError['pl'],
                                // );

                                dispatch(
                                    setAlert('danger', lang.loginError['pl']),
                                );
                            });
                    } else {
                        //console.log("Nie ma tokena");
                    }
                })
                .catch(error => {
                    console.log(['error', error]);
                    // context.setAlert(true, 'danger', lang.loginError['pl']);
                    dispatch(setAlert('danger', lang.loginError['pl']));
                });
        } catch (e) {
            //console.log(e);
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

                        <InputComponent
                            placeholder={lang.password['pl']}
                            inputOnChange={(password: string) =>
                                setPassword(password)
                            }
                            value={password}
                            secureTextEntry={true}
                            maxLength={100}
                        />

                        <ButtonComponent
                            pressButtonComponent={loginUser}
                            buttonComponentText={lang.login['pl']}
                            fullWidth={false}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                        />

                        <ButtonComponent
                            pressButtonComponent={adminLoginUser}
                            buttonComponentText={'Admin login'}
                            fullWidth={false}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                        />

                        <View style={styles.subBtnSection}>
                            <Text style={styles.subBtnSectionAsk}>
                                {lang.notHaveAccount['pl']}
                            </Text>
                            <TouchableHighlight
                                onPress={() => navigation.navigate('Register')}
                                underlayColor={'#fff'}>
                                <Text style={styles.registerBtn}>
                                    {lang.register['pl']}
                                </Text>
                            </TouchableHighlight>
                        </View>

                        <Text
                            style={styles.resetPasswordBtn}
                            onPress={() =>
                                navigation.navigate('ResetPassword')
                            }>
                            {lang.resetPassword['pl']}
                        </Text>
                        <Text
                            style={styles.resetPasswordBtn}
                            onPress={() => navigation.navigate('Start')}>
                            {lang.skip['pl']}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </React.Fragment>
    );
};

interface Style {
    areaContainer: ViewStyle;
    container: ViewStyle;
    headerText: TextStyle;
    resetPasswordBtn: TextStyle;
    subBtnSection: ViewStyle;
    subBtnSectionAsk: TextStyle;
    registerBtn: TextStyle;
}

const styles = StyleSheet.create<Style>({
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
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
    resetPasswordBtn: {
        fontSize: 16,
        color: '#8c8c8c',
        paddingTop: 50,
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

export default Login;
