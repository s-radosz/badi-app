import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import lang from './../../lang/EventDetails/EventDetails';
import TopHeader from './../../components/Utils/TopHeader';
import {post} from './../../helpers/apiHelper';
import EventContent from './utils/EventContent';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {customOrangeColor} from '../../assets/global/globalStyles';
import {setAlert} from '../../../app/store/alert/actions';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import moment from 'moment';
import InputComponent from './../../components/Utils/InputComponent';

interface EventDetailsScreenProps {
    navigation: any;
    route: any;
}

const EventDetails = ({navigation, route}: EventDetailsScreenProps) => {
    const dispatch = useDispatch();

    const userToken = useSelector((state: any) => state?.User?.details?.token);
    const userId = useSelector((state: any) => state?.User?.details?.id);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const activeCategory = useSelector(
        (state: any) => state?.Categories?.activeCategory,
    );
    const activeDateFrom = useSelector(
        (state: any) => state?.SearchFilter?.dateFrom,
    );
    const activeDateTo = useSelector(
        (state: any) => state?.SearchFilter?.dateTo,
    );

    const eventId = route?.params?.eventId ? route?.params?.eventId : null;

    const [eventDetails, setEventDetails] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const [userOnList, setUserOnList] = useState(false);
    const [comment, setComment] = useState(null);
    const [showCommentsSection, setShowCommentsSection] = useState(false);

    const scrollViewRef = useRef(null);

    const config = {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
    };

    useEffect(() => {
        if (eventId) {
            getEventDetails(eventId);
        }
    }, [eventId]);

    useEffect(() => {
        if (eventDetails?.users?.length) {
            handleUserStatus();
        }
    }, [eventDetails?.users]);

    const getEventDetails = async (id: number) => {
        const response = await post('/event/details', {id: id});
        console.log(['getEventDetails', response?.result, userId]);
        setEventDetails(response?.result ? response?.result : null);
    };

    const handleUserStatus = () => {
        let userFound = eventDetails?.users.find(x => x.user_id === userId);

        if (userFound && userFound?.is_author === 1) {
            setIsAuthor(true);
            setUserOnList(true);
        } else if (userFound) {
            setUserOnList(true);
        }
    };

    const renderItemUsers = ({item}) => {
        return (
            <View style={styles.singleUserContainer}>
                <Text style={styles.singleUserText}>{`${
                    item?.user_details?.nickname
                }${
                    !item?.is_accepted
                        ? `- ${lang.waitingForAccepted[activeLanguage]}`
                        : ''
                }`}</Text>

                {isAuthor && userId !== item?.user_id && !item?.is_accepted ? (
                    <TouchableOpacity
                        onPress={() => handleAcceptUserRequest(item?.id)}
                        style={styles.acceptBtnContainer}>
                        <Text style={styles.acceptBtnText}>
                            {lang.acceptUser[activeLanguage]}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    };

    const renderItemComment = ({item}) => {
        return (
            <View style={styles.commentItemContainer}>
                <Text style={styles.commentItemUsername}>
                    {item?.user_details?.nickname}
                </Text>
                <View style={styles.commentItemSeparator}></View>
                <Text style={styles.commentItemDescription}>
                    {item?.message}
                </Text>
                <Text style={styles.commentItemDate}>{`${
                    lang.createdAt[activeLanguage]
                } - ${
                    moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss')
                    // .format('LLL')
                }`}</Text>
            </View>
        );
    };

    const handleAcceptUserRequest = async (requestId: number) => {
        await post('/event/accept-take-part-request', {id: requestId}, config)
            .then(response => {
                console.log(['response', response]);
                if (response.status === 'OK') {
                    dispatch(
                        setAlert(
                            'success',
                            lang.userRequestAcceptSuccess[activeLanguage],
                        ),
                    );

                    getEventDetails(eventId);
                } else {
                    dispatch(
                        setAlert(
                            'danger',
                            response?.msg
                                ? response?.msg
                                : lang.userRequestAcceptFail[activeLanguage],
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(
                    setAlert(
                        'danger',
                        lang.userRequestAcceptFail[activeLanguage],
                    ),
                );
            });
    };

    const handleJoinEvent = async () => {
        await post(
            '/event/send-take-part-request',
            {event_id: eventDetails?.id, user_id: userId},
            config,
        )
            .then(response => {
                if (response.status === 'OK') {
                    dispatch(
                        setAlert(
                            'success',
                            lang.userJoinSuccess[activeLanguage],
                        ),
                    );

                    getEventDetails(eventId);
                } else {
                    dispatch(
                        setAlert('danger', lang.userJoinFail[activeLanguage]),
                    );
                }
            })
            .catch(error => {
                dispatch(setAlert('danger', lang.userJoinFail[activeLanguage]));
            });
    };

    const handleSaveComment = async () => {
        if (comment) {
            await post(
                '/event/save-comment',
                {event_id: eventDetails?.id, user_id: userId, message: comment},
                config,
            )
                .then(response => {
                    if (response.status === 'OK') {
                        dispatch(
                            setAlert(
                                'success',
                                lang.saveCommentSuccess[activeLanguage],
                            ),
                        );

                        getEventDetails(eventId);
                        setComment(null);
                        scrollViewRef.current.scrollToEnd({animated: true});
                    } else {
                        dispatch(
                            setAlert(
                                'danger',
                                lang.saveCommentFail[activeLanguage],
                            ),
                        );
                    }
                })
                .catch(error => {
                    dispatch(
                        setAlert(
                            'danger',
                            lang.saveCommentFail[activeLanguage],
                        ),
                    );
                });
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View
                    style={styles.wrapper}
                    // data-test="FindUsers"
                >
                    <TopHeader
                        onClose={() => navigation.goBack()}
                        title={lang.header[activeLanguage]}
                    />
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1}}
                        style={styles.content}
                        ref={scrollViewRef}>
                        {/* <View style={styles.content}> */}
                        <EventContent
                            categoryName={eventDetails?.category?.name}
                            title={eventDetails?.title}
                            description={eventDetails?.description}
                            date={eventDetails?.date}
                            membersLimit={eventDetails?.members_limit}
                            acceptedUsersCount={
                                eventDetails?.users?.filter(
                                    user => user.is_accepted,
                                )?.length
                            }
                            commentsCount={
                                eventDetails?.comments?.length
                                    ? eventDetails?.comments?.length
                                    : 0
                            }
                        />

                        <View>
                            <Text style={styles.subHeaderTitle}>
                                {lang.userListHeader[activeLanguage]}
                            </Text>

                            <FlatList
                                data={eventDetails?.users}
                                renderItem={renderItemUsers}
                                keyExtractor={item => item?.user_id}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                scrollEnabled={false}
                            />

                            {!userOnList ? (
                                <ButtonComponent
                                    pressButtonComponent={handleJoinEvent}
                                    buttonComponentText={
                                        lang.joinEvent[activeLanguage]
                                    }
                                    fullWidth={true}
                                    underlayColor="#dd904d"
                                    whiteBg={false}
                                    showBackIcon={false}
                                />
                            ) : null}
                        </View>

                        <View style={styles.commentSection}>
                            <Text style={styles.subHeaderTitle}>
                                {lang.commentsHeader[activeLanguage]}
                            </Text>

                            {eventDetails?.users?.find(
                                user => user?.user_id === userId,
                            )?.is_accepted ? (
                                <>
                                    <FlatList
                                        data={eventDetails?.comments}
                                        renderItem={renderItemComment}
                                        keyExtractor={item => item?.user_id}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEnabled={false}
                                    />

                                    <View style={styles.addCommentContainer}>
                                        <InputComponent
                                            placeholder={
                                                lang.commentLabel[
                                                    activeLanguage
                                                ]
                                            }
                                            inputOnChange={text =>
                                                setComment(text)
                                            }
                                            value={comment}
                                            secureTextEntry={false}
                                            maxLength={300}
                                            additionalStyle={{
                                                minWidth:
                                                    Dimensions.get('screen')
                                                        .width * 0.7,
                                                height: 40,
                                                marginRight: 10,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                            }}
                                            // label={`${lang.formTitleLabel[activeLanguage]}*`}
                                        />

                                        <ButtonComponent
                                            pressButtonComponent={
                                                handleSaveComment
                                            }
                                            buttonComponentText={
                                                lang.addComment[activeLanguage]
                                            }
                                            fullWidth={false}
                                            underlayColor="#dd904d"
                                            whiteBg={false}
                                            showBackIcon={false}
                                            additionalStyle={{
                                                width:
                                                    Dimensions.get('screen')
                                                        .width * 0.15,
                                                height: 40,
                                            }}
                                        />
                                    </View>
                                </>
                            ) : (
                                <Text>{lang.onlyAccepted[activeLanguage]}</Text>
                            )}
                        </View>

                        {/* </View> */}
                    </ScrollView>

                    <BottomPanel
                        data-test="BottomPanel"
                        navigation={navigation}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

export default withNavigation(EventDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        backgroundColor: '#fff',
    },
    content: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 220,
        paddingHorizontal: 20,
    },
    subHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 40,
        paddingBottom: 10,
    },
    singleUserContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    singleUserText: {
        fontSize: 14,
    },
    acceptBtnContainer: {
        backgroundColor: customOrangeColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    acceptBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    commentSection: {
        paddingBottom: 100,
    },
    commentItemContainer: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    commentItemSeparator: {
        width: 50,
        height: 3,
        backgroundColor: customOrangeColor,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 20,
    },
    commentItemUsername: {
        fontSize: 15,
        fontWeight: 'bold',
        // paddingTop: 20,
        paddingBottom: 10,
    },
    commentItemDescription: {
        fontSize: 13,
    },
    commentItemDate: {
        paddingTop: 10,
        fontSize: 12,
    },
    addCommentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
