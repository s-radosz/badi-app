import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import lang from './../../lang/SharedComponents/ProfileHeader';
import {setUserDetails} from '../../../app/store/user/actions';
import {useDispatch, useSelector} from 'react-redux';

const logout: any = require('./../../assets/images/logout.png');
const bellWhite: any = require('./../../assets/images/bellWhite.png');
const message: any = require('./../../assets/images/messageWhite.png');

interface ProfileHeaderProps {
    showLogout: boolean;
    navigation: any;
    foreignUserData: any;
    handleStartConversation: any;
    avatar: string;
    name: string;
    locationString: string;
    age: number;
    countFriends: number;
}

const ProfileHeader = ({
    showLogout,
    navigation,
    foreignUserData,
    handleStartConversation,
    avatar,
    name,
    locationString,
    age,
    countFriends,
}: ProfileHeaderProps) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const handleLogout = () => {
        dispatch(setUserDetails(null));
        navigation.navigate('Welcome');
    };

    return (
        <React.Fragment>
            <View style={styles.topBtnContainer}>
                {showLogout && !foreignUserData ? (
                    <TouchableOpacity
                        style={styles.logoutContainer}
                        onPress={() =>
                            navigation.navigate('UserNotificationList', {})
                        }>
                        <View style={styles.imgContainer}>
                            <Image
                                source={bellWhite}
                                style={styles.logoutImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.logoutText}>
                                {lang.notifications[activeLanguage]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
                {showLogout && !foreignUserData ? (
                    <TouchableOpacity
                        style={styles.logoutContainer}
                        onPress={handleLogout}>
                        <View style={styles.imgContainer}>
                            <Image
                                source={logout}
                                style={styles.logoutImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.logoutText}>
                                {lang.loggedOut[activeLanguage]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}

                {foreignUserData ? (
                    <>
                        <TouchableOpacity
                            style={styles.logoutContainer}
                            onPress={() => {}}></TouchableOpacity>
                        <TouchableOpacity
                            style={styles.logoutContainer}
                            onPress={() => handleStartConversation()}>
                            <View style={styles.imgContainer}>
                                <Image
                                    source={message}
                                    style={styles.logoutImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.logoutText}>
                                    {lang.messageUser[activeLanguage]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>

            <View style={styles.profileHeaderContainer}>
                <Image
                    style={styles.profileHeaderImage}
                    source={{
                        uri: `${avatar}`,
                    }}
                />

                <Text style={styles.profileHeaderName}>{name}</Text>
                <Text style={styles.profileHeaderLocation}>
                    {locationString}
                </Text>
                <View style={styles.profileHeaderInfoContainer}>
                    <View style={styles.profileHeaderInfoWrapper}>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerMainText
                            }>
                            {age}
                        </Text>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerSubText
                            }>
                            {lang.yearsOld[activeLanguage]}
                        </Text>
                    </View>
                    <View style={styles.profileHeaderInfoWrapper}>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerMainText
                            }>
                            {countFriends}
                        </Text>
                        <Text
                            style={
                                styles.profileHeaderSingleInfoContainerSubText
                            }>
                            {lang.friends[activeLanguage]}
                        </Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    topBtnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        backgroundColor: '#ffd2ad',
        paddingTop: 20,
        paddingBottom: 10,
    },
    logoutContainer: {
        marginRight: 0,
        marginLeft: 0,
    },
    logoutImage: {
        height: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 10,
        marginTop: 5,
        //fontFamily: "Open Sans"
    },

    profileHeaderContainer: {
        backgroundColor: '#ffd2ad',
        paddingTop: 20,
        paddingBottom: 20,
    },
    profileHeaderImage: {
        width: 80,
        height: 80,
        marginBottom: 20,
        borderRadius: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    profileHeaderName: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
        //fontFamily: "Open Sans"
    },
    profileHeaderLocation: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 30,
        //fontFamily: "Open Sans"
    },
    profileHeaderInfoContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
    },
    profileHeaderSingleInfoContainerMainText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
        //fontFamily: "Open Sans"
    },
    profileHeaderSingleInfoContainerSubText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderInfoWrapper: {
        width: '50%',
    },
});

export default ProfileHeader;
