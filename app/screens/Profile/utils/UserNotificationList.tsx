import React, {useEffect, useState} from 'react';
import SingleNotification from './SingleNotification/SingleNotification';
import axios from 'axios';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import BottomPanel from './../../../components/SharedComponents/BottomPanel';
import lang from './../../../lang/Profile/utils/UserNotificationList';
import TopHeader from './../../../components/Utils/TopHeader';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';

const loaderImage: any = require('./../../../assets/images/loader.gif');

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
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="ProfileContainer">
                    <React.Fragment>
                        <ScrollView>
                            <TopHeader
                                onClose={() => {}}
                                title={'Powiadomienia'}
                            />
                            <View style={styles.notificationsListContainer}>
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
    notificationsListContainer: {
        padding: 10,
    },
});

export default UserNotificationList;
