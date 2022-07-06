import React from 'react';
import {Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import lang from './../../assets/lang/SharedComponents/ActiveFilters';
import {customOrangeColor} from './../../assets/global/globalStyles';

const trash: any = require('./../../assets/images/trash.png');

const ActiveFilters = (props: any) => (
    <View>
        {props.filterDistance || props.filterHobbyName
            ? !props.showFilterModal && (
                  <Text style={styles.activeFiltersText}>
                      {lang.activeFilters['pl']}
                  </Text>
              )
            : null}

        <View style={styles.activeFiltersConatiner}>
            {props.filterDistance && !props.showFilterModal ? (
                <View style={styles.removeFilterBtnContainer}>
                    <Text style={styles.removeFilterText}>
                        {lang.distance['pl']} - {props.filterDistance}
                    </Text>
                    <TouchableHighlight
                        style={styles.removeFilterBtn}
                        onPress={() => props.removeFilter(lang.distance['pl'])}
                        underlayColor={'#dd904d'}>
                        <Image source={trash} style={styles.img} />
                    </TouchableHighlight>
                </View>
            ) : null}

            {props.filterHobbyName && !props.showFilterModal ? (
                <View style={styles.removeFilterBtnContainer}>
                    <Text style={styles.removeFilterText}>
                        {lang.hobby['pl']} - {props.filterHobbyName}
                    </Text>
                    <TouchableHighlight
                        style={styles.removeFilterBtn}
                        onPress={() => props.removeFilter(lang.hobby['pl'])}
                        underlayColor={'#dd904d'}>
                        <Image source={trash} style={styles.img} />
                    </TouchableHighlight>
                </View>
            ) : null}

            {props.filterStatus && !props.showFilterModal ? (
                <View style={styles.removeFilterBtnContainer}>
                    <Text style={styles.removeFilterText}>
                        {lang.status['pl']} - {props.filterStatus}
                    </Text>
                    <TouchableHighlight
                        style={styles.removeFilterBtn}
                        onPress={() => props.removeFilter(lang.status['pl'])}
                        underlayColor={'#dd904d'}>
                        <Image source={trash} style={styles.img} />
                    </TouchableHighlight>
                </View>
            ) : null}
        </View>
    </View>
);

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
