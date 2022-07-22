import React, {useState, useEffect} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, View} from 'react-native';
import MainScreenHeader from './MainScreenHeader/MainScreenHeader';
import MapView from 'react-native-maps';
import SelectCategory from './SelectCategory/SelectCategory';
import SelectDate from './SelectDate/SelectDate';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import {withNavigation} from 'react-navigation';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import {useSelector} from 'react-redux';
import lang from './../../lang/Start/Start';

interface MainScreenProps {
    navigation: any;
}

const Start = ({navigation}: MainScreenProps) => {
    const userToken = useSelector((state: any) => state?.User?.details?.token);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const activeCategory = useSelector(
        (state: any) => state?.Categories?.activeCategory,
    );

    const [showSelectCategory, setSelectCategory] = useState(false);
    const [showSelectDate, setSelectDate] = useState(false);

    // const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    // const [selectedCategoryName, setSelectedCategoryName] = useState(
    //     activeLanguage === 'pl' ? 'Piłka nozna' : 'Football',
    // );

    const [selectedDateRangeFrom, setSelectedDateRangeFrom] = useState(
        new Date().toISOString().slice(0, 10),
    );
    const [selectedDateRangeTo, setSelectedDateRangeTo] = useState(
        new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .slice(0, 10),
    );

    const handleSelectCategory = (id: number, name: string) => {
        // setSelectedCategoryId(id);
        // setSelectedCategoryName(name);
        setSelectCategory(false);
    };

    // useEffect(() => {
    //     if (userToken) {
    //         console.log(['userToken', userToken]);
    //     }
    // }, [userToken]);

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
                    setSelectedDateRangeFrom={setSelectedDateRangeFrom}
                    setSelectedDateRangeTo={setSelectedDateRangeTo}
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
                        selectedDateRange={`${lang.from[activeLanguage]}: ${selectedDateRangeFrom}\n${lang.to[activeLanguage]}: ${selectedDateRangeTo}`}
                    />
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

                    <BottomPanel
                        data-test="BottomPanel"
                        navigation={navigation}
                    />
                </View>
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
});
