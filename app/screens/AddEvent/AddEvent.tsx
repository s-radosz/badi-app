import React, {useState, useEffect} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SelectCategory from './../Start/SelectCategory/SelectCategory';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import {withNavigation} from 'react-navigation';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import {useSelector, useDispatch} from 'react-redux';
import lang from './../../lang/AddEvent/AddEvent';
import TopHeader from './../../components/Utils/TopHeader';
import {setDateFrom, setDateTo} from './../../store/searchFilter/actions';
import {TextInput} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {setAlert} from '../../../app/store/alert/actions';
import axios from 'axios';
import {API_URL} from './../../helpers/globalVariables';
import InputComponent from './../../components/Utils/InputComponent';
import {returnTranslation} from './../../helpers/globalMethods';

interface AddEventScreenProps {
    navigation: any;
}

const AddEvent = ({navigation}: AddEventScreenProps) => {
    const dispatch = useDispatch();

    const userToken = useSelector((state: any) => state?.User?.details?.token);
    const userId = useSelector((state: any) => state?.User?.details?.id);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const translations = useSelector(
        (state: any) => state?.Translations?.translations,
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

    const [showSelectCategory, setSelectCategory] = useState(false);
    const [showSelectDate, setSelectDate] = useState(false);
    const [showSelectTime, setSelectTime] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [form, setForm] = useState({
        title: '',
        description: '',
        category_id: 1,
        date: new Date().toISOString().slice(0, 10),
        time: '12:00',
        members_limit: 1,
        author_id: null,
        latitude: activeLanguage === 'pl' ? 52.239049 : 51.509865,
        longitude: activeLanguage === 'pl' ? 21.019532 : -0.118092,
    });

    const handleSetFormValue = (name: string, value: any) => {
        setForm({...form, [name]: value});
        console.log(['form', form]);
    };

    useEffect(() => {
        if (userId) {
            console.log(['userID', userId]);
            handleSetFormValue('author_id', userId);
        }
    }, [userId]);

    useEffect(() => {
        if (!activeDateFrom) {
            dispatch(setDateFrom(new Date().toISOString().slice(0, 10)));
        }

        if (!activeDateTo) {
            dispatch(
                setDateTo(
                    new Date(new Date().setDate(new Date().getDate() + 7))
                        .toISOString()
                        .slice(0, 10),
                ),
            );
        }
    }, [activeDateFrom, activeDateTo]);

    const handleSelectCategory = (id: number, name: string) => {
        handleSetFormValue('category_id', id);
        setSelectCategory(false);
    };

    const onConfirmDate = React.useCallback(
        params => {
            console.log([
                'params.date',
                params.date,
                params.date.toISOString().slice(0, 10),
            ]);

            handleSetFormValue('date', params.date.toISOString().slice(0, 10));
            setSelectDate(false);
            setSelectTime(true);
        },
        [showSelectDate],
    );

    const onConfirmTime = React.useCallback(
        ({hours, minutes}) => {
            handleSetFormValue('time', `${hours}:${minutes}:00`);
            setSelectTime(false);
        },
        [showSelectTime],
    );

    const handleResetDateTimePicker = () => {
        setSelectDate(false);
        setSelectTime(false);
    };

    const handleMarkerDragEnd = (e: any) => {
        console.log([
            'handleMarkerDragEnd',
            e.nativeEvent.coordinate,
            form.latitude,
            form.longitude,
        ]);

        setForm({
            ...form,
            latitude: e?.nativeEvent?.coordinate?.latitude,
            longitude: e?.nativeEvent?.coordinate?.longitude,
        });
    };

    const handleAllowSubmit = () => {
        console.log(['form1', form]);

        const isNotEmpty = !Object.values(form).some(
            element => element == null || element == '',
        );

        return isNotEmpty;
    };

    const handleSubmit = () => {
        let allowSubmit = handleAllowSubmit();

        if (allowSubmit) {
            const {
                title,
                description,
                category_id,
                date,
                time,
                members_limit,
                author_id,
                latitude,
                longitude,
            } = form;

            const config = {
                Authorization: `Bearer ${userToken}`,
                Accept: 'application/json',
            };

            try {
                axios
                    .post(
                        API_URL + '/save-event',
                        {
                            title,
                            description,
                            category_id,
                            date: `${date} ${time}`,
                            members_limit,
                            author_id,
                            latitude,
                            longitude,
                        },
                        {headers: config},
                    )
                    .then(response => {
                        console.log(['response', response]);
                        if (response.data.status === 'OK') {
                            dispatch(
                                setAlert(
                                    'success',
                                    lang.saveEventSuccess[activeLanguage],
                                ),
                            );

                            navigation.navigate('Start');
                        } else {
                            dispatch(
                                setAlert(
                                    'danger',
                                    lang.saveEventFail[activeLanguage],
                                ),
                            );
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
                                        : lang.saveEventFail[activeLanguage],
                                    translations,
                                    activeLanguage,
                                )}`,
                            ),
                        );
                    });
            } catch (error) {
                console.log(['error', error]);
                dispatch(
                    setAlert(
                        'danger',
                        `${returnTranslation(
                            error?.response?.data?.msg
                                ? error?.response?.data?.msg
                                : lang.saveEventFail[activeLanguage],
                            translations,
                            activeLanguage,
                        )}`,
                    ),
                );
            }
        } else {
            dispatch(
                setAlert('danger', lang.allFieldsRequired[activeLanguage]),
            );
        }
    };

    return (
        <>
            {showSelectCategory ? (
                <SelectCategory
                    onClose={() => setSelectCategory(false)}
                    navigation={navigation}
                    handleSelectCategory={handleSelectCategory}
                />
            ) : null}

            <DatePickerModal
                locale={activeLanguage === 'pl' ? 'pl' : 'en'}
                mode="single"
                visible={showSelectDate}
                onDismiss={handleResetDateTimePicker}
                date={new Date()}
                onConfirm={onConfirmDate}
                label={lang.selectDate[activeLanguage]}
                uppercase={false}
                animationType="fade"
            />

            <TimePickerModal
                visible={showSelectTime}
                onDismiss={handleResetDateTimePicker}
                onConfirm={onConfirmTime}
                hours={12}
                minutes={0}
                label={lang.selectTime[activeLanguage]}
                uppercase={false}
                cancelLabel={lang.cancel[activeLanguage]}
                confirmLabel={lang.accept[activeLanguage]}
                animationType="fade"
                // locale={activeLanguage === 'pl' ? 'pl' : 'en'}
                locale={'pl'}
            />

            <SafeAreaView style={styles.container}>
                <View
                    style={styles.wrapper}
                    // data-test="FindUsers"
                >
                    <TopHeader
                        onClose={() =>
                            showMap ? setShowMap(false) : navigation.goBack()
                        }
                        title={
                            showMap
                                ? lang.selectLocation[activeLanguage]
                                : lang.header[activeLanguage]
                        }
                    />

                    {showMap ? (
                        <MapView
                            initialRegion={{
                                latitude: form.latitude,
                                longitude: form.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={styles.map}>
                            <Marker
                                draggable={true}
                                coordinate={{
                                    latitude: form.latitude,
                                    longitude: form.longitude,
                                }}
                                onDragEnd={handleMarkerDragEnd}
                            />
                        </MapView>
                    ) : null}

                    <View style={styles.formWrapper}>
                        <InputComponent
                            placeholder={lang.formTitleLabel[activeLanguage]}
                            inputOnChange={text =>
                                handleSetFormValue('title', text)
                            }
                            value={form.title}
                            secureTextEntry={false}
                            maxLength={100}
                            label={`${lang.formTitleLabel[activeLanguage]}*`}
                        />
                        <InputComponent
                            placeholder={
                                lang.formDescriptionLabel[activeLanguage]
                            }
                            inputOnChange={text =>
                                handleSetFormValue('description', text)
                            }
                            value={form.description}
                            secureTextEntry={false}
                            maxLength={300}
                            label={`${lang.formDescriptionLabel[activeLanguage]}*`}
                        />
                        <InputComponent
                            placeholder={
                                lang.formMembersLimitLabel[activeLanguage]
                            }
                            inputOnChange={text =>
                                handleSetFormValue(
                                    'members_limit',
                                    text.replace(/[^0-9]/g, ''),
                                )
                            }
                            value={form.members_limit.toString()}
                            secureTextEntry={false}
                            maxLength={3}
                            type={'number'}
                            label={`${lang.formMembersLimitLabel[activeLanguage]}*`}
                        />
                        <InputComponent
                            placeholder={'Date'}
                            inputOnChange={null}
                            value={`${form.date} ${form.time}`}
                            secureTextEntry={false}
                            maxLength={3}
                            type={'select'}
                            onClick={() => setSelectDate(true)}
                            label={'Date*'}
                        />
                        <InputComponent
                            placeholder={'Select Category'}
                            inputOnChange={null}
                            value={activeCategory?.name}
                            secureTextEntry={false}
                            maxLength={3}
                            type={'select'}
                            onClick={() => setSelectCategory(true)}
                            label={'Category*'}
                        />
                        <InputComponent
                            placeholder={'Location'}
                            inputOnChange={null}
                            value={`Lat: ${form?.latitude}, Lng: ${form?.longitude}`}
                            secureTextEntry={false}
                            maxLength={3}
                            type={'select'}
                            onClick={() => setShowMap(true)}
                            label={'Location*'}
                        />

                        <ButtonComponent
                            pressButtonComponent={handleSubmit}
                            buttonComponentText={lang.submit[activeLanguage]}
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                        />
                    </View>
                </View>
                <BottomPanel data-test="BottomPanel" navigation={navigation} />
            </SafeAreaView>
        </>
    );
};

export default withNavigation(AddEvent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        backgroundColor: '#fff',
    },
    formWrapper: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 235,
        paddingHorizontal: 10,
        // position: 'absolute',
        // left: 0,
        // top: 0,
    },
    bottomBtnContainer: {
        position: 'absolute',
        bottom: 60,
        zIndex: 1,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 210,
    },
});
