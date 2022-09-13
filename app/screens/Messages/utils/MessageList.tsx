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

    const renderItem = ({item}) => {
        return (
            <ListItem
                API_URL={API_URL}
                key={item?.id}
                image={`${item[0].receiverPhotoPath}`}
                mainText={item[0].receiverName}
                subText={item[0].messages[
                    item[0].messages.length - 1
                ].message.substring(0, 20)}
                subSubText={moment(
                    item[0].messages[item[0].messages.length - 1].updated_at,
                ).format('LLL')}
                onPress={(): void => {
                    navigation.navigate('ConversationDetails', {
                        conversationId: item[0].id,
                        receiverId: item[0].receiverId,
                    });
                }}
                userHadUnreadedMessages={
                    false
                    // messagesList[i][0].userHadUnreadedMessages
                }
            />
        );
    };

    return (
        <>
            <FlatList
                data={messagesList}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
            />

            {!messagesList?.length ? (
                <Text style={styles.noResultsContainer}>
                    {lang.noResults[activeLanguage]}
                </Text>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    noResultsContainer: {
        paddingLeft: 10,
    },
});

export default React.memo(MessageList);
