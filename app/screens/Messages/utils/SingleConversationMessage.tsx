import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import moment from 'moment';
import lang from './../../../lang/Messages/utils/SingleConversationMessage';
import {useDispatch, useSelector} from 'react-redux';
import {customOrangeColor} from './../../../assets/global/globalStyles';

interface ISingleConversationMessageProps {
    navigation: any;
    message: {
        sender_id: number;
        message: string;
        created_at: string;
    };
}

const SingleConversationMessage = ({
    navigation,
    message,
}: ISingleConversationMessageProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [isCurrentUserTheSender, setIsCurrentUserTheSender] = useState(false);
    const [showMessageDate, setShowMessageDate] = useState(false);

    const setMessageDate = (): void => {
        setShowMessageDate(!showMessageDate);
    };

    useEffect(() => {
        if (userData && userData?.id === message.sender_id) {
            setIsCurrentUserTheSender(true);
        }
    }, []);

    const messageDate = moment(message?.created_at).format('LLL');

    return (
        <View>
            <TouchableOpacity onPress={setMessageDate}>
                <Text
                    style={
                        isCurrentUserTheSender
                            ? styles.senderBox
                            : styles.receiverBox
                    }>
                    {message.message}
                </Text>
            </TouchableOpacity>
            {showMessageDate && (
                <Text
                    style={
                        isCurrentUserTheSender
                            ? styles.messageDateSender
                            : styles.messageDateReceiver
                    }>
                    {lang.createdAt[activeLanguage]} {messageDate}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    senderBox: {
        width: '80%',
        textAlign: 'right',
        alignSelf: 'flex-end',
        backgroundColor: '#ededed',
        fontSize: 12,
        padding: 5,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 6,
    },
    receiverBox: {
        width: '80%',
        backgroundColor: customOrangeColor,
        fontSize: 12,
        padding: 5,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 6,
        color: '#fff',
        //fontFamily: "Open Sans"
    },
    messageDateSender: {
        width: '80%',
        textAlign: 'right',
        alignSelf: 'flex-end',
        fontSize: 8,
        marginRight: 10,
        //fontFamily: "Open Sans"
    },
    messageDateReceiver: {
        width: '80%',
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 8,
        marginLeft: 10,
        //fontFamily: "Open Sans"
    },
});

export default SingleConversationMessage;
