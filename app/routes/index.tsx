import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Welcome from '../screens/Welcome/Welcome';
import Login from './../screens/Auth/Login';
import Register from './../screens/Auth/Register';
import ResetPassword from './../screens/Auth/ResetPassword';
import ConfirmAccount from './../screens/Auth/ConfirmAccount';
import FillNecessaryInfo from './../screens/EditProfileInfo/EditProfileInfo';
//Messages
import Messages from './../screens/Messages/Messages';
import ConversationDetails from './../screens/Messages/utils/ConversationDetails';
//Profile
import Profile from './../screens/Profile/Profile';
import UserFriendsList from './../screens/Profile/utils/UserFriendsList';
// import UserAuctionsList from './../components/Profile/utils/UserAuctionsList';
import UserNotificationList from './../screens/Profile/utils/UserNotificationList';
import About from './../screens/Profile/utils/About';
import LoggedInUserDetails from './../screens/Profile/utils/LoggedInUserDetails';
//Feedback
import FeedbackModal from './../screens/FeedbackModal/FeedbackModal';
//Start
import Start from './../screens/Start/Start';
//AddEvent
import AddEvent from './../screens/AddEvent/AddEvent';
//@ts-ignore
import {fadeIn} from 'react-navigation-transitions';
import axios from 'axios';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../../app/store/alert/actions';
import {setUserDetails} from '../../app/store/user/actions';
import Alert from './../components/Alert/Alert';
import {getTranslations} from './../store/translations/actions';
import {getCategories} from './../store/categories/actions';
import {API_URL} from './../helpers/globalVariables';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Init = ({navigation}) => {
    const userData = useSelector((state: any) => state?.User);

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const [showLoader, setShowLoader] = useState(false);
    const [currentNavName, setCurrentNavName] = useState('USERS');
    // const [translations, setTranslations] = useState(null);

    // language: "en"
    const language = useSelector((state: any) => state?.translations?.language);

    const alertType = useSelector((state: any) => state?.alert);
    const alertText = useSelector((state: any) => state?.alert?.text);

    const dispatch = useDispatch();

    const handleSetLanguage = (language: string) => {
        //@ts-ignore
        setLanguage(language);
        setTimeout(() => {
            console.log(['language', language]);
        }, 2000);
    };

    const handleSetShowLoader = (param: boolean): any => {
        setShowLoader(param);
    };

    const setUserFilledInfo = async () => {
        //@ts-ignore
        let userEmailName = userData.email;

        let json = await axios
            .post(API_URL + '/setUserFilledInfo', {
                userEmail: userEmailName,
            })
            .then(async response => {
                if (response.data.status === 'OK') {
                    //@ts-ignore
                    await setUserData(response.data.result[0]);
                    checkUserStatus();
                }
            })
            .catch(error => {});

        return json;
    };

    const checkUserStatus = (): void => {
        console.log(['checkUserStatus', userData]);

        if (userData.verified === 1 && userData.user_filled_info === 1) {
            console.log(['user list redirect']);
            navigation.navigate('Welcome');
        } else if (userData.verified === 0) {
            navigation.navigate('ConfirmAccount');
        } else if (userData.verified === 1 && userData.user_filled_info === 0) {
            navigation.navigate('FillNecessaryInfo');
        }
    };

    const handleSetUserLoggedIn = (status: boolean) => {
        setUserLoggedIn(status);
    };

    const setAlert = (
        showAlert: boolean,
        alertType: string,
        alertMessage: string,
    ): any => {
        dispatch(setAlert(true, alertType, alertMessage));
    };

    const closeAlert = () => {
        dispatch(setAlert(false, null, null));
    };

    const clearUserData = (): void => {
        dispatch(setUserDetails(null));
    };

    useEffect(() => {
        dispatch(getTranslations());
        dispatch(getCategories());
        navigation.navigate('Welcome');
    }, []);

    const handleSetCurrentNavName = (name: string) => {
        setCurrentNavName(name);
    };

    return <></>;
};

// const AppContainer = createAppContainer(MainStack);
const Stack = createNativeStackNavigator();

interface AppState {
    showAlert: boolean;
    alertType: string;
    alertMessage: string;
    userData: any;
    userLoggedIn: boolean;
    API_URL: string;
    showLoader: boolean;
    currentNavName: string;
    language: string;
    // translations: Array<object>;
    translations: any;
}

const App = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Alert />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Init">
                    <Stack.Screen
                        name="Init"
                        component={Init}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Start"
                        component={Start}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ConfirmAccount}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="FillNecessaryInfo"
                        component={FillNecessaryInfo}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="AddEvent"
                        component={AddEvent}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Messages"
                        component={Messages}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ConversationDetails"
                        component={ConversationDetails}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="UserFriendsList"
                        component={UserFriendsList}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="UserNotificationList"
                        component={UserNotificationList}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="FeedbackModal"
                        component={FeedbackModal}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="About"
                        component={About}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="LoggedInUserDetails"
                        component={LoggedInUserDetails}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //color on top
        // backgroundColor: "#5e88fc"
        backgroundColor: '#fff',
    },
});

export default App;
