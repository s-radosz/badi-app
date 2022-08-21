import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import ListItem from './../../../components/Utils/ListItem';
import moment from 'moment';
import lang from './../../../lang/Messages/utils/MessageList';
import {API_URL} from './../../../helpers/globalVariables';
import {useSelector} from 'react-redux';

interface MessageListProps {
    messagesList: any;
    navigation: any;
}

const MessageList = ({messagesList, navigation}: MessageListProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    if (messagesList) {
        return messagesList && messagesList.length > 0 ? (
            messagesList.map((conversation: any, i: number) => {
                return (
                    <ListItem
                        API_URL={API_URL}
                        key={`MessageList-${i}`}
                        image={`${messagesList[i][0].receiverPhotoPath}`}
                        mainText={messagesList[i][0].receiverName}
                        subText={messagesList[i][0].messages[
                            messagesList[i][0].messages.length - 1
                        ].message.substring(0, 20)}
                        subSubText={moment(
                            messagesList[i][0].messages[
                                messagesList[i][0].messages.length - 1
                            ].updated_at,
                        ).format('LLL')}
                        onPress={(): void => {
                            navigation.navigate('ConversationDetails', {
                                conversationId: messagesList[i][0].id,
                                receiverId: messagesList[i][0].receiverId,
                            });
                        }}
                        userHadUnreadedMessages={
                            false
                            // messagesList[i][0].userHadUnreadedMessages
                        }
                    />
                );
            })
        ) : (
            <Text style={styles.noResultsContainer}>
                {lang.noResults[activeLanguage]}
            </Text>
        );
    }
};

const styles = StyleSheet.create({
    noResultsContainer: {
        paddingLeft: 10,
    },
});

export default React.memo(MessageList);
