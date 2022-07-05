import React, {useContext} from 'react';
import {Text} from 'react-native';
import ListItem from './../../Utils/ListItem';
import moment from 'moment';
import lang from './../../../assets/lang/Messages/utils/MessageList';

import {API_URL} from './../../../helpers/globalVariables';

const MessageList = (props: {messagesList: any; navigation: any}): any => {
    if (props.messagesList) {
        return props.messagesList && props.messagesList.length > 0 ? (
            props.messagesList.map((conversation: any, i: number) => {
                return (
                    <ListItem
                        API_URL={API_URL}
                        key={`MessageList-${i}`}
                        image={`${props.messagesList[i][0].receiverPhotoPath}`}
                        mainText={props.messagesList[i][0].receiverName}
                        subText={props.messagesList[i][0].messages[
                            props.messagesList[i][0].messages.length - 1
                        ].message.substring(0, 20)}
                        subSubText={moment(
                            props.messagesList[i][0].messages[
                                props.messagesList[i][0].messages.length - 1
                            ].updated_at,
                        ).format('LLL')}
                        onPress={(): void => {
                            props.navigation.navigate('ConversationDetails', {
                                conversationId: props.messagesList[i][0].id,
                                receiverId: props.messagesList[i][0].receiverId,
                            });
                        }}
                        userHadUnreadedMessages={
                            props.messagesList[i][0].userHadUnreadedMessages
                        }
                    />
                );
            })
        ) : (
            <Text style={{paddingLeft: 10}}>{lang.noResults['pl']}</Text>
        );
    }
};

export default React.memo(MessageList);
