import React from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import styles from './style';
import lang from './../../assets/lang/SharedComponents/ActiveFilters';

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
                        <Image source={trash} style={{width: 20, height: 20}} />
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
                        <Image source={trash} style={{width: 20, height: 20}} />
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
                        <Image source={trash} style={{width: 20, height: 20}} />
                    </TouchableHighlight>
                </View>
            ) : null}
        </View>
    </View>
);

export default ActiveFilters;
