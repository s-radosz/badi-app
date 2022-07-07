import React from 'react';
import {Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native';
// import styles from "../../style";
const friendship: any = require('./../../../../assets/images/friendship.png');
const messageNotification: any = require('./../../../../assets/images/messageNotification.png');
const startConversation: any = require('./../../../../assets/images/startConversation.png');
const forumNotification: any = require('./../../../../assets/images/forumNotification.png');

import {productListSingleProductTextContainer} from './../../../../assets/global/globalStyles';

const SingleNotification = (props: any) => (
    <TouchableHighlight
        onPress={() =>
            props.notification.type === 'sended_message'
                ? props.navigation.navigate('ConversationDetails', {
                      conversationId: props.notification.open_details_id,
                      receiverId: props.notification.sender_id,
                  })
                : props.notification.type === 'started_conversation_user'
                ? props.navigation.navigate('ConversationDetails', {
                      conversationId: props.notification.open_details_id,
                      receiverId: props.notification.sender_id,
                  })
                : props.notification.type === 'friendship_invitation'
                ? props.navigation.navigate('UserDetails', {
                      userId: props.notification.sender_id,
                      showBtns: true,
                  })
                : props.notification.type === 'friendship_confirmation'
                ? props.navigation.navigate('UserDetails', {
                      userId: props.notification.sender_id,
                      showBtns: true,
                  })
                : props.notification.type === 'comment_for_your_forum_post'
                ? props.navigation.navigate('PostDetails', {
                      postId: props.notification.open_details_id,
                  })
                : null
        }
        underlayColor={'#fff'}>
        <View
            style={
                props.notification.status === 0
                    ? styles.singleNotificationContainerActive
                    : styles.singleNotificationContainer
            }>
            {props.notification.type === 'comment_for_your_forum_post' && (
                <Image style={styles.icon} source={forumNotification} />
            )}
            {props.notification.type === 'started_conversation_user' && (
                <Image style={styles.icon} source={startConversation} />
            )}
            {props.notification.type === 'sended_message' && (
                <Image style={styles.icon} source={messageNotification} />
            )}
            {props.notification.type === 'friendship_invitation' && (
                <Image style={styles.icon} source={friendship} />
            )}
            {props.notification.type === 'friendship_confirmation' && (
                <Image style={styles.icon} source={friendship} />
            )}

            <View style={styles.productListSingleProductTextContainer}>
                <View style={styles.productListSingleProductTextWrapper}>
                    <Text style={styles.productOnListTextCategory}>
                        {props.notification.message}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableHighlight>
);

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
