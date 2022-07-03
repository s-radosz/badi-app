import React, {useContext} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import lang from './../../assets/lang/SharedComponents/ProfileHeader';
import styles from './style';
// import {GlobalContext} from './../../Context/GlobalContext';

import {setUserDetails} from '../../../app/store/user/actions';
import {useDispatch, useSelector} from 'react-redux';

const logout: any = require('./../../assets/images/logout.png');
const bellWhite: any = require('./../../assets/images/bellWhite.png');

const ProfileHeader = (props: any) => {
    const dispatch = useDispatch();
    // const context = useContext(GlobalContext);

    const handleLogout = () => {
        // context.setUserData(null);
        // context.setUserLoggedIn(false);
        dispatch(setUserDetails(null));
        props.navigation.navigate('Welcome');
    };

    return (
        <React.Fragment>
            <View style={styles.topBtnContainer}>
                {props.showLogout ? (
                    <TouchableOpacity
                        style={styles.logoutContainer}
                        onPress={() =>
                            props.navigation.navigate(
                                'UserNotificationList',
                                {},
                            )
                        }>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={bellWhite}
                                style={styles.logoutImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.logoutText}>
                                {lang.notifications['pl']}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
                {props.showLogout ? (
                    <TouchableOpacity
                        style={styles.logoutContainer}
                        onPress={handleLogout}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={logout}
                                style={styles.logoutImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.logoutText}>
                                {lang.loggedOut['pl']}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
            </View>

            <View style={styles.profileHeaderContainer}>
                <Image
                    style={styles.profileHeaderImage}
                    source={{
                        uri: `${props.avatar}`,
                    }}
                />

                <Text style={styles.profileHeaderName}>{props.name}</Text>
                <Text style={styles.profileHeaderLocation}>
                    {props.locationString}
                </Text>
                <View style={styles.profileHeaderInfoContainer}>
                    <View style={{width: '50%'}}>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerMainText
                            }>
                            {props.age}
                        </Text>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerSubText
                            }>
                            {lang.yearsOld['pl']}
                        </Text>
                    </View>
                    <View style={{width: '50%'}}>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerMainText
                            }>
                            {props.countFriends}
                        </Text>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerSubText
                            }>
                            {lang.friends['pl']}
                        </Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    );
};

export default ProfileHeader;
