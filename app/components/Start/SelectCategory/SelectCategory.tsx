import React, {FC, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
// import { observer } from "mobx-react-lite"
// import {Screen} from '../../../components';
import {Appbar} from 'react-native-paper';
// import {NavigatorParamList} from '../../../navigators';
// import Footer from './../../../components/footer/footer';
import {TextInput, Button, Chip} from 'react-native-paper';

import TopHeader from './../../Utils/TopHeader';

interface SelectCategoryProps {
    onClose: () => void;
    navigation: any;
    handleSelectCategory: (id: number, name: string) => void;
}

const SelectCategory = (props: SelectCategoryProps) => {
    const [hobbiesTeams, setHobbiesTeams] = useState([
        {
            id: 1,
            name: 'Piłka nożna',
            selected: false,
        },
        {
            id: 2,
            name: 'Koszykówka',
            selected: false,
        },
        {
            id: 3,
            name: 'Siatkówka',
            selected: false,
        },
        {
            id: 4,
            name: 'Piłka ręczna',
            selected: false,
        },
    ]);
    const [hobbiesIndividual, setHobbiesIndividual] = useState([
        {
            id: 5,
            name: 'Tennis',
            selected: false,
        },
        {
            id: 6,
            name: 'Siłownia',
            selected: false,
        },
        {
            id: 7,
            name: 'Squash',
            selected: false,
        },
    ]);
    const [hobbiesEsport, setHobbiesEsport] = useState([
        {
            id: 8,
            name: 'LoL',
            selected: false,
        },
        {
            id: 9,
            name: 'CS:GO',
            selected: false,
        },
    ]);
    const [hobbiesRest, setHobbiesRest] = useState([
        {
            id: 10,
            name: 'Jazda na motocyklu',
            selected: false,
        },
        {
            id: 11,
            name: 'Wędkarstwo',
            selected: false,
        },
    ]);

    return (
        <SafeAreaView testID="MainScreen" style={styles.container}>
            <TopHeader onClose={props?.onClose} title={'Wybierz Kategorię'} />

            {/* <Appbar style={styles.topBar}>
                <Appbar.Header style={styles.topBarBack}>
                    <Appbar.BackAction onPress={props?.onClose} />
                </Appbar.Header>
                <Appbar.Content title="Wybierz Kategorię" />
            </Appbar> */}
            {/* <Screen style={styles.wrapper} preset="scroll"> */}
            <View>
                <View style={styles.singleListContainer}>
                    <Text style={styles.hobbyText}>Sporty drużynowe</Text>

                    <View style={styles.chipContainer}>
                        {hobbiesTeams?.map((hobby, i) => {
                            return (
                                <Chip
                                    key={hobby?.id}
                                    mode="outlined"
                                    onPress={() =>
                                        props?.handleSelectCategory(
                                            hobby?.id,
                                            hobby?.name,
                                        )
                                    }
                                    style={styles.chip}>
                                    {hobby?.name}
                                </Chip>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.singleListContainer}>
                    <Text style={styles.hobbyText}>Sporty indywidualne</Text>

                    <View style={styles.chipContainer}>
                        {hobbiesIndividual?.map((hobby, i) => {
                            return (
                                <Chip
                                    key={hobby?.id}
                                    mode="outlined"
                                    onPress={() =>
                                        props?.handleSelectCategory(
                                            hobby?.id,
                                            hobby?.name,
                                        )
                                    }
                                    style={styles.chip}>
                                    {hobby?.name}
                                </Chip>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.singleListContainer}>
                    <Text style={styles.hobbyText}>E-sport</Text>

                    <View style={styles.chipContainer}>
                        {hobbiesEsport?.map((hobby, i) => {
                            return (
                                <Chip
                                    key={hobby?.id}
                                    mode="outlined"
                                    onPress={() =>
                                        props?.handleSelectCategory(
                                            hobby?.id,
                                            hobby?.name,
                                        )
                                    }
                                    style={styles.chip}>
                                    {hobby?.name}
                                </Chip>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.singleListContainer}>
                    <Text style={styles.hobbyText}>Pozostałe</Text>

                    <View style={styles.chipContainer}>
                        {hobbiesRest?.map((hobby, i) => {
                            return (
                                <Chip
                                    key={hobby?.id}
                                    mode="outlined"
                                    onPress={() =>
                                        props?.handleSelectCategory(
                                            hobby?.id,
                                            hobby?.name,
                                        )
                                    }
                                    style={styles.chip}>
                                    {hobby?.name}
                                </Chip>
                            );
                        })}
                    </View>
                </View>
            </View>
            {/* </Screen> */}
            {/* <Footer navigate={(path: any) => props?.navigation?.navigate(path)} route="main"/> */}
        </SafeAreaView>
    );
};

export default SelectCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height + 100,
    },
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20,
    },
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
    singleListContainer: {
        // marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    hobbyText: {
        color: '#000',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    chip: {
        marginRight: 5,
        marginBottom: 5,
    },
});
