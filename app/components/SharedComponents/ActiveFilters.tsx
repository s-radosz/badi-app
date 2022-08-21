import React from 'react';
import {Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import lang from './../../lang/SharedComponents/ActiveFilters';
import {customOrangeColor} from './../../assets/global/globalStyles';
import {useSelector} from 'react-redux';

const trash: any = require('./../../assets/images/trash.png');

interface ActiveFiltersProps {
    filterDistance: number;
    filterHobbyName: string;
    filterStatus: string;
    showFilterModal: boolean;
    removeFilter: (type: string) => void;
}

const ActiveFilters = ({
    filterDistance,
    filterHobbyName,
    filterStatus,
    showFilterModal,
    removeFilter,
}: ActiveFiltersProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <View>
            {filterDistance || filterHobbyName
                ? !showFilterModal && (
                      <Text style={styles.activeFiltersText}>
                          {lang.activeFilters[activeLanguage]}
                      </Text>
                  )
                : null}

            <View style={styles.activeFiltersConatiner}>
                {filterDistance && !showFilterModal ? (
                    <View style={styles.removeFilterBtnContainer}>
                        <Text style={styles.removeFilterText}>
                            {lang.distance[activeLanguage]} - {filterDistance}
                        </Text>
                        <TouchableHighlight
                            style={styles.removeFilterBtn}
                            onPress={() =>
                                removeFilter(lang.distance[activeLanguage])
                            }
                            underlayColor={'#dd904d'}>
                            <Image source={trash} style={styles.img} />
                        </TouchableHighlight>
                    </View>
                ) : null}

                {filterHobbyName && !showFilterModal ? (
                    <View style={styles.removeFilterBtnContainer}>
                        <Text style={styles.removeFilterText}>
                            {lang.hobby[activeLanguage]} - {filterHobbyName}
                        </Text>
                        <TouchableHighlight
                            style={styles.removeFilterBtn}
                            onPress={() =>
                                removeFilter(lang.hobby[activeLanguage])
                            }
                            underlayColor={'#dd904d'}>
                            <Image source={trash} style={styles.img} />
                        </TouchableHighlight>
                    </View>
                ) : null}

                {filterStatus && !showFilterModal ? (
                    <View style={styles.removeFilterBtnContainer}>
                        <Text style={styles.removeFilterText}>
                            {lang.status[activeLanguage]} - {filterStatus}
                        </Text>
                        <TouchableHighlight
                            style={styles.removeFilterBtn}
                            onPress={() =>
                                removeFilter(lang.status[activeLanguage])
                            }
                            underlayColor={'#dd904d'}>
                            <Image source={trash} style={styles.img} />
                        </TouchableHighlight>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activeFiltersText: {
        paddingTop: 10,
        paddingLeft: 10,
        fontWeight: '600',
        color: '#424242',
        //fontFamily: "Open Sans"
    },
    removeFilterBtnContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    removeFilterText: {
        marginTop: 10,
        color: '#424242',
        //fontFamily: "Open Sans"
    },
    removeFilterBtn: {
        height: 40,
        width: 40,
        borderColor: customOrangeColor,
        borderWidth: 2,
        backgroundColor: customOrangeColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    removeFilterBtnText: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 15,
        color: '#fff',
        //fontFamily: "Open Sans"
    },
    activeFiltersConatiner: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        marginTop: 5,
        marginBottom: 10,
    },
    img: {
        width: 20,
        height: 20,
    },
});

export default ActiveFilters;
