import React from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import lang from './../../../lang/Start/SelectDate/SelectDate';
import {useSelector, useDispatch} from 'react-redux';
import {setDateFrom, setDateTo} from './../../../store/searchFilter/actions';

interface SelectDateProps {
    onClose: () => void;
    navigation: any;
}

const SelectDate = ({onClose, navigation}: SelectDateProps) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [range, setRange] = React.useState<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({startDate: undefined, endDate: undefined});

    const [open, setOpen] = React.useState(true);

    const onConfirm = React.useCallback(
        ({startDate, endDate}: any) => {
            setRange({startDate, endDate});
            dispatch(
                setDateFrom(
                    new Date(new Date().setDate(startDate?.getDate()))
                        ?.toISOString()
                        ?.slice(0, 10),
                ),
            );
            dispatch(setDateTo(endDate?.toISOString()?.slice(0, 10)));
            setOpen(false);
            onClose();
        },
        [setOpen, setRange],
    );
    return (
        <SafeAreaView testID="MainScreen" style={styles.container}>
            <Appbar style={styles.topBar}>
                <Appbar.Header style={styles.topBarBack}>
                    <Appbar.BackAction onPress={onClose} />
                </Appbar.Header>
                <Appbar.Content title={lang.title[activeLanguage]} />
            </Appbar>
            <View>
                <DatePickerModal
                    locale={lang.title[activeLanguage] === 'pl' ? 'pl' : 'en'}
                    mode="range"
                    startDate={range.startDate}
                    endDate={range.endDate}
                    visible={true}
                    onDismiss={onClose}
                    date={new Date()}
                    onConfirm={onConfirm}
                />
            </View>
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
        backgroundColor: '#fff',
    },
    topBarBack: {
        backgroundColor: '#fff',
        elevation: 0,
    },
});
