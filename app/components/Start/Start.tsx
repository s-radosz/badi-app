import React, {FC, useState, useContext} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
// import { observer } from "mobx-react-lite"
// import {
//   Screen,
// } from "../../components"
import {Button} from 'react-native-paper';
// import { NavigatorParamList } from "../../navigators"
// import Footer from "./../../components/footer/footer"
import MainScreenHeader from './MainScreenHeader/MainScreenHeader';
import MapView from 'react-native-maps';
import SelectCategory from './SelectCategory/SelectCategory';
import SelectDate from './SelectDate/SelectDate';
import BottomPanel from './../SharedComponents/BottomPanel';
import {GlobalContext} from './../../Context/GlobalContext';
import {withNavigation} from 'react-navigation';
import Alert from './../Alert/Alert';
import ButtonComponent from './../Utils/ButtonComponent';

interface MainScreenProps {
    navigation: any;
}

const Start = ({navigation}: MainScreenProps) => {
    const context = useContext(GlobalContext);

    const [showSelectCategory, setSelectCategory] = useState(false);
    const [showSelectDate, setSelectDate] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedCategoryName, setSelectedCategoryName] =
        useState('Piłka nożna');

    const [selectedDateRangeFrom, setSelectedDateRangeFrom] = useState(
        new Date().toISOString().slice(0, 10),
    );
    const [selectedDateRangeTo, setSelectedDateRangeTo] = useState(
        new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .slice(0, 10),
    );

    const handleSelectCategory = (id: number, name: string) => {
        setSelectedCategoryId(id);
        setSelectedCategoryName(name);
        setSelectCategory(false);
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

            {showSelectDate ? (
                <SelectDate
                    onClose={() => setSelectDate(false)}
                    setSelectedDateRangeFrom={setSelectedDateRangeFrom}
                    setSelectedDateRangeTo={setSelectedDateRangeTo}
                    navigation={navigation}
                />
            ) : null}

            {/* <SafeAreaView testID="MainScreen" style={styles.container}> */}

            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                {context.showAlert && (
                    <Alert
                        alertType={context.alertType}
                        alertMessage={context.alertMessage}
                        closeAlert={context.closeAlert}
                    />
                )}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    // data-test="FindUsers"
                >
                    <MainScreenHeader
                        navigation={navigation}
                        setSelectCategory={(value: boolean) =>
                            setSelectCategory(value)
                        }
                        setSelectDate={(value: boolean) => setSelectDate(value)}
                        selectedCategoryName={selectedCategoryName}
                        selectedDateRange={`Od: ${selectedDateRangeFrom}\nDo: ${selectedDateRangeTo}`}
                    />
                    {/* <Screen 
                        style={styles.wrapper} 
                        // preset="scroll"
                    > */}
                    <MapView
                        initialRegion={{
                            latitude: 50.9333296,
                            longitude: 21.3999984,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height - 210,
                            // position: 'absolute',
                            // left: 0,
                            // top: 0,
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 60,
                            zIndex: 1,
                            elevation: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: Dimensions.get('screen').width,
                        }}>
                        {!context.userLoggedIn ? (
                            <ButtonComponent
                                pressButtonComponent={() =>
                                    navigation?.navigate('Register')
                                }
                                buttonComponentText={'Załóz konto'}
                                fullWidth={false}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                            />
                        ) : null}
                        {/* <Button
                            icon="camera"
                            mode="contained"
                            onPress={() => navigation?.navigate('Login')}>
                            login
                        </Button> */}
                    </View>

                    {/* </Screen> */}

                    <BottomPanel
                        data-test="BottomPanel"
                        navigation={navigation}
                    />
                </View>

                {/* <Footer navigate={(path: any) => navigation.navigate(path)} route="main"/> */}
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
});
