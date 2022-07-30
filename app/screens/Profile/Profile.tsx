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

const UserPreview = React.lazy(
    () => import('./../../components/SharedComponents/UserPreview'),
);

interface IFeedbackModalProps {
    navigation: any;
}

const Profile = ({navigation}: IFeedbackModalProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [locationDetails, setLocationDetails] = useState({
        cityDistrict: '',
        city: '',
    });
    const [countFriends, setCountFriends] = useState(0);
    const [showProfilePreview, setShowProfilePreview] = useState(false);
    const [showEditUserData, setShowEditUserData] = useState(false);

    useEffect(() => {
        if (userData) {
            getAmountOfFriends(userData?.id);
        }
    }, []);

    const handleSetShowProfilePreview = (): void => {
        setShowProfilePreview(!showProfilePreview);
    };

    const getAmountOfFriends = (id: number): void => {
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
                                API_URL={API_URL}
                                avatar={userData?.photo_path}
                                name={userData?.name}
                                cityDistrict={locationDetails?.cityDistrict}
                                city={locationDetails.city}
                                age={userData?.age}
                                countFriends={countFriends}
                                countKids={0}
                                locationString={userData?.location_string}
                                showLogout={true}
                                navigation={navigation}
                            />
                        )}
                        {!showProfilePreview && !showEditUserData && (
                            <ProfileOptions
                                setShowProfilePreview={
                                    handleSetShowProfilePreview
                                }
                                navigation={navigation}
                                user={userData}
                                API_URL={API_URL}
                            />
                        )}
                        {showProfilePreview && !showEditUserData && (
                            <Suspense
                                fallback={
                                    <Text>{lang.loading[activeLanguage]}</Text>
                                }>
                                <UserPreview
                                    description={userData?.description}
                                    hobbies={userData?.hobbies}
                                    kids={userData?.kids}
                                />
                            </Suspense>
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
