import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import MainScreenHeader from './MainScreenHeader/MainScreenHeader';
import MapView from 'react-native-maps';
import SelectCategory from './SelectCategory/SelectCategory';
import SelectDate from './SelectDate/SelectDate';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import {withNavigation} from 'react-navigation';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import {useSelector, useDispatch} from 'react-redux';
import lang from './../../lang/Start/Start';
import {setDateFrom, setDateTo} from './../../store/searchFilter/actions';
import {Modalize} from 'react-native-modalize';

interface MainScreenProps {
    navigation: any;
}

const Start = ({navigation}: MainScreenProps) => {
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const getData = () => {
        return [
            {
                id: 5,
                title: 'Test #1',
                description: 'Test',
                category_id: 1,
                date: '2022-07-27',
                members_limit: 1,
                author_id: 1,
                latitude: 51.509865,
                longitude: -0.118092,
                created_at: '2022-07-27T17:41:10.000000Z',
                updated_at: '2022-07-27T17:41:10.000000Z',
            },
            {
                id: 6,
                title: 'Test #2',
                description: 'Test 2 desc',
                category_id: 6,
                date: '2022-07-29',
                members_limit: 2,
                author_id: 1,
                latitude: 51.528354567701,
                longitude: -0.12985293202157,
                created_at: '2022-07-27T17:44:09.000000Z',
                updated_at: '2022-07-27T17:44:09.000000Z',
            },
        ];
    };

    const renderItem = item => (
        <View>
            <Text>{item.title}</Text>
        </View>
    );

    const dispatch = useDispatch();

    const userToken = useSelector((state: any) => state?.User?.details?.token);
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

    const [showSelectCategory, setSelectCategory] = useState(false);
    const [showSelectDate, setSelectDate] = useState(false);

    // const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    // const [selectedCategoryName, setSelectedCategoryName] = useState(
    //     activeLanguage === 'pl' ? 'Piłka nozna' : 'Football',
    // );

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
        setSelectCategory(false);
    };

    const handleClose = dest => {
        if (modalizeRef.current) {
            modalizeRef.current.close(dest);
        }
    };

    const renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.content__subheading}>
                {'Introduction'.toUpperCase()}
            </Text>
            <Text style={styles.content__heading}>Always open modal!</Text>
            <Text style={styles.content__description}>
                jsjdsjds dsdsjkdskmd dskmdskkdms dkskmdkmds kmdsmkdskm sdm
                kmdskm kmdsmkds kdsms kdsmkds
            </Text>
            {/* <Button name="Close to initial position" onPress={() => handleClose('alwaysOpen')} />
          <Button name="Close completely" onPress={handleClose} /> */}
        </View>
    );

    return (
        <>
            {showSelectCategory ? (
                <SelectCategory
                    onClose={() => setSelectCategory(false)}
                    navigation={navigation}
                    handleSelectCategory={handleSelectCategory}
                />
            ) : null}

            {showSelectDate ? (
                <SelectDate
                    onClose={() => setSelectDate(false)}
                    // setSelectedDateRangeFrom={activeDateFrom}
                    // setSelectedDateRangeTo={activeDateTo}
                    navigation={navigation}
                />
            ) : null}

            <SafeAreaView style={styles.container}>
                <View
                    style={styles.wrapper}
                    // data-test="FindUsers"
                >
                    <MainScreenHeader
                        navigation={navigation}
                        setSelectCategory={(value: boolean) =>
                            setSelectCategory(value)
                        }
                        setSelectDate={(value: boolean) => setSelectDate(value)}
                        selectedCategoryName={activeCategory?.name}
                        selectedDateRange={`${lang.from[activeLanguage]}: ${activeDateFrom}\n${lang.to[activeLanguage]}: ${activeDateTo}`}
                    />

                    <Modalize
                        ref={modalizeRef}
                        modalStyle={styles.content__modal}
                        alwaysOpen={200}
                        handlePosition="inside"
                        modalTopOffset={150}>
                        {renderContent()}
                    </Modalize>

                    <MapView
                        initialRegion={
                            activeLanguage === 'pl'
                                ? {
                                      //warsaw
                                      latitude: 52.237049,
                                      longitude: 21.017532,
                                      latitudeDelta: 0.0922,
                                      longitudeDelta: 0.0421,
                                  }
                                : {
                                      //london
                                      latitude: 51.509865,
                                      longitude: -0.118092,
                                      latitudeDelta: 0.0922,
                                      longitudeDelta: 0.0421,
                                  }
                        }
                        style={styles.map}
                    />
                    <View style={styles.bottomBtnContainer}>
                        {!userToken ? (
                            <ButtonComponent
                                pressButtonComponent={() =>
                                    navigation?.navigate('Register')
                                }
                                buttonComponentText={
                                    lang.register[activeLanguage]
                                }
                                fullWidth={false}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                            />
                        ) : null}
                    </View>
                </View>
                <BottomPanel data-test="BottomPanel" navigation={navigation} />
            </SafeAreaView>
        </>
    );
};

export default withNavigation(Start);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 210,
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

    content: {
        padding: 20,
    },

    content__modal: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.45,
        shadowRadius: 16,

        flex: 0,
    },

    content__subheading: {
        marginBottom: 2,

        fontSize: 16,
        fontWeight: '600',
        color: '#ccc',
    },

    content__heading: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },

    content__description: {
        paddingTop: 10,
        paddingBottom: 10,

        fontSize: 15,
        fontWeight: '200',
        lineHeight: 22,
        color: '#666',
    },
});
