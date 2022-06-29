import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Welcome from '../components/Welcome/Welcome';
import Login from './../components/Auth/Login';
import Register from './../components/Auth/Register';
import ResetPassword from './../components/Auth/ResetPassword';
import ConfirmAccount from './../components/Auth/ConfirmAccount';
import FillNecessaryInfo from './../components/EditProfileInfo/EditProfileInfo';
//Users
import Users from './../components/Users/Users';
import UserDetails from './../components/Users/utils/UserDetails';
import UserMessageBox from './../components/Users/utils/UserMessageBox';
//Auctions
import Auctions from './../components/Auctions/Auctions';
import ProductDetails from './../components/Auctions/utils/ProductDetails';
import AddNewProductBox from './../components/Auctions/utils/AddNewProductBox';
import ProductMessageBox from './../components/Auctions/utils/ProductMessageBox';
//Messages
import Messages from './../components/Messages/Messages';
import ConversationDetails from './../components/Messages/utils/ConversationDetails';
//Forum
import Forum from './../components/Forum/Forum';
import SavePost from './../components/Forum/utils/SavePost';
import PostDetails from './../components/Forum/utils/PostDetails';
//Profile
import Profile from './../components/Profile/Profile';
import UserFriendsList from './../components/Profile/utils/UserFriendsList';
import UserAuctionsList from './../components/Profile/utils/UserAuctionsList';
import UserNotificationList from './../components/Profile/utils/UserNotificationList';
import About from './../components/Profile/utils/About';
import LoggedInUserDetails from './../components/Profile/utils/LoggedInUserDetails';
//Feedback
import FeedbackModal from './../components/FeedbackModal/FeedbackModal';

//Start
import Start from './../components/Start/Start';

//@ts-ignore
import {fadeIn} from 'react-navigation-transitions';
import {GlobalContext} from './../Context/GlobalContext';
import axios from 'axios';
import NavigationService from './NavigationService';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../../app/store/alert/actions';

