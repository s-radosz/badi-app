import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    StyleSheet,
} from 'react-native';
import moment from 'moment';
import {customOrangeColor} from './../../../assets/global/globalStyles';

const SingleConversationBox = (props: {
    conversation: any;
    openConversationDetails: any;
    API_URL: string;
}): any => {
    const lastMessageDate = moment(
        props.conversation.messages[props.conversation.messages.length - 1]
            .updated_at,
    ).format('LLL');
    return (
        <TouchableHighlight
            onPress={(): void => {
                props.openConversationDetails(
                    props.conversation.id,
                    props.conversation.receiverId,
                    props.conversation.receiverName,
                    props.conversation.receiverEmail,
                    props.conversation.receiverPhotoPath,
                );
            }}>
            <View style={styles.productListSingleProductContainer}>
                <TouchableOpacity
                    onPress={(): void => {
                        props.openConversationDetails(
                            props.conversation.id,
                            props.conversation.receiverId,
                            props.conversation.receiverName,
                            props.conversation.receiverEmail,
                            props.conversation.receiverPhotoPath,
                        );
                    }}>
                    <Image
                        style={styles.productListSingleProductImage}
                        source={{
                            uri: `${props.conversation.receiverPhotoPath}`,
                        }}
                    />
                </TouchableOpacity>

                <View style={styles.productListSingleProductTextContainer}>
                    <Text style={styles.conversationReceiverName}>
                        {props.conversation.receiverName}
                    </Text>

                    <Text
                        style={
                            props.conversation.userHadUnreadedMessages
                                ? styles.unreadedConversation
                                : styles.readedConversation
                        }>
                        {props.conversation.messages[
                            props.conversation.messages.length - 1
                        ].message.substring(0, 20)}
                    </Text>
                    <Text style={styles.lastMessageDate}>
                        {lastMessageDate}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    productListSingleProductContainer: {
        width: '100%',
        borderWidth: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 6,
        borderColor: '#424242',
        marginBottom: 10,
        paddingLeft: 6,
    },
    productListSingleProductImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 10,
        borderRadius: 25,
    },
    productListSingleProductTextContainer: {
        paddingLeft: 10,
        width: '85%',
    },
    conversationReceiverName: {
        fontWeight: '600',
        textAlign: 'left',
        color: '#333',
        //fontFamily: "Open Sans"
    },
    unreadedConversation: {
        color: customOrangeColor,
        textAlign: 'left',
        fontSize: 12,
        //fontFamily: "Open Sans"
    },
    readedConversation: {
        color: '#333',
        textAlign: 'left',
        fontSize: 12,
        //fontFamily: "Open Sans"
    },
    lastMessageDate: {
        textAlign: 'left',
        color: '#333',
        fontSize: 10,
        marginTop: 5,
    },
});

export default SingleConversationBox;
