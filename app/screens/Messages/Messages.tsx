import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import axios from 'axios';
import MessageList from './utils/MessageList';
import {withNavigation} from 'react-navigation';
import lang from './../../lang/Messages/Messages';
import TopHeader from './../../components/Utils/TopHeader';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../helpers/globalVariables';
import {setAlert} from '../../../app/store/alert/actions';
import {setLoader} from '../../../app/store/loader/actions';
import {customOrangeColor} from './../../assets/global/globalStyles';
const messagesBgMin: any = require('./../../assets/images/messagesBgMin.jpg');
const loaderImage: any = require('./../../assets/images/loader.gif');

interface IMessagesProps {
    navigation: any;
}

const Messages = ({navigation}: IMessagesProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [messagesList, setMessagesList] = useState([]);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [displayPrivateMessages, setDisplayPrivateMessages] = useState(false);

    const closeConversationDetails = (): void => {
        getMessages();
        setShowFilterPanel(true);
    };

    //load all conversation with messages for them
    const getMessages = (): void => {
        // let API_URL = this.context.API_URL;
        let user_id = userData?.id;

        dispatch(setLoader(true));

        axios
            .post(API_URL + '/showUserConversations', {
                user_id: user_id,
            })
            .then(async response => {
                console.log(['showUserConversations', response]);
                if (response.data.status === 'OK') {
                    //console.log(["messagesList", response.data.result.conversationData]);
                    setMessagesList(response.data.result.conversationData);
                    setDisplayPrivateMessages(true);
                }

                dispatch(setLoader(false));
            })
            .catch(async error => {
                dispatch(
                    setAlert(
                        'danger',
                        lang.conversationDetailsError[activeLanguage],
                    ),
                );

                dispatch(setLoader(false));
            });
    };

    const getAuctionMessages = (): void => {
        let user_id = userData?.id;

        dispatch(setLoader(true));

        axios
            .post(API_URL + '/showUserConversations', {
                user_id: user_id,
                showProductsConversations: true,
            })
            .then(async response => {
                if (response.data.status === 'OK') {
                    //console.log(response.data.result.conversationData);
                    setMessagesList(response.data.result.conversationData);
                    setDisplayPrivateMessages(false);
                }

                dispatch(setLoader(false));
            })
            .catch(async error => {
                dispatch(
                    setAlert(
                        'danger',
                        lang.conversationDetailsError[activeLanguage],
                    ),
                );

                dispatch(setLoader(false));
            });
    };

    useEffect(() => {
        getMessages();
        setDisplayPrivateMessages(true);
        setShowFilterPanel(true);
    }, []);

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="Messages">
                    <React.Fragment>
                        <ScrollView>
                            <TopHeader
                                onClose={() => navigation.goBack()}
                                title={lang.header[activeLanguage]}
                            />

                            {/* {showFilterPanel && (
                                <View data-test="showFilterPanel">
                                    <View style={styles.filterBtnContainer}>
                                        <View
                                            style={
                                                styles.singleButtonCol2Container
                                            }>
                                            <TouchableOpacity
                                                onPress={getMessages}
                                                style={
                                                    displayPrivateMessages
                                                        ? styles.filterBtnActive
                                                        : styles.filterBtn
                                                }>
                                                <Text
                                                    style={
                                                        displayPrivateMessages
                                                            ? styles.filterBtnTextActive
                                                            : styles.filterBtnText
                                                    }>
                                                    {
                                                        lang.privateMessages[
                                                            activeLanguage
                                                        ]
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={
                                                styles.singleButtonCol2Container
                                            }>
                                            <TouchableOpacity
                                                onPress={getAuctionMessages}
                                                style={
                                                    !displayPrivateMessages
                                                        ? styles.filterBtnActive
                                                        : styles.filterBtn
                                                }>
                                                <Text
                                                    style={
                                                        !displayPrivateMessages
                                                            ? styles.filterBtnTextActive
                                                            : styles.filterBtnText
                                                    }>
                                                    {
                                                        lang.itemsMessages[
                                                            activeLanguage
                                                        ]
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )} */}

                            {messagesList ? (
                                messagesList.length > 0 ? (
                                    <MessageList
                                        messagesList={messagesList}
                                        navigation={navigation}
                                        data-test="MessageList"
                                    />
                                ) : displayPrivateMessages ? (
                                    <Text style={styles.noResultsContainer}>
                                        {lang.noResultsUsers[activeLanguage]}
                                    </Text>
                                ) : (
                                    <Text style={styles.noResultsContainer}>
                                        {lang.noResultsItems[activeLanguage]}
                                    </Text>
                                )
                            ) : null}
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

    filterBtnContainer: {
        position: 'relative',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    singleButtonCol2Container: {
        width: '46%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '3%',
    },
    filterBtnActive: {
        borderBottomColor: customOrangeColor,
        borderBottomWidth: 3,
        paddingBottom: 20,
    },
    filterBtn: {
        paddingBottom: 20,
    },
    filterBtnTextActive: {
        color: '#333',
        textAlign: 'center',
        paddingTop: 7,
        //fontFamily: "Open Sans"
    },
    filterBtnText: {
        color: '#9F9F9F',
        textAlign: 'center',
        paddingTop: 7,
        //fontFamily: "Open Sans"
    },
    noResultsContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default withNavigation(Messages);
