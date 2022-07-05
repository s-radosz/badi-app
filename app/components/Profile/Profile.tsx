import React, {Component, Suspense, useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import ProfileHeader from './../SharedComponents/ProfileHeader';
import ProfileOptions from './utils/ProfileOptions';
import axios from 'axios';
import PageHeader from './../SharedComponents/PageHeader';
import BottomPanel from './../SharedComponents/BottomPanel';
// import Alert from './../../components/Alert/Alert';
// import {GlobalContext} from './../../Context/GlobalContext';
import {withNavigation} from 'react-navigation';
import lang from './../../assets/lang/Profile/Profile';

import TopHeader from './../Utils/TopHeader';

import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../helpers/globalVariables';
import {setAlert} from '../../../app/store/alert/actions';
import {setLoader} from '../../../app/store/loader/actions';

const UserPreview = React.lazy(
    () => import('./../SharedComponents/UserPreview'),
);

interface IFeedbackModalProps {
    navigation: any;
}

const Profile = ({navigation}: IFeedbackModalProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);

    const [locationDetails, setLocationDetails] = useState({
        cityDistrict: '',
        city: '',
    });
    const [countFriends, setCountFriends] = useState(0);
    const [showProfilePreview, setShowProfilePreview] = useState(false);
    const [showEditUserData, setShowEditUserData] = useState(false);
    const [userHobbies, setUserHobbies] = useState([]);

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
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    data-test="ProfileContainer">
                    <ScrollView>
                        {/* user preview page header */}
                        {showProfilePreview && !showEditUserData && (
                            <TopHeader
                                onClose={handleSetShowProfilePreview}
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
                                // countKids={this.context.userData.kids.length}
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
                                fallback={<Text>{lang.loading['pl']}</Text>}>
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

export default withNavigation(Profile);
