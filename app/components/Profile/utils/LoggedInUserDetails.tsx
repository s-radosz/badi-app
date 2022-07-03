import React, {Component, Suspense, useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView, Image} from 'react-native';
import axios from 'axios';
import styles from './../../Users/style';
import BottomPanel from './../../SharedComponents/BottomPanel';
import Alert from './../../Alert/Alert';
import ProfileHeader from './../../SharedComponents/ProfileHeader';
import UserPreview from './../../SharedComponents/UserPreview';
import PageHeader from './../../SharedComponents/PageHeader';
import {GlobalContext} from './../../../Context/GlobalContext';
import lang from './../../../assets/lang/Profile/utils/LoggedInUserDetails';

import TopHeader from './../../Utils/TopHeader';

import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../../helpers/globalVariables';
import {setAlert} from '../../../../app/store/alert/actions';
import {setLoader} from '../../../../app/store/loader/actions';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface LoggedInUserDetailsState {
    showUserMessageBox: boolean;
    userDetailsData: any;
    userDetailsId: number;
    locationDetails: any;
    countFriends: number;
}

interface LoggedInUserDetailsProps {
    navigation: any;
}

interface ILoggedInUserDetailsProps {
    navigation: any;
}

const LoggedInUserDetails = ({navigation}: ILoggedInUserDetailsProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);

    const [showUserMessageBox, setShowUserMessageBox] = useState(false);
    const [locationDetails, setLocationDetails] = useState(null);
    const [userDetailsData, setUserDetailsData] = useState(null);
    const [userDetailsId, setUserDetailsId] = useState(0);
    const [countFriends, setCountFriends] = useState(0);

    useEffect(() => {
        getAmountOfFriends(userData.id);

        setShowUserDetails(userData.id);
    }, []);

    const getAmountOfFriends = (id: number): void => {
        axios
            .post(API_URL + '/countFriends', {
                userId: id,
            })
            .then(response => {
                if (response.data.status === 'OK') {
                    //console.log(["getAmountOfFriends", response.data.result]);
                    setCountFriends(response.data.result.countFriends);
                    // this.setState({
                    //     countFriends: response.data.result.countFriends,
                    // });
                }
            })
            .catch(error => {});
    };

    const handleSetUserDetailsId = (id: number) => {
        setUserDetailsId(id);
    };

    const setShowUserDetails = async (userId: number) => {
        //check if users are in the same conversation - start messaging
        // let API_URL = this.context.API_URL;
        /*let searchedUser = userId;*/
        let loggedInUser = userData.id;

        setUserDetailsId(0);
        setUserDetailsData([]);
        // await this.setState({userDetailsId: 0, userDetailsData: []});

        dispatch(setLoader(true));

        // this.context.setShowLoader(true);

        axios
            .post(API_URL + '/loadUserById', {
                userId: userId,
                loggedInUser: loggedInUser,
            })
            .then(async response => {
                if (response.data.status === 'OK') {
                    //console.log(["setShowUserDetails", response.data.result.user]);
                    // await this.setState({
                    //     userDetailsId: userId,
                    //     userDetailsData: response.data.result.user,
                    // });

                    setUserDetailsId(userId);
                    setUserDetailsData(response.data.result.user);

                    dispatch(setLoader(false));
                    // this.context.setShowLoader(false);
                }
            })
            .catch(async error => {
                // await this.context.setAlert(
                //     true,
                //     'danger',
                //     lang.userDetailsError['pl'],
                // );
                dispatch(setAlert('danger', lang.userDetailsError['pl']));

                // this.context.setShowLoader(false);
                dispatch(setLoader(false));
            });
    };

    return (
        <React.Fragment>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                {/* {this.context.showAlert && (
                    <Alert
                        alertType={this.context.alertType}
                        alertMessage={this.context.alertMessage}
                        closeAlert={this.context.closeAlert}
                    />
                )} */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    data-test="FindUsers">
                    {/* {this.context.showLoader ? (
                        <View
                            style={styles.loaderContainer}
                            data-test="loader">
                            <Image
                                style={{width: 100, height: 100}}
                                source={loaderImage}
                            />
                        </View>
                    ) : ( */}
                    <React.Fragment>
                        {userDetailsData && (
                            <ScrollView>
                                {/* <PageHeader
                                        boldText={userDetailsData.name}
                                        normalText={''}
                                        closeMethod={() => {
                                            this.props.navigation.goBack(
                                                null,
                                            );
                                        }}
                                        closeMethodParameter={''}
                                    /> */}

                                <TopHeader
                                    onClose={() => {}}
                                    title={userDetailsData?.name}
                                    ignoreBottomMargin={true}
                                />

                                <React.Fragment>
                                    <ProfileHeader
                                        API_URL={API_URL}
                                        avatar={userDetailsData?.photo_path}
                                        name={userDetailsData?.name}
                                        cityDistrict={
                                            locationDetails?.cityDistrict
                                        }
                                        city={locationDetails?.city}
                                        age={userDetailsData?.age}
                                        countFriends={countFriends}
                                        locationString={
                                            userDetailsData?.location_string
                                        }
                                    />

                                    <UserPreview
                                        hobbies={
                                            userDetailsData?.hobbies &&
                                            userDetailsData?.hobbies?.length > 0
                                                ? userDetailsData?.hobbies
                                                : null
                                        }
                                        description={
                                            userDetailsData?.description
                                        }
                                    />
                                </React.Fragment>
                            </ScrollView>
                        )}

                        <BottomPanel
                            data-test="BottomPanel"
                            navigation={navigation}
                        />
                    </React.Fragment>
                    {/* )} */}
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

export default LoggedInUserDetails;
