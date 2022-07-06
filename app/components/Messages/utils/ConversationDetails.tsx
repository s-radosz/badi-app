import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableHighlight,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import axios from 'axios';
import BottomPanel from './../../SharedComponents/BottomPanel';
import SendMessageBox from './SendMessageBox';
import SingleConversationMessage from './SingleConversationMessage';
import PageHeader from './../../SharedComponents/PageHeader';
import lang from './../../../assets/lang/Messages/utils/ConversationDetails';
import {useDispatch, useSelector} from 'react-redux';
import {setAlert} from '../../../../app/store/alert/actions';
import {API_URL} from './../../../helpers/globalVariables';
import {setLoader} from '../../../../app/store/loader/actions';
import {customOrangeColor} from './../../../assets/global/globalStyles';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface IConversationDetailsProps {
    navigation: any;
}

const ConversationDetails = ({navigation}: IConversationDetailsProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);

    const [openConversationMessages, setOpenConversationMessages] = useState(
        [],
    );
    const [receiverId, setReceiverId] = useState(0);
    const [receiverEmail, setReceiverEmail] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhotoPath, setReceiverPhotoPath] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [privateConversation, setPrivateConversation] = useState(true);
    const [productConversationId, setProductConversationId] = useState(0);
    const [productConversationAuthorId, setProductConversationAuthorId] =
        useState(0);

    const sendMessage = (
        receiver_id: number,
        message: string,
        conversation_id: number,
        status: number,
    ): void => {
        let openDetailsId = 0;

        if (!message) {
            dispatch(setAlert('danger', 'Pusta wiadomość.'));
        } else {
            axios
                .post(API_URL + '/saveMessage', {
                    sender_id: userData?.id,
                    receiver_id: receiver_id,
                    message: message,
                    conversation_id: conversation_id,
                    status: status,
                })
                .then(response => {
                    //console.log(["saveMessage", response.data]);
                    if (response.data.status === 'OK') {
                        //save conversation_id as openDetailsId in notification,
                        //openDetailsId is parameter for route
                        openDetailsId = response.data.result.conversation_id;

                        openConversationDetails(conversation_id);
                    }
                })
                .then(response =>
                    axios.post(API_URL + '/addNotification', {
                        type: 'sended_message',
                        message: `${lang.newMessageNotification['pl']} ${userData?.name}`,
                        userId: receiver_id,
                        senderId: userData?.id,
                        openDetailsId: openDetailsId,
                    }),
                )
                .catch(error => {
                    dispatch(setAlert('danger', lang.messageSavingError['pl']));
                });
        }
    };

    //open conversation details from list of conversations
    const openConversationDetails = (id: number) => {
        return new Promise((resolve, reject) => {
            let conversation_id = id;

            dispatch(setLoader(true));

            axios
                .post(API_URL + '/showConversationDetails', {
                    conversation_id: conversation_id,
                })
                .then(async response => {
                    if (response.data.status === 'OK') {
                        let privateMessage = true;
                        if (
                            response.data.result.conversation.product_id &&
                            response.data.result.conversation.product_id !== 0
                        ) {
                            privateMessage = false;
                        }
                        setOpenConversationMessages(
                            response?.data?.result?.conversation?.messages,
                        );
                        setReceiverId(navigation?.state?.params?.receiverId);
                        setPrivateConversation(privateMessage);
                        setProductConversationId(
                            response?.data?.result?.conversation?.product_id,
                        );
                        setProductConversationAuthorId(
                            response?.data?.result?.productOwnerId,
                        );

                        dispatch(setLoader(false));

                        resolve(true);
                    }
                })
                .catch(async error => {
                    dispatch(
                        setAlert('danger', lang.conversationDetailsError['pl']),
                    );

                    dispatch(setLoader(false));

                    reject(true);
                });
        });
    };

    const loadUserDataById = (userId: number) => {
        //let userId = this.props.navigation.state.params.receiverId;

        return new Promise((resolve, reject) => {
            axios
                .post(API_URL + '/loadUserDataById', {
                    id: userId,
                })
                .then(response => {
                    if (response.data.status === 'OK') {
                        let results = response.data.result[0];

                        setReceiverName(results?.name);
                        setReceiverEmail(results?.email);
                        setReceiverPhotoPath(results?.photo_path);

                        resolve(true);
                    }
                })
                .catch(error => {
                    reject(true);
                });
        });
    };

    const handleSetUserMessage = (message: string): void => {
        // this.setState({userMessage: message});
        setUserMessage(message);
    };

    useEffect(() => {
        openConversationDetails(navigation?.state?.params?.conversationId);
        loadUserDataById(navigation?.state?.params?.receiverId);

        // if (userData?.id) {
        //     // this.context.clearUserUnreadedMessages(
        //     //     this.context.userData.id,
        //     //     this.props.navigation.state.params.conversationId,
        //     // );
        // }
    }, []);

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="Messages">
                    <React.Fragment>
                        <ScrollView
                            keyboardShouldPersistTaps={'always'}
                            style={styles.viewContainer}
                            data-test="ConversationDetails">
                            <PageHeader
                                boldText={receiverName}
                                normalText={''}
                                closeMethod={() => navigation?.goBack(null)}
                                closeMethodParameter={''}
                                data-test="PageHeader"
                            />

                            <View style={styles.messageDetailsContainer}>
                                <TouchableOpacity>
                                    <Image
                                        style={
                                            styles.conversationDetailsReceiverImage
                                        }
                                        source={{
                                            uri: `${
                                                receiverPhotoPath &&
                                                receiverPhotoPath
                                            }`,
                                        }}
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text
                                        style={
                                            styles.conversationDetailsReceiverName
                                        }>
                                        {lang.conversationWith['pl']}{' '}
                                        {receiverName}
                                    </Text>
                                    {privateConversation && (
                                        <TouchableHighlight
                                            onPress={async () => {
                                                navigation?.push(
                                                    'UserDetails',
                                                    {
                                                        userId: navigation
                                                            ?.state?.params
                                                            ?.receiverId,
                                                        showBtns: true,
                                                    },
                                                );
                                            }}
                                            underlayColor={'#fff'}>
                                            <Text
                                                style={
                                                    styles.conversationDetailsSeeMore
                                                }>
                                                {lang.seeProfile['pl']}
                                            </Text>
                                        </TouchableHighlight>
                                    )}

                                    {!privateConversation &&
                                        productConversationId !== 0 &&
                                        productConversationAuthorId !== 0 && (
                                            <TouchableHighlight
                                                onPress={async () => {
                                                    navigation?.push(
                                                        'ProductDetails',
                                                        {
                                                            productId:
                                                                productConversationId,
                                                            authorId:
                                                                productConversationAuthorId,
                                                        },
                                                    );
                                                }}
                                                underlayColor={'#fff'}>
                                                <Text
                                                    style={
                                                        styles.conversationDetailsSeeMore
                                                    }>
                                                    {lang.seeItemDetails['pl']}
                                                </Text>
                                            </TouchableHighlight>
                                        )}
                                </View>
                            </View>
                            {/* <Text>Sender: {this.props.senderId}</Text>*/}
                            <ScrollView>
                                {openConversationMessages &&
                                    openConversationMessages.map(
                                        (message: any, i: number) => {
                                            return (
                                                <SingleConversationMessage
                                                    message={message}
                                                    key={`SingleConversationMessage-${i}`}
                                                    navigation={navigation}
                                                />
                                            );
                                        },
                                    )}
                            </ScrollView>

                            <SendMessageBox
                                receiverId={receiverId}
                                conversationId={
                                    navigation?.state?.params?.conversationId
                                }
                                sendMessage={sendMessage}
                                receiverName={receiverName}
                                receiverEmail={receiverEmail}
                                receiverPhotoPath={receiverPhotoPath}
                                setUserMessage={handleSetUserMessage}
                                userMessage={userMessage}
                            />
                        </ScrollView>
                        <BottomPanel
                            data-test="BottomPanel"
                            navigation={navigation}
                        />
                    </React.Fragment>
                </View>
            </SafeAreaView>
        </React.Fragment>
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
    viewContainer: {
        width: '100%',
    },
    messageDetailsContainer: {
        position: 'relative',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    conversationDetailsReceiverImage: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
    },
    conversationDetailsReceiverName: {
        marginTop: 15,
    },
    conversationDetailsSeeMore: {
        fontWeight: '600',
        color: customOrangeColor,
        //fontFamily: "Open Sans"
    },
});

export default ConversationDetails;
