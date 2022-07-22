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
//@ts-ignore
import {fadeIn} from 'react-navigation-transitions';
import axios from 'axios';
import NavigationService from './NavigationService';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../../app/store/alert/actions';
import {setUserDetails} from '../../app/store/user/actions';
import Alert from './../components/Alert/Alert';
import {getTranslations} from './../store/translations/actions';
import {getCategories} from './../store/categories/actions';
import {API_URL} from './../helpers/globalVariables';

const MainStack = createSwitchNavigator(
    {
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                header: null,
                gesturesEnabled: false,
            },
        },
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            },
        },
        Register: {
            screen: Register,
            navigationOptions: {
                header: null,
            },
        },
        ResetPassword: {
            screen: ResetPassword,
            navigationOptions: {
                header: null,
            },
        },
        ConfirmAccount: {
            screen: ConfirmAccount,
            navigationOptions: {
                header: null,
            },
        },
        FillNecessaryInfo: {
            screen: FillNecessaryInfo,
            navigationOptions: {
                header: null,
            },
        },
        Start: {
            screen: Start,
            navigationOptions: {
                header: null,
            },
        },
        Messages: {
            screen: Messages,
            navigationOptions: {
                header: null,
            },
        },
        ConversationDetails: {
            screen: ConversationDetails,
            navigationOptions: {
                header: null,
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                header: null,
            },
        },
        UserFriendsList: {
            screen: UserFriendsList,
            navigationOptions: {
                header: null,
            },
        },
        UserNotificationList: {
            screen: UserNotificationList,
            navigationOptions: {
                header: null,
            },
        },
        FeedbackModal: {
            screen: FeedbackModal,
            navigationOptions: {
                header: null,
            },
        },
        About: {
            screen: About,
            navigationOptions: {
                header: null,
            },
        },
        LoggedInUserDetails: {
            screen: LoggedInUserDetails,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'Welcome',
        // transitionConfig: () => fadeIn(),
        // headerMode: "none"
    },
);

const AppContainer = createAppContainer(MainStack);

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
interface NavigationScreenInterface {
    navigation: {
        navigate: any;
        getParam: any;
        state: any;
        setParams: any;
    };
}

const App = ({navigation}: NavigationScreenInterface) => {
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

    // const clearUserNotificationsStatus = async (userId: number) => {
    //     axios
    //         .post(API_URL + '/clearUserNotificationsStatus', {
    //             userId: userId,
    //         })
    //         .then(async response => {
    //             if (response.data.status === 'OK') {
    //                 let newUserState = userData;
    //                 newUserState.unreadedNotifications = false;
    //                 newUserState.unreadedNotificationsAmount = 0;
    //                 setUserData(newUserState);
    //                 // await this.setState({userData: newUserState});
    //             }
    //         })
    //         .catch(error => {
    //             //console.log(error);
    //         });
    // };

    // const clearUserUnreadedMessages = async (
    //     userId: number,
    //     conversationId: number,
    // ) => {
    //     try {
    //         axios
    //             .post(API_URL + '/setUserMessagesStatus', {
    //                 userId: userId,
    //                 conversationId: conversationId,
    //             })
    //             .then(async response => {
    //                 if (response.data.status === 'OK') {
    //                     let newUserState = userData;
    //                     newUserState.unreadedConversationMessage =
    //                         response.data.result.userUnreadedMessages;
    //                     newUserState.unreadedConversationMessageAmount =
    //                         response.data.result.userUnreadedMessagesCount;
    //                     setUserData(newUserState);

    //                     //that.checkUserStatus();
    //                 }
    //             })
    //             .catch(error => {
    //                 //console.log(error);
    //             });
    //     } catch (error) {
    //         //console.log(error);
    //     }

    //     //console.log(this.state.userData);
    // };

    const checkUserStatus = (): void => {
        console.log(['checkUserStatus', userData]);

        if (userData.verified === 1 && userData.user_filled_info === 1) {
            console.log(['user list redirect']);
            NavigationService.navigate('Start', {});
        } else if (userData.verified === 0) {
            NavigationService.navigate('ConfirmAccount', {});
        } else if (userData.verified === 1 && userData.user_filled_info === 0) {
            NavigationService.navigate('FillNecessaryInfo', {});
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
        NavigationService.navigate('Welcome', {});
    }, []);

    const handleSetCurrentNavName = (name: string) => {
        setCurrentNavName(name);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Alert />
            <AppContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
                //@ts-ignore
                alertType={alertType}
                alertMessage={''}
                closeAlert={closeAlert}
                showAlert={false}
            />
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
