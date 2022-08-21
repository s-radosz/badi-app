import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import lang from './../../lang/SharedComponents/BottomPanel';
import {useSelector} from 'react-redux';
import {
    customOrangeColor,
    darkGrayColor,
} from './../../assets/global/globalStyles';

const network: any = require('./../../assets/images/network.png');
const sell: any = require('./../../assets/images/sell.png');
const message: any = require('./../../assets/images/message.png');
const forum: any = require('./../../assets/images/forum.png');
const profile: any = require('./../../assets/images/profile.png');
const dot: any = require('./../../assets/images/dot.png');
const feedback: any = require('./../../assets/images/feedback.png');

interface IBottomPanelProps {
    navigation: any;
    showFeedbackBtn?: boolean;
}

const BottomPanel = ({navigation, showFeedbackBtn}: IBottomPanelProps) => {
    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <React.Fragment>
            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    onPress={() =>
                        userData
                            ? navigation.navigate('Start')
                            : navigation.navigate('Register')
                    }>
                    <View style={styles.bottomPanelImage}>
                        <Image
                            style={styles.buttonImage}
                            source={network}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.buttonText}>
                        {lang.start[activeLanguage]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        userData
                            ? navigation.navigate('Messages')
                            : navigation.navigate('Register')
                    }>
                    <View style={styles.bottomPanelImage}>
                        <Image
                            style={styles.buttonImage}
                            source={message}
                            resizeMode="contain"
                        />
                    </View>
                    {userData &&
                        //@ts-ignore
                        userData.unreadedConversationMessage &&
                        //@ts-ignore
                        userData.unreadedConversationMessageAmount && (
                            <TouchableOpacity
                                style={
                                    styles.unreadedMessagesNotificationContainer
                                }>
                                <Image
                                    source={dot}
                                    style={
                                        styles.unreadedMessagesNotificationDot
                                    }
                                />

                                {userData ? (
                                    //@ts-ignore
                                    // context.userData
                                    //     .unreadedConversationMessageAmount < 10
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationDotText
                                        }>
                                        {userData &&
                                            //@ts-ignore
                                            userData.unreadedConversationMessageAmount}
                                    </Text>
                                ) : (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationLongDotText
                                        }>
                                        {userData &&
                                            //@ts-ignore
                                            userData.unreadedConversationMessageAmount}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                    <Text style={styles.buttonText}>
                        {lang.messages[activeLanguage]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        userData
                            ? navigation.navigate('AddEvent')
                            : navigation.navigate('Register')
                    }>
                    <View style={styles.bottomPanelImage}>
                        <Image
                            style={styles.buttonImage}
                            source={sell}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.buttonText}>
                        {lang.addNewEvent[activeLanguage]}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        userData
                            ? navigation.navigate('UserNotificationList')
                            : navigation.navigate('Register')
                    }>
                    <View
                        style={
                            styles.bottomPanelImage
                            // context.currentNavName === lang.notifications['pl']
                            //     ? styles.bottomPanelImageActive
                            //     : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={forum}
                            resizeMode="contain"
                        />
                    </View>
                    <Text
                        style={
                            styles.buttonText
                            // context.currentNavName === lang.notifications['pl']
                            //     ? styles.buttonTextActive
                            //     : styles.buttonText
                        }>
                        {lang.notifications[activeLanguage]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        userData
                            ? navigation.navigate('Profile')
                            : navigation.navigate('Register')
                    }>
                    <View
                        style={
                            styles.bottomPanelImage
                            // context.currentNavName === lang.profile['pl']
                            //     ? styles.bottomPanelImageActive
                            //     : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={profile}
                            resizeMode="contain"
                        />
                    </View>
                    {userData &&
                        //@ts-ignore
                        userData.unreadedNotifications &&
                        //@ts-ignore
                        userData.unreadedNotificationsAmount && (
                            <TouchableOpacity
                                style={
                                    styles.unreadedMessagesNotificationContainer
                                }>
                                <Image
                                    source={dot}
                                    style={
                                        styles.unreadedMessagesNotificationDot
                                    }
                                />
                                {userData &&
                                //@ts-ignore
                                userData.unreadedNotificationsAmount < 10 ? (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationDotText
                                        }>
                                        {userData &&
                                            //@ts-ignore
                                            userData.unreadedNotificationsAmount}
                                    </Text>
                                ) : (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationLongDotText
                                        }>
                                        {userData &&
                                            //@ts-ignore
                                            userData.unreadedNotificationsAmount}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                    <Text
                        style={
                            styles.buttonText
                            // context.currentNavName === lang.profile['pl']
                            //     ? styles.buttonTextActive
                            //     : styles.buttonText
                        }>
                        {lang.profile[activeLanguage]}
                    </Text>
                </TouchableOpacity>
            </View>

            {userData && showFeedbackBtn ? (
                <TouchableOpacity
                    style={styles.feedbackBtn}
                    onPress={() => navigation.navigate('FeedbackModal')}
                    data-test="feedbackIcon">
                    <Image source={feedback} style={styles.feedbackImg} />
                </TouchableOpacity>
            ) : null}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    bottomPanel: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 2,
        borderTopColor: '#8c8c8c',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
    },
    bottomPanelImageActive: {
        opacity: 1,
    },
    bottomPanelImage: {
        opacity: 0.7,
    },
    buttonImage: {
        height: 25,
        marginBottom: 5,
    },
    buttonTextActive: {
        fontSize: 10,
        textAlign: 'center',
        color: customOrangeColor,
        fontWeight: '600',
        //fontFamily: "Open Sans"
    },
    buttonText: {
        fontSize: 10,
        color: '#424242',
        textAlign: 'center',
        fontWeight: '600',
        //fontFamily: "Open Sans"
    },
    unreadedMessagesNotificationContainer: {
        position: 'absolute',
        right: 0,
        top: -10,
    },
    unreadedMessagesNotificationDot: {width: 20, height: 20},
    unreadedMessagesNotificationDotText: {
        position: 'absolute',
        color: darkGrayColor,
        fontSize: 14,
        fontWeight: '600',
        left: 6,
        top: 0,
        //fontFamily: "Open Sans"
    },
    unreadedMessagesNotificationLongDotText: {
        position: 'absolute',
        color: darkGrayColor,
        left: 5,
        fontSize: 10,
        top: 5,
    },
    feedbackBtn: {
        position: 'absolute',
        right: 10,
        bottom: 75,
        zIndex: 1,
    },
    feedbackImg: {
        width: 50,
        height: 50,
    },
});

export default BottomPanel;