import Alert from './../components/Alert/Alert';

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
        UserList: {
            screen: Users,
            navigationOptions: {
                header: null,
            },
        },
        UserDetails: {
            screen: UserDetails,
            navigationOptions: {
                header: null,
            },
        },
        UserMessageBox: {
            screen: UserMessageBox,
            navigationOptions: {
                header: null,
            },
        },
        Auctions: {
            screen: Auctions,
            navigationOptions: {
                header: null,
            },
        },
        ProductDetails: {
            screen: ProductDetails,
            navigationOptions: {
                header: null,
            },
        },
        AddNewProduct: {
            screen: AddNewProductBox,
            navigationOptions: {
                header: null,
            },
        },
        ProductMessageBox: {
            screen: ProductMessageBox,
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
        Forum: {
            screen: Forum,
            navigationOptions: {
                header: null,
            },
        },
        AddNewPost: {
            screen: SavePost,
            navigationOptions: {
                header: null,
            },
        },
        PostDetails: {
            screen: PostDetails,
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
        UserAuctionsList: {
            screen: UserAuctionsList,
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
    // const [showAlert, setShowAlert] = useState(false);
    // const [alertMessage, setAlertMessage] = useState('');
    // const [alertType, setAlertType] = useState('');
    const [userData, setUserData] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [API_URL, setAPI_URL] = useState('http://127.0.0.1:8080');

    //API_URL: "http://10.0.2.2:8000/",
    //API_URL: "https://e-mamy.pl/",

    const [showLoader, setShowLoader] = useState(false);
    const [currentNavName, setCurrentNavName] = useState('USERS');
    const [translations, setTranslations] = useState(null);

    // language: "en"
    const [language, setLanguage] = useState('pl');

    const alertType = useSelector((state: any) => state?.alert);
    const alertText = useSelector((state: any) => state?.alert?.text);

    // const alertType = '';
    // const alertText = '';

    const dispatch = useDispatch();

    const getTranslations = () => {
        return new Promise(resolve => {
            axios
                .get(API_URL + '/api/get-translations')
                .then(async response => {
                    console.log([
                        'response',
                        response.data.result.translations,
                    ]);

                    if (response.data.status === 'OK') {
                        let translations = {};

                        response.data.result.translations.map(
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
                                translations = Object.assign(
                                    translations,
                                    single,
                                );
                            },
                        );

                        setTranslations(translations);

                        // this.setState({translations: translations});
                    }

                    resolve(response);
                })
                .catch(error => {
                    //console.log(["setUserFilledInfoErr1", error]);
                });
        });
    };

    const handleSetLanguage = (language: string) => {
        //@ts-ignore
        setLanguage(language);
        // this.setState({language});
        setTimeout(() => {
            console.log(['language', language]);
        }, 2000);
    };

    const handleSetShowLoader = (param: boolean): any => {
        setShowLoader(param);
        // this.setState({
        //     showLoader: param,
        // });
    };

    const setUserFilledInfo = async () => {
        //@ts-ignore
        let userEmailName = userData.email;

        let json = await axios
            .post(API_URL + '/api/setUserFilledInfo', {
                userEmail: userEmailName,
            })
            .then(async response => {
                if (response.data.status === 'OK') {
                    //@ts-ignore
                    await setUserData(response.data.result[0]);
                    // this.setState({
                    //     userData: response.data.result[0],
                    //     //editProfileData: false
                    // });
                    checkUserStatus();
                }
            })
            .catch(error => {
                //console.log(["setUserFilledInfoErr1", error]);
            });

        return json;
    };

    const clearUserNotificationsStatus = async (userId: number) => {
        axios
            .post(API_URL + '/api/clearUserNotificationsStatus', {
                userId: userId,
            })
            .then(async response => {
                if (response.data.status === 'OK') {
                    let newUserState = userData;
                    newUserState.unreadedNotifications = false;
                    newUserState.unreadedNotificationsAmount = 0;
                    setUserData(newUserState);
                    // await this.setState({userData: newUserState});
                }
            })
            .catch(error => {
                //console.log(error);
            });
    };

    const clearUserUnreadedMessages = async (
        userId: number,
        conversationId: number,
    ) => {
        try {
            axios
                .post(API_URL + '/api/setUserMessagesStatus', {
                    userId: userId,
                    conversationId: conversationId,
                })
                .then(async response => {
                    if (response.data.status === 'OK') {
                        let newUserState = userData;
                        newUserState.unreadedConversationMessage =
                            response.data.result.userUnreadedMessages;
                        newUserState.unreadedConversationMessageAmount =
                            response.data.result.userUnreadedMessagesCount;
                        setUserData(newUserState);

                        //that.checkUserStatus();
                    }
                })
                .catch(error => {
                    //console.log(error);
                });
        } catch (error) {
            //console.log(error);
        }

        //console.log(this.state.userData);
    };

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
        // this.setState({userLoggedIn: status});
    };

    const handleSetUserData = (data: any) => {
        console.log(['data', data]);
        if (data) {
            const userData = {
                age: data.age,
                conversations: data.conversations,
                description: data.description,
                email: data.email,
                hobbies: data.hobbies,
                id: data.id,
                kids: data.kids,
                lattitude: data.lattitude,
                longitude: data.longitude,
                location_string: data.location_string,
                name: data.name,
                notifications: data.notifications,
                photo_path: data.photo_path,
                unreadedConversationMessage: data.unreadedConversationMessage,
                unreadedConversationMessageAmount:
                    data.unreadedConversationMessageAmount,
                unreadedNotifications: data.unreadedNotifications,
                unreadedNotificationsAmount: data.unreadedNotificationsAmount,
                user_filled_info: data.user_filled_info,
                verified: data.verified,
                votes: data.votes,
                platform: data.platform,
                nickname: data.nickname,
            };
            setUserData(userData);
            // this.setState({userData: userData});

            checkUserStatus();
        } else {
            setUserData([]);
            // this.setState({userData: []});
        }
    };

    const setAlert = (
        showAlert: boolean,
        alertType: string,
        alertMessage: string,
    ): any => {
        console.log(['setAlert']);
        dispatch(setAlert(true, alertType, alertMessage));
        // this.setState({
        //     showAlert: showAlert,
        //     alertType: alertType,
        //     alertMessage: alertMessage,
        // });
    };

    const closeAlert = () => {
        console.log('closeAlert');
        dispatch(setAlert(false, null, null));
        // this.setState({
        //     showAlert: false,
        //     alertType: '',
        //     alertMessage: '',
        // });
    };

    const clearUserData = (): void => {
        setUserData([]);
        // this.setState({userData: []});
    };

    // componentDidMount = async () => {
    //     await this.getTranslations();
    //     NavigationService.navigate('Welcome', {});
    // };

    useEffect(() => {
        getTranslations();
        NavigationService.navigate('Welcome', {});
    }, []);

    const handleSetCurrentNavName = (name: string) => {
        setCurrentNavName(name);
        // this.setState({currentNavName: name});
    };

    return (
        <GlobalContext.Provider
            value={{
                showAlert: false,
                alertType: alertType,
                alertMessage: '',
                setAlert: setAlert,
                userData: userData,
                setUserData: handleSetUserData,
                clearUserData: clearUserData,
                setUserFilledInfo: setUserFilledInfo,
                API_URL: API_URL,
                clearUserUnreadedMessages: clearUserUnreadedMessages,
                clearUserNotificationsStatus: clearUserNotificationsStatus,
                showLoader: showLoader,
                setShowLoader: handleSetShowLoader,
                closeAlert: closeAlert,
                //@ts-ignore
                NavigationService: NavigationService,
                currentNavName: currentNavName,
                setCurrentNavName: handleSetCurrentNavName,
                translations: translations,
                language: language,
                setLanguage: handleSetLanguage,

                setUserLoggedIn: handleSetUserLoggedIn,
                userLoggedIn: userLoggedIn,
            }}>
            <SafeAreaView
                style={{
                    flex: 1,
                    //color on top
                    // backgroundColor: "#5e88fc"
                    backgroundColor: '#fff',
                }}>
                <Alert />

                {/*<StatusBar backgroundColor="#f4a157" barStyle="light-content" />*/}
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
        </GlobalContext.Provider>
    );
};

export default App;
