import React, {useState, useEffect} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, View, Text} from 'react-native';
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

    const renderItem = ({item}) => {
        return (
            <View style={styles.singleUserContainer}>
                <Text style={styles.singleUserText}>{`${
                    item?.user_details?.nickname
                } ${
                    userId === item?.user_id
                        ? ` - ${lang.creator[activeLanguage]}`
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

    const handleAcceptUserRequest = async (requestId: number) => {
        const config = {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
        };

        await post('/event/accept-take-part-request', {id: requestId}, config)
            .then(response => {
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
                            lang.userRequestAcceptFail[activeLanguage],
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

                    <View style={styles.content}>
                        <EventContent
                            categoryName={eventDetails?.category?.name}
                            title={eventDetails?.title}
                            description={eventDetails?.description}
                            date={eventDetails?.date}
                            membersLimit={eventDetails?.members_limit}
                        />

                        <View>
                            <Text style={styles.usersTitle}>
                                {lang.userListHeader[activeLanguage]}
                            </Text>

                            <FlatList
                                data={eventDetails?.users}
                                renderItem={renderItem}
                                keyExtractor={item => item?.user_id}
                            />
                        </View>
                    </View>

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
    usersTitle: {
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
});
