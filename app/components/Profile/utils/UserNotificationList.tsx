import React, {Component, useEffect, useState} from 'react';
import SingleNotification from './SingleNotification/SingleNotification';
import axios from 'axios';
import {View, SafeAreaView, ScrollView, Image} from 'react-native';
import Alert from './../../Alert/Alert';
import BottomPanel from './../../SharedComponents/BottomPanel';
import PageHeader from './../../SharedComponents/PageHeader';
import styles from './../style';
import lang from './../../../assets/lang/Profile/utils/UserNotificationList';

import TopHeader from './../../Utils/TopHeader';

import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface UserNotificationListProps {
    navigation: any;
}

interface UserNotificationListState {
    userNotificationList: any;
}

interface IUserNotificationListProps {
    navigation: any;
}

const UserNotificationList = ({navigation}: IUserNotificationListProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);

    const [userNotificationList, setUserNotificationList] = useState([]);

    const getUserNotificationList = () => {
        let id = userData?.id;
        // this.context.setShowLoader(true);

        dispatch(setLoader(true));

        return new Promise((resolve, reject) => {
            axios
                .post(API_URL + '/loadNotificationByUserId', {
                    userId: id,
                })
                .then(async response => {
                    if (response.data.status === 'OK') {
                        setUserNotificationList(response.data.result);

                        dispatch(setLoader(false));

                        resolve(true);
                    }
                })
                .catch(async error => {
                    dispatch(
                        setAlert('danger', lang.notificationListError['pl']),
                    );

                    dispatch(setLoader(false));

                    reject(true);
                });

            axios.post(API_URL + '/clearNotificationByUserId', {
                userId: id,
            });
        });
    };

    useEffect(() => {
        if (userData) {
            getUserNotificationList();
            // await this.context.clearUserNotificationsStatus(
            //     this.context.userData.id,
            // );
        }
    }, []);

    return (
        <React.Fragment>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    data-test="ProfileContainer">
                    <React.Fragment>
                        <ScrollView>
                            <TopHeader
                                onClose={() => {}}
                                title={'Powiadomienia'}
                            />
                            <View style={{padding: 10}}>
                                {userNotificationList &&
                                    userNotificationList.map(
                                        (notification: any, i: number) => {
                                            return (
                                                <SingleNotification
                                                    notification={notification}
                                                    key={`SingleNotification-${i}`}
                                                    navigation={navigation}
                                                />
                                            );
                                        },
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

export default UserNotificationList;
