import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import BottomPanel from './../../../components/SharedComponents/BottomPanel';
import UserFriendsListRenderList from './UserFriendsListRenderList/UserFriendsListRenderList';
import lang from './../../../lang/Profile/utils/UserFriendsList';
import TopHeader from './../../../components/Utils/TopHeader';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';
import {
    singleButtonCol2Container,
    filterBtnActive,
    filterBtn,
} from './../../../assets/global/globalStyles';
import {returnTranslation} from './../../../helpers/globalMethods';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface IUserFriendsListProps {
    navigation: any;
}

const UserFriendsList = ({navigation}: IUserFriendsListProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const translations = useSelector(
        (state: any) => state?.Translations?.translations,
    );

    const [userFriendsList, setUserFriendsList] = useState([]);
    const [userPendingFriendsList, setUserPendingFriendsList] = useState([]);
    const [showUserFriendsList, setShowUserFriendsList] = useState(false);
    const [showPendingUserFriendsList, setShowPendingUserFriendsList] =
        useState(false);
    const [showUserNotificationList, setShowUserNotificationList] =
        useState(false);
    const [displayFriendList, setDisplayFriendList] = useState(true);

    const loadUserFriendsList = (): void => {
        let userId = userData?.id;
        // this.context.setShowLoader(true);
        dispatch(setLoader(true));

        if (userId) {
            axios
                .post(API_URL + '/friendsList', {
                    userId: userId,
                })
                .then(async response => {
                    if (response.data.status === 'OK') {
                        setUserFriendsList(response.data.result.friendsList);
                        setShowUserFriendsList(true);
                        setShowPendingUserFriendsList(false);
                        setShowUserNotificationList(false);
                        setDisplayFriendList(true);

                        dispatch(setLoader(false));
                    }
                })
                .catch(async error => {
                    dispatch(
                        setAlert(
                            'danger',
                            `${returnTranslation(
                                error?.response?.data?.msg
                                    ? error?.response?.data?.msg
                                    : lang.friendsListError[activeLanguage],
                                translations,
                                activeLanguage,
                            )}`,
                        ),
                    );

                    dispatch(setLoader(false));
                });
        }
    };

    const loadPendingUserFriendsList = (): void => {
        let userId = userData?.id;
        dispatch(setLoader(true));

        if (userId) {
            axios
                .post(API_URL + '/pendingFriendsList', {
                    userId: userId,
                })
                .then(async response => {
                    if (response.data.status === 'OK') {
                        setUserPendingFriendsList(
                            response.data.result.friendsList,
                        );
                        setShowPendingUserFriendsList(true);
                        setShowUserFriendsList(false);
                        setShowUserNotificationList(false);
                        setDisplayFriendList(false);

                        dispatch(setLoader(false));
                    }
                })
                .catch(async error => {
                    dispatch(
                        setAlert(
                            'danger',
                            `${returnTranslation(
                                error?.response?.data?.msg
                                    ? error?.response?.data?.msg
                                    : lang.friendsListError[activeLanguage],
                                translations,
                                activeLanguage,
                            )}`,
                        ),
                    );

                    dispatch(setLoader(false));
                });
        }
    };

    useEffect(() => {
        loadUserFriendsList();
    }, []);

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="ProfileContainer">
                    <React.Fragment>
                        <ScrollView>
                            <TopHeader
                                onClose={() => navigation.goBack()}
                                title={lang.myFriends[activeLanguage]}
                            />

                            <View>
                                <View style={styles.filterBtnContainer}>
                                    <View
                                        style={
                                            styles.singleButtonCol2Container
                                        }>
                                        <TouchableOpacity
                                            onPress={loadUserFriendsList}
                                            style={
                                                displayFriendList
                                                    ? styles.filterBtnActive
                                                    : styles.filterBtn
                                            }>
                                            <Text
                                                style={
                                                    displayFriendList
                                                        ? styles.filterBtnTextActive
                                                        : styles.filterBtnText
                                                }>
                                                {lang.friends[activeLanguage]}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={
                                            styles.singleButtonCol2Container
                                        }>
                                        <TouchableOpacity
                                            onPress={loadPendingUserFriendsList}
                                            style={
                                                !displayFriendList
                                                    ? styles.filterBtnActive
                                                    : styles.filterBtn
                                            }>
                                            <Text
                                                style={
                                                    !displayFriendList
                                                        ? styles.filterBtnTextActive
                                                        : styles.filterBtnText
                                                }>
                                                {lang.waiting[activeLanguage]}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.listContainer}>
                                {showUserFriendsList &&
                                    !showPendingUserFriendsList && (
                                        <UserFriendsListRenderList
                                            navigation={navigation}
                                            userFriendsList={userFriendsList}
                                        />
                                    )}
                                {!showUserFriendsList &&
                                    showPendingUserFriendsList && (
                                        <UserFriendsListRenderList
                                            navigation={navigation}
                                            userFriendsList={
                                                userPendingFriendsList
                                            }
                                        />
                                    )}
                            </View>
                        </ScrollView>
                        <BottomPanel
                            data-test="BottomPanel"
                            navigation={navigation}
                        />
                    </React.Fragment>
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listContainer: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    filterBtnContainer: {
        position: 'relative',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    singleButtonCol2Container: singleButtonCol2Container,
    filterBtnActive: filterBtnActive,
    filterBtn: filterBtn,
    filterBtnTextActive: {
        color: '#333',
        textAlign: 'center',
        paddingTop: 7,
        //fontFamily: "Open Sans"
    },
    filterBtnText: {
        color: '#9F9F9F',
        textAlign: 'center',
        paddingTop: 7,
        //fontFamily: "Open Sans"
    },
});

export default UserFriendsList;
