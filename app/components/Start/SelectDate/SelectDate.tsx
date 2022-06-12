import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
// import { observer } from "mobx-react-lite"
// import {
//   Screen
// } from "../../../components"
import {Appbar} from 'react-native-paper';
// import {NavigatorParamList} from '../../../navigators';
// import Footer from "./../../../components/footer/footer"
import {DatePickerModal} from 'react-native-paper-dates';

interface SelectDateProps {
    onClose: () => void;
    navigation: any;
    setSelectedDateRangeFrom: any;
    setSelectedDateRangeTo: any;
}

const SelectDate = (props: SelectDateProps) => {
    const [range, setRange] = React.useState<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({startDate: undefined, endDate: undefined});

    const [open, setOpen] = React.useState(true);

    const onConfirm = React.useCallback(
        ({startDate, endDate}: any) => {
            setRange({startDate, endDate});
            props?.setSelectedDateRangeFrom(
                new Date(new Date().setDate(startDate?.getDate()))
                    ?.toISOString()
                    ?.slice(0, 10),
            );
            props?.setSelectedDateRangeTo(endDate?.toISOString()?.slice(0, 10));
            setOpen(false);
            props?.onClose();
        },
        [setOpen, setRange],
    );
    return (
        <SafeAreaView testID="MainScreen" style={styles.container}>
            <Appbar style={styles.topBar}>
                <Appbar.Header style={styles.topBarBack}>
                    <Appbar.BackAction onPress={props?.onClose} />
                </Appbar.Header>
                <Appbar.Content title="Wybierz Datę" />
            </Appbar>
            {/* <Screen style={styles.wrapper} preset="scroll"> */}
            <View>
                <DatePickerModal
                    locale="pl"
                    mode="range"
                    startDate={range.startDate}
                    endDate={range.endDate}
                    visible={true}
                    onDismiss={props?.onClose}
                    date={new Date()}
                    onConfirm={onConfirm}
                    // validRange={{
                    //   startDate: new Date(2021, 1, 2),  // optional
                    //   endDate: new Date(), // optional
                    //   disabledDates: [new Date()] // optional
                    // }}
                    // onChange={} // same props as onConfirm but triggered without confirmed by user
                    // saveLabel="Save" // optional
                    // uppercase={false} // optional, default is true
                    // label="Select date" // optional
                    // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                />
            </View>
            {/* </Screen> */}
            {/* <Footer navigate={(path: any) => props?.navigation?.navigate(path)} route="main"/> */}
        </SafeAreaView>
    );
};

export default SelectDate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height + 100,
    },
    wrapper: {},
    topBar: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        backgroundColor: '#fff',
    },
    topBarBack: {
        backgroundColor: '#fff',
        elevation: 0,
    },
});
