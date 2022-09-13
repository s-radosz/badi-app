import React, {Suspense, useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ProfileHeader from './../../components/SharedComponents/ProfileHeader';
import ProfileOptions from './utils/ProfileOptions';
import axios from 'axios';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import {withNavigation} from 'react-navigation';
import lang from './../../lang/Profile/Profile';
import TopHeader from './../../components/Utils/TopHeader';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../helpers/globalVariables';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import {setAlert} from '../../../app/store/alert/actions';
import {returnTranslation} from './../../helpers/globalMethods';

const UserPreview = React.lazy(
    () => import('./../../components/SharedComponents/UserPreview'),
);

interface IFeedbackModalProps {
    navigation: any;
    route: any;
}

const Profile = ({navigation, route}: IFeedbackModalProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const translations = useSelector(
        (state: any) => state?.Translations?.translations,
    );

    const [locationDetails, setLocationDetails] = useState({
        cityDistrict: '',
        city: '',
    });
    const [countFriends, setCountFriends] = useState(0);
    const [showProfilePreview, setShowProfilePreview] = useState(false);
    const [showEditUserData, setShowEditUserData] = useState(false);

    const foreignUserId = route?.params?.foreignUserId
        ? route?.params?.foreignUserId
        : null;
    const [foreignUserData, setForeignUserData] = useState(null);

    useEffect(() => {
        setForeignUserData(null);
        if (foreignUserId) {
            loadUserDataById(foreignUserId);
        }
        if (userData || foreignUserId) {
            getAmountOfFriends(
                userData?.id
                    ? userData?.id
                    : foreignUserId
                    ? foreignUserId
                    : null,
            );
        }
    }, [foreignUserId]);

    const handleStartConversation = () => {
        return new Promise((resolve, reject) => {
            axios
                .post(API_URL + '/saveConversation', {
                    senderId: userData?.id,
                    receiverId: foreignUserData?.id,
                    message: 'Conversation started',
                })
                .then(response => {
                    console.log(['saveConversation', response]);
                    if (response?.data?.result) {
                        const {} = response?.data?.result;
                        // navigation?.navigate('Messages');

                        navigation.navigate('ConversationDetails', {
                            conversationId:
                                response?.data?.result?.conversation?.id,
                            receiverId: response?.data?.result?.receiverId,
                        });
                        // setForeignUserData(response?.data?.result);
                        resolve(true);
                    }
                })
                .catch(error => {
                    navigation?.navigate('Messages');
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
                    console.log(['response', response]);
                    if (response?.data?.result) {
                        setForeignUserData(response?.data?.result);
                        resolve(true);
                    }
                })
                .catch(error => {
                    reject(true);
                });
        });
    };

    const handleSetShowProfilePreview = () => {
        setShowProfilePreview(!showProfilePreview);
    };

    const getAmountOfFriends = (id: number) => {
        axios
            .post(API_URL + '/countFriends', {
                userId: id,
            })
            .then(response => {
                if (response.data.status === 'OK') {
                    setCountFriends(response.data.result.countFriends);
                }
            })
            .catch(error => {});
    };

    const handleInviteFriend = () => {
        return new Promise((resolve, reject) => {
            axios
                .post(API_URL + '/inviteFriend', {
                    senderId: userData?.id,
                    receiverId: foreignUserData?.id,
                })
                .then(response => {
                    console.log(['inviteFriend', response]);
                    if (response?.data?.result) {
                        dispatch(
                            setAlert(
                                'success',
                                lang.inviteFriendSuccess[activeLanguage],
                            ),
                        );
                        resolve(true);
                    }
                })
                .catch(error => {
                    console.log(['error', error]);
                    dispatch(
                        setAlert(
                            'danger',
                            `${returnTranslation(
                                error?.response?.data?.msg
                                    ? error?.response?.data?.msg
                                    : lang.inviteFriendFail[activeLanguage],
                                translations,
                                activeLanguage,
                            )}`,
                        ),
                    );
                    reject(true);
                });
        });
    };

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="ProfileContainer">
                    <ScrollView>
                        {/* user preview page header */}
                        {showProfilePreview && !showEditUserData && (
                            <TopHeader
                                // onClose={handleSetShowProfilePreview}
                                onClose={() => navigation.goBack()}
                                title={userData?.name}
                            />
                        )}

                        {!showEditUserData && (
                            <ProfileHeader
                                // API_URL={API_URL}
                                avatar={
                                    foreignUserData?.photo_path
                                        ? foreignUserData?.photo_path
                                        : userData?.photo_path
                                        ? userData?.photo_path
                                        : null
                                }
                                name={
                                    foreignUserData?.name
                                        ? foreignUserData?.name
                                        : userData?.name
                                        ? userData?.name
                                        : null
                                }
                                // cityDistrict={locationDetails?.cityDistrict}
                                // city={locationDetails.city}
                                age={
                                    foreignUserData?.age
                                        ? foreignUserData?.age
                                        : userData?.age
                                        ? userData?.age
                                        : null
                                }
                                countFriends={countFriends}
                                // countKids={0}
                                locationString={
                                    foreignUserData?.location_string
                                        ? foreignUserData?.location_string
                                        : userData?.location_string
                                        ? userData?.location_string
                                        : null
                                }
                                showLogout={true}
                                navigation={navigation}
                                foreignUserData={foreignUserData}
                                handleStartConversation={
                                    handleStartConversation
                                }
                            />
                        )}
                        {!showProfilePreview &&
                            !showEditUserData &&
                            !foreignUserData && (
                                <ProfileOptions
                                    // setShowProfilePreview={
                                    //     handleSetShowProfilePreview
                                    // }
                                    navigation={navigation}
                                    // user={userData}
                                    // API_URL={API_URL}
                                />
                            )}
                        {showProfilePreview &&
                            !showEditUserData &&
                            !foreignUserData && (
                                <Suspense
                                    fallback={
                                        <Text>
                                            {lang.loading[activeLanguage]}
                                        </Text>
                                    }>
                                    <UserPreview
                                        description={userData?.description}
                                        hobbies={userData?.hobbies}
                                        // kids={userData?.kids}
                                    />
                                </Suspense>
                            )}

                        {foreignUserData && (
                            <ButtonComponent
                                pressButtonComponent={handleInviteFriend}
                                buttonComponentText={
                                    lang.addToFriendList[activeLanguage]
                                }
                                fullWidth={true}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                            />
                        )}
                    </ScrollView>
                    <BottomPanel
                        data-test="BottomPanel"
                        navigation={navigation}
                    />
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
});

export default withNavigation(Profile);
