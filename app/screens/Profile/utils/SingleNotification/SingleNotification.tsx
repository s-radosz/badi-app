import React from 'react';
import {Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const friendship: any = require('./../../../../assets/images/friendship.png');
const messageNotification: any = require('./../../../../assets/images/messageNotification.png');
const startConversation: any = require('./../../../../assets/images/startConversation.png');
const forumNotification: any = require('./../../../../assets/images/forumNotification.png');

import {productListSingleProductTextContainer} from './../../../../assets/global/globalStyles';

interface SingleNotificationProps {
    navigation: any;
    notification: {
        type: string;
        status: number;
        message: string;
        open_details_id: number;
        sender_id: number;
    };
}

const SingleNotification = ({
    navigation,
    notification,
}: SingleNotificationProps) => {
    const userId = useSelector((state: any) => state?.User?.details?.id);

    return (
        <TouchableHighlight
            onPress={() =>
                notification.type === 'sended_message'
                    ? navigation.navigate('ConversationDetails', {
                          conversationId: notification.open_details_id,
                          receiverId: notification.sender_id,
                      })
                    : notification.type === 'started_conversation_user'
                    ? navigation.navigate('ConversationDetails', {
                          conversationId: notification.open_details_id,
                          receiverId: notification.sender_id,
                      })
                    : notification.type === 'friendship_invitation'
                    ? navigation?.navigate('Profile', {
                          foreignUserId:
                              userId !== notification.sender_id
                                  ? notification.sender_id
                                  : null,
                      })
                    : notification.type === 'friendship_confirmation'
                    ? navigation?.navigate('Profile', {
                          foreignUserId:
                              userId !== notification.sender_id
                                  ? notification.sender_id
                                  : null,
                      })
                    : notification.type === 'comment_for_your_forum_post'
                    ? navigation.navigate('PostDetails', {
                          postId: notification.open_details_id,
                      })
                    : null
            }
            underlayColor={'#fff'}>
            <View
                style={
                    notification.status === 0
                        ? styles.singleNotificationContainerActive
                        : styles.singleNotificationContainer
                }>
                {notification.type === 'comment_for_your_forum_post' && (
                    <Image style={styles.icon} source={forumNotification} />
                )}
                {notification.type === 'started_conversation_user' && (
                    <Image style={styles.icon} source={startConversation} />
                )}
                {notification.type === 'sended_message' && (
                    <Image style={styles.icon} source={messageNotification} />
                )}
                {notification.type === 'friendship_invitation' && (
                    <Image style={styles.icon} source={friendship} />
                )}
                {notification.type === 'friendship_confirmation' && (
                    <Image style={styles.icon} source={friendship} />
                )}

                <View style={styles.productListSingleProductTextContainer}>
                    <View style={styles.productListSingleProductTextWrapper}>
                        <Text style={styles.productOnListTextCategory}>
                            {notification.message}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
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
    singleNotificationContainer: {
        width: '100%',
        borderWidth: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 6,
        marginBottom: 10,
    },
    singleNotificationContainerActive: {
        width: '100%',
        borderWidth: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: '#ffeee0',
    },
    productListSingleProductTextContainer:
        productListSingleProductTextContainer,
    productListSingleProductTextWrapper: {
        paddingRight: 15,
    },
    productOnListTextCategory: {
        color: '#333',
        textAlign: 'left',
        fontSize: 12,
        //fontFamily: "Open Sans"
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default SingleNotification;
