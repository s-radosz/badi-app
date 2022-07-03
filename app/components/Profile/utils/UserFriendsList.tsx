import React, {Component, useEffect, useState} from 'react';
import {GlobalContext} from './../../../Context/GlobalContext';
import axios from 'axios';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import Alert from './../../Alert/Alert';
import BottomPanel from './../../SharedComponents/BottomPanel';
import PageHeader from './../../SharedComponents/PageHeader';
import UserFriendsListRenderList from './UserFriendsListRenderList/UserFriendsListRenderList';
import styles from './../style';
import lang from './../../../assets/lang/Profile/utils/UserFriendsList';

import TopHeader from './../../Utils/TopHeader';

import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface IUserFriendsListProps {
    navigation: any;
}

const UserFriendsList = ({navigation}: IUserFriendsListProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);

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
                    dispatch(setAlert('danger', lang.friendsListError['pl']));

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
                    dispatch(setAlert('danger', lang.friendsListError['pl']));

                    dispatch(setLoader(false));
                });
        }
    };

    useEffect(() => {
        loadUserFriendsList();
    }, []);

    return (
        <React.Fragment>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                {/* {this.context.showAlert && (
                    <Alert
                        alertType={this.context.alertType}
                        alertMessage={this.context.alertMessage}
                        closeAlert={this.context.closeAlert}
                    />
                )} */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    data-test="ProfileContainer">
                    {/* {this.context.showLoader ? (
                        <View
                            style={styles.loaderContainer}
                            data-test="loader">
                            <Image
                                style={{width: 100, height: 100}}
                                source={loaderImage}
                            />
                        </View>
                    ) : ( */}
                    <React.Fragment>
                        <ScrollView>
                            {/* <PageHeader
                                    boldText={lang.myFriends['pl']}
                                    normalText={''}
                                    closeMethod={() =>
                                        this.props.navigation.goBack(null)
                                    }
                                    closeMethodParameter={''}
                                /> */}

                            <TopHeader
                                onClose={() => {}}
                                title={lang.myFriends['pl']}
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
                                                {lang.friends['pl']}
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
                                                {lang.waiting['pl']}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}>
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
                    {/* )} */}
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

export default UserFriendsList;
