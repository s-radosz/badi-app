import React, {Component, useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './../style';
import moment from 'moment';
import lang from './../../../assets/lang/Messages/utils/SingleConversationMessage';
import {GlobalContext} from './../../../Context/GlobalContext';

import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';

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
                    {lang.createdAt['pl']} {messageDate}
                </Text>
            )}
        </View>
    );
};
export default SingleConversationMessage;
