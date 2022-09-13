import React, {useEffect, useState} from 'react';
import SingleNotification from './SingleNotification/SingleNotification';
import axios from 'axios';
import {View, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import BottomPanel from './../../../components/SharedComponents/BottomPanel';
import lang from './../../../lang/Profile/utils/UserNotificationList';
import TopHeader from './../../../components/Utils/TopHeader';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';
import {returnTranslation} from './../../../helpers/globalMethods';
import {FlatList} from 'react-native-gesture-handler';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface IUserNotificationListProps {
    navigation: any;
}

const UserNotificationList = ({navigation}: IUserNotificationListProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const translations = useSelector(
        (state: any) => state?.Translations?.translations,
    );

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
                        setAlert(
                            'danger',
                            `${returnTranslation(
                                error?.response?.data?.msg
                                    ? error?.response?.data?.msg
                                    : lang.notificationListError[
                                          activeLanguage
                                      ],
                                translations,
                                activeLanguage,
                            )}`,
                        ),
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

    const renderItem = ({item}) => {
        return (
            <SingleNotification notification={item} navigation={navigation} />
        );
    };

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="ProfileContainer">
                    <React.Fragment>
                        <ScrollView>
                            <TopHeader
                                onClose={() => navigation.goBack()}
                                title={lang.notificationTitle[activeLanguage]}
                            />
                            <View style={styles.notificationsListContainer}>
                                <FlatList
                                    data={userNotificationList}
                                    renderItem={renderItem}
                                    keyExtractor={item => item?.id}
                                />
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
