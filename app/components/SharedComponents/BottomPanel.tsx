import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './style';
import lang from './../../assets/lang/SharedComponents/BottomPanel';
import {GlobalContext} from './../../Context/GlobalContext';

const network: any = require('./../../assets/images/network.png');
const sell: any = require('./../../assets/images/sell.png');
const message: any = require('./../../assets/images/message.png');
const forum: any = require('./../../assets/images/forum.png');
const profile: any = require('./../../assets/images/profile.png');
const dot: any = require('./../../assets/images/dot.png');
const feedback: any = require('./../../assets/images/feedback.png');

const BottomPanel = (props: any) => {
    const context = useContext(GlobalContext);
    return (
        <React.Fragment>
            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    onPress={() =>
                        context.userLoggedIn
                            ? context.NavigationService.navigate('Start', {})
                            : context.NavigationService.navigate('Register', {})
                    }>
                    <View
                        style={
                            context.currentNavName === lang.start['en']
                                ? styles.bottomPanelImageActive
                                : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={network}
                            resizeMode="contain"
                        />
                    </View>
                    <Text
                        style={
                            context.currentNavName === lang.start['en']
                                ? styles.buttonTextActive
                                : styles.buttonText
                        }>
                        {lang.start['en']}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        context.userLoggedIn
                            ? context.NavigationService.navigate('Messages', {})
                            : context.NavigationService.navigate('Register', {})
                    }>
                    <View
                        style={
                            context.currentNavName === lang.messages['en']
                                ? styles.bottomPanelImageActive
                                : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={message}
                            resizeMode="contain"
                        />
                    </View>
                    {context.userData &&
                        //@ts-ignore
                        context.userData.unreadedConversationMessage &&
                        //@ts-ignore
                        context.userData.unreadedConversationMessageAmount && (
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

                                {context.userData &&
                                //@ts-ignore
                                context.userData
                                    .unreadedConversationMessageAmount < 10 ? (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationDotText
                                        }>
                                        {context.userData &&
                                            //@ts-ignore
                                            context.userData
                                                .unreadedConversationMessageAmount}
                                    </Text>
                                ) : (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationLongDotText
                                        }>
                                        {context.userData &&
                                            //@ts-ignore
                                            context.userData
                                                .unreadedConversationMessageAmount}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                    <Text
                        style={
                            context.currentNavName === lang.messages['en']
                                ? styles.buttonTextActive
                                : styles.buttonText
                        }>
                        {lang.messages['en']}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        context.userLoggedIn
                            ? context.NavigationService.navigate('Auctions', {})
                            : context.NavigationService.navigate('Register', {})
                    }>
                    <View
                        style={
                            context.currentNavName === lang.addNewEvent['en']
                                ? styles.bottomPanelImageActive
                                : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={sell}
                            resizeMode="contain"
                        />
                    </View>
                    <Text
                        style={
                            context.currentNavName === lang.addNewEvent['en']
                                ? styles.buttonTextActive
                                : styles.buttonText
                        }>
                        {lang.addNewEvent['en']}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        context.userLoggedIn
                            ? context.NavigationService.navigate(
                                  'UserNotificationList',
                                  {},
                              )
                            : context.NavigationService.navigate('Register', {})
                    }>
                    <View
                        style={
                            context.currentNavName === lang.notifications['en']
                                ? styles.bottomPanelImageActive
                                : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={forum}
                            resizeMode="contain"
                        />
                    </View>
                    <Text
                        style={
                            context.currentNavName === lang.notifications['en']
                                ? styles.buttonTextActive
                                : styles.buttonText
                        }>
                        {lang.notifications['en']}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        context.userLoggedIn
                            ? context.NavigationService.navigate('Profile', {})
                            : context.NavigationService.navigate('Register', {})
                    }>
                    <View
                        style={
                            context.currentNavName === lang.profile['en']
                                ? styles.bottomPanelImageActive
                                : styles.bottomPanelImage
                        }>
                        <Image
                            style={styles.buttonImage}
                            source={profile}
                            resizeMode="contain"
                        />
                    </View>
                    {context.userData &&
                        //@ts-ignore
                        context.userData.unreadedNotifications &&
                        //@ts-ignore
                        context.userData.unreadedNotificationsAmount && (
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
                                {context.userData &&
                                //@ts-ignore
                                context.userData.unreadedNotificationsAmount <
                                    10 ? (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationDotText
                                        }>
                                        {context.userData &&
                                            //@ts-ignore
                                            context.userData
                                                .unreadedNotificationsAmount}
                                    </Text>
                                ) : (
                                    <Text
                                        style={
                                            styles.unreadedMessagesNotificationLongDotText
                                        }>
                                        {context.userData &&
                                            //@ts-ignore
                                            context.userData
                                                .unreadedNotificationsAmount}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        )}
                    <Text
                        style={
                            context.currentNavName === lang.profile['en']
                                ? styles.buttonTextActive
                                : styles.buttonText
                        }>
                        {lang.profile['en']}
                    </Text>
                </TouchableOpacity>
            </View>

            {context.userLoggedIn ? (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 75,
                        zIndex: 1,
                    }}
                    onPress={() =>
                        context.NavigationService.navigate('FeedbackModal', {})
                    }
                    data-test="feedbackIcon">
                    <Image source={feedback} style={{width: 50, height: 50}} />
                </TouchableOpacity>
            ) : null}
        </React.Fragment>
    );
};

export default BottomPanel;
