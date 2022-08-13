import React, {Suspense, useEffect, useState} from 'react';
import {
    View,
    Text,
    NativeModules,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import axios from 'axios';
// @ts-ignore
import Geocode from 'react-geocode';
import lang from './../../lang/EditProfileInfo/EditProfileInfo';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../helpers/globalVariables';
import {setAlert} from '../../../app/store/alert/actions';
import {setLoader} from '../../../app/store/loader/actions';
import {returnTranslation} from './../../helpers/globalMethods';

const loaderImage: any = require('./../../assets/images/loader.gif');
var ImagePicker = NativeModules.ImageCropPicker;

const AgeDescScreen = React.lazy(() => import('./utils/AgeDescScreen'));
const PhotoScreen = React.lazy(() => import('./utils/PhotoScreen'));
const CoordsScreen = React.lazy(() => import('./utils/CoordsScreen'));
const ChooseHobbiesScreen = React.lazy(
    () => import('./utils/ChooseHobbiesScreen'),
);

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyDfVowJ0BKBbPW_-eCzkUA-Zk55VFE16AI');

interface IEditProfileInfoProps {
    navigation: any;
}

const EditProfileInfo = ({navigation}: IEditProfileInfoProps) => {
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const translations = useSelector(
        (state: any) => state?.Translations?.translations,
    );

    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState(0);
    const [desc, setDesc] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [actualStep, setActualStep] = useState(1);
    const [photo, setPhoto] = useState(null);
    const [locationString, setLocationString] = useState('');
    const [userSavedPhoto, setUserSavedPhoto] = useState('');
    const [region, setRegion] = useState({
        latitude: 52.237049,
        longitude: 21.017532,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        if (userData) {
            //console.log(["this.context.userData", this.context.userData]);

            setNickname(userData?.nickname);
            setAge(userData?.age);
            setDesc(userData?.description);
            setUserSavedPhoto(userData?.photo_path);

            if (userData?.lattitude && userData?.longitude) {
                setRegion({
                    latitude: userData?.lattitude,
                    longitude: userData?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }

            getAllHobbies();
        }
        //user logged in first time
        else {
            getAllHobbies();
        }
    }, []);

    const cleanUserHobbies = async () => {
        try {
            // let API_URL = this.context.API_URL;
            let userId = userData?.id;

            let json = await axios
                .post(API_URL + '/cleanUserHobbies', {
                    userId: userId,
                })
                .catch(error => {
                    //console.log(error.message);
                });

            return json;
        } catch (error) {
            //console.log(error);
        }
    };

    const saveHobbies = (): void => {
        try {
            // let API_URL = this.context.API_URL;
            let userEmailName = userData?.email;

            hobbies.map(async (hobby: {active: boolean; id: number}) => {
                if (hobby.active) {
                    let json = await axios
                        .post(API_URL + '/saveHobbyUser', {
                            userEmail: userEmailName,
                            hobby_id: hobby.id,
                        })
                        .catch(error => {
                            //console.log(error.message);
                        });

                    return json;
                }
            });
        } catch (error) {
            //console.log(error);
        }
    };

    const changeHobbyStatus = (hobbyKeyId: number): void => {
        let newHobbies = hobbies;

        //Find index of specific object using findIndex method.
        let hobbyUpdateElementIndex = newHobbies.findIndex(
            (obj: {keyId: number}) => obj.keyId == hobbyKeyId,
        );

        newHobbies[hobbyUpdateElementIndex].active =
            !newHobbies[hobbyUpdateElementIndex].active;

        setHobbies(newHobbies);
        // this.setState({hobbies: newHobbies});
    };

    const onRegionChange = async (region: any) => {
        setRegion(region);
        // await this.setState({region});
    };

    const getAllHobbies = (): void => {
        // let API_URL = this.context.API_URL;
        let activeHobbies: {name: string}[] = [];
        //if user want to edit profile and have some hobbies, then we format that hobbies array and set active hobbies
        if (userData?.hobbies) {
            userData?.hobbies.map(async (hobby: any, i: number) => {
                let activeHobbyObj = {
                    name: hobby.name,
                };
                activeHobbies.push(activeHobbyObj);
            });
        }

        axios
            .get(API_URL + '/hobbiesList')
            .then(response => {
                if (response.data.status === 'OK') {
                    //console.log(["response.data.result", response.data.result]);
                    //loop through existing state list of all hobbies and check if name is element of activeHobbies
                    response.data.result.map(
                        (hobby: {name: string; id: number}, i: number) => {
                            let hobbyObj = {};

                            if (
                                activeHobbies.filter(
                                    activeHobby =>
                                        activeHobby.name === hobby.name,
                                ).length > 0
                            ) {
                                hobbyObj = {
                                    name: hobby.name,
                                    id: hobby.id,
                                    keyId: i,
                                    active: true,
                                };
                            } else {
                                hobbyObj = {
                                    name: hobby.name,
                                    id: hobby.id,
                                    keyId: i,
                                    active: false,
                                };
                            }

                            setHobbies([...hobbies, hobbyObj]);

                            // this.setState(prevState => ({
                            //     hobbies: [...prevState.hobbies, hobbyObj],
                            // }));
                        },
                    );
                }
            })
            .catch(error => {
                //console.log(error.message);
            });
    };

    // const handleChange = (name: string, value: string) => {
    //     // @ts-ignore
    //     this.setState((): void => ({[name]: value}));
    // };

    const handleChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            forceJpg: true,
            cropperCircleOverlay: false,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
            compressVideoPreset: 'MediumQuality',
            includeBase64: true,
        })
            .then((image: any) => {
                //console.log(image);
                setPhoto(image);
                // this.setState({photo: image});
            })
            .catch((e: any) => {
                //console.log(e);
            });
    };

    const fileUpload = async () => {
        if (photo) {
            try {
                // let API_URL = this.context.API_URL;
                let userEmailName = userData?.email;

                const formData = new FormData();
                formData.append('file', photo?.data);
                formData.append('fileName', userEmailName.split('@')[0]);
                formData.append('userEmail', userEmailName);

                let json = await axios
                    .post(API_URL + 'api/uploadUserPhoto', formData)
                    .catch(error => {
                        //console.log(error);
                    });

                return json;
            } catch (error) {
                //console.log(error);
            }
        }
    };

    const userLocationString = async () => {
        // const {region} = this.state;

        let locationString;
        await Geocode.fromLatLng(region.latitude, region.longitude).then(
            (res: any) => {
                if (
                    res.results[0].address_components[2] &&
                    res.results[0].address_components[2].long_name &&
                    res.results[0].address_components[3] &&
                    res.results[0].address_components[3].long_name
                ) {
                    let cityDistrict =
                        res.results[0].address_components[2].long_name;
                    let city = res.results[0].address_components[3].long_name;

                    locationString = `${cityDistrict}, ${city}`;

                    setLocationString(locationString);
                    // this.setState({locationString: locationString});
                } else {
                    locationString = `${res.results[0].formatted_address}`;

                    setLocationString(locationString);
                    // this.setState({locationString: locationString});
                }
            },
            (error: any) => {
                console.error(error);
            },
        );
    };

    const saveUserData = async () => {
        // const {age, nickname, desc, region, locationString} = this.state;

        try {
            // let API_URL = this.context.API_URL;
            let userEmailName = userData?.email;

            let json = await axios
                .post(API_URL + '/updateUserInfo', {
                    userEmail: userEmailName,
                    nickname: nickname,
                    age: age,
                    desc: desc,
                    lat: region.latitude,
                    lng: region.longitude,
                    locationString: locationString,
                })
                .catch(error => {
                    //console.log(error);
                });

            return json;
        } catch (error) {
            //console.log(error);
        }
    };

    const checkAvailableNickname = async () => {
        // const {nickname} = this.state;

        try {
            // let API_URL = this.context.API_URL;
            let userEmailName = userData?.email;

            let json = await axios
                .post(API_URL + '/checkAvailableNickname', {
                    userEmail: userEmailName,
                    nickname: nickname,
                })
                .then(async response => {
                    dispatch(setLoader(true));
                    if (response.data.status === 'OK') {
                        await saveData();

                        dispatch(setLoader(false));

                        return true;
                    } else {
                        setActualStep(1);

                        dispatch(
                            setAlert(
                                'danger',
                                lang.nickExistsError[activeLanguage],
                            ),
                        );

                        dispatch(setLoader(false));

                        return false;
                    }
                })
                .catch(error => {
                    setAlert(
                        'danger',
                        `${returnTranslation(
                            error?.response?.data?.msg
                                ? error?.response?.data?.msg
                                : lang.editProfileError[activeLanguage],
                            translations,
                            activeLanguage,
                        )}`,
                    );
                });

            return json;
        } catch (error) {
            setAlert(
                'danger',
                `${returnTranslation(
                    error?.response?.data?.msg
                        ? error?.response?.data?.msg
                        : lang.editProfileError[activeLanguage],
                    translations,
                    activeLanguage,
                )}`,
            );
            return false;
        }
    };

    const nextStep = (): void => {
        setActualStep(actualStep + 1);
        // this.setState({actualStep: this.state.actualStep + 1});
    };

    const prevStep = (): void => {
        setActualStep(actualStep - 1);
        // this.setState({actualStep: this.state.actualStep - 1});
    };

    const saveData = async () => {
        //first remove user kids and hobbies and save new data
        await userLocationString();
        await cleanUserHobbies();
        await saveHobbies();
        await saveUserData();
        await fileUpload();

        // await this.context.setUserFilledInfo();

        setActualStep(1);
        // await this.setState({actualStep: 1});
    };

    const submitData = () => {
        checkAvailableNickname();
    };

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="FindUsers">
                    <View
                        data-test="editProfileInfoContainer"
                        style={{flex: 1}}>
                        <React.Fragment>
                            {actualStep === 1 && (
                                <Suspense
                                    fallback={
                                        <Text>
                                            {lang.loading[activeLanguage]}
                                        </Text>
                                    }>
                                    <AgeDescScreen
                                        handleChange={(event: any) =>
                                            setNickname(event?.target?.value)
                                        }
                                        nickname={nickname}
                                        age={age}
                                        desc={desc}
                                        nextStep={nextStep}
                                        data-test="ageDescScreenContainer"
                                    />
                                </Suspense>
                            )}
                            {actualStep === 2 && (
                                <Suspense
                                    fallback={
                                        <Text>
                                            {lang.loading[activeLanguage]}
                                        </Text>
                                    }>
                                    <PhotoScreen
                                        nextStep={nextStep}
                                        prevStep={prevStep}
                                        photo={photo}
                                        handleChoosePhoto={handleChoosePhoto}
                                        API_URL={API_URL}
                                        userSavedPhoto={userSavedPhoto}
                                        data-test="photoScreenContainer"
                                    />
                                </Suspense>
                            )}
                            {actualStep === 3 && (
                                <Suspense
                                    fallback={
                                        <Text>
                                            {lang.loading[activeLanguage]}
                                        </Text>
                                    }>
                                    <CoordsScreen
                                        nextStep={nextStep}
                                        prevStep={prevStep}
                                        onRegionChange={onRegionChange}
                                        region={region}
                                        data-test="coordsScreenContainer"
                                    />
                                </Suspense>
                            )}
                            {actualStep === 4 && (
                                <Suspense
                                    fallback={
                                        <Text>
                                            {lang.loading[activeLanguage]}
                                        </Text>
                                    }>
                                    <ChooseHobbiesScreen
                                        prevStep={prevStep}
                                        submitData={submitData}
                                        hobbies={hobbies}
                                        changeHobbyStatus={changeHobbyStatus}
                                        data-test="chooseHobbiesScreenContainer"
                                    />
                                </Suspense>
                            )}
                        </React.Fragment>
                    </View>
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

export default EditProfileInfo;
