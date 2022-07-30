import React from 'react';
import {TouchableOpacity, View, Dimensions, StyleSheet} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import lang from './../../../lang/Start/MainScreenHeader/MainScreenHeader';
import {useSelector} from 'react-redux';
import NavigationService from './../../../routes/NavigationService';

interface MainScreenHeaderProps {
    navigation: any;
    setSelectCategory: (value: boolean) => void;
    setSelectDate: (value: boolean) => void;
    selectedCategoryName: string;
    selectedDateRange: string;
}

const MainScreenHeader = (props: MainScreenHeaderProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={() => props?.setSelectCategory(true)}
                    style={styles.btnContainer}>
                    <View>
                        <Text style={[styles.btnText]}>
                            {lang.category[activeLanguage]}
                        </Text>
                        <Text style={[styles.subBtnText]}>
                            {props?.selectedCategoryName}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props?.setSelectDate(true)}
                    style={styles.btnContainer}>
                    <View>
                        <Text style={[styles.btnText]}>
                            {lang.date[activeLanguage]}
                        </Text>
                        <Text style={[styles.subBtnText]}>
                            {props?.selectedDateRange}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => NavigationService.navigate('AddEvent', {})}
                    style={styles.btnContainer}>
                    <IconButton
                        icon="plus-circle"
                        color={'#000'}
                        size={50}
                        style={styles.btnIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        minHeight: 70,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 3,
    },
    btnIcon: {
        padding: 0,
        margin: 0,
        height: 50,
        width: 50,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subBtnText: {
        textAlign: 'center',
        fontSize: 12,
    },
});

export default MainScreenHeader;
