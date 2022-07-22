import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import TopHeader from './../../../components/Utils/TopHeader';
import lang from './../../../lang/Start/SelectCategory/SelectCategory';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {setActiveCategory} from './../../../store/categories/actions';

interface SelectCategoryProps {
    onClose: () => void;
    navigation: any;
    handleSelectCategory: (id: number, name: string) => void;
}

const SelectCategory = (props: SelectCategoryProps) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const categories = useSelector(
        (state: any) => state?.Categories?.categoryGroups,
    );

    // const [hobbiesTeams, setHobbiesTeams] = useState(
    //     activeLanguage === 'pl'
    //         ? [
    //               {
    //                   id: 1,
    //                   name: 'Piłka nożna',
    //                   selected: false,
    //               },
    //               {
    //                   id: 2,
    //                   name: 'Koszykówka',
    //                   selected: false,
    //               },
    //               {
    //                   id: 3,
    //                   name: 'Siatkówka',
    //                   selected: false,
    //               },
    //               {
    //                   id: 4,
    //                   name: 'Piłka ręczna',
    //                   selected: false,
    //               },
    //           ]
    //         : [
    //               {
    //                   id: 1,
    //                   name: 'Football',
    //                   selected: false,
    //               },
    //               {
    //                   id: 2,
    //                   name: 'Basketball',
    //                   selected: false,
    //               },
    //               {
    //                   id: 3,
    //                   name: 'Volleyball',
    //                   selected: false,
    //               },
    //           ],
    // );
    // const [hobbiesIndividual, setHobbiesIndividual] = useState(
    //     activeLanguage === 'pl'
    //         ? [
    //               {
    //                   id: 5,
    //                   name: 'Tennis',
    //                   selected: false,
    //               },
    //               {
    //                   id: 6,
    //                   name: 'Siłownia',
    //                   selected: false,
    //               },
    //               {
    //                   id: 7,
    //                   name: 'Squash',
    //                   selected: false,
    //               },
    //           ]
    //         : [
    //               {
    //                   id: 5,
    //                   name: 'Tennis',
    //                   selected: false,
    //               },
    //               {
    //                   id: 6,
    //                   name: 'Gym',
    //                   selected: false,
    //               },
    //               {
    //                   id: 7,
    //                   name: 'Squash',
    //                   selected: false,
    //               },
    //           ],
    // );
    // const [hobbiesEsport, setHobbiesEsport] = useState([
    //     {
    //         id: 8,
    //         name: 'LoL',
    //         selected: false,
    //     },
    //     {
    //         id: 9,
    //         name: 'CS:GO',
    //         selected: false,
    //     },
    // ]);
    // const [hobbiesRest, setHobbiesRest] = useState(
    //     activeLanguage === 'pl'
    //         ? [
    //               {
    //                   id: 10,
    //                   name: 'Jazda na motocyklu',
    //                   selected: false,
    //               },
    //               {
    //                   id: 11,
    //                   name: 'Wędkarstwo',
    //                   selected: false,
    //               },
    //           ]
    //         : [
    //               {
    //                   id: 10,
    //                   name: 'Motocycles',
    //                   selected: false,
    //               },
    //           ],
    // );

    const renderItem = ({item}) => {
        console.log(['item', item]);
        return (
            <>
                <Text style={styles.hobbyText}>{item?.name}</Text>
                <View style={styles.chipContainer}>
                    {item?.categories?.length &&
                        item?.categories?.map((category, i) => {
                            return (
                                <Chip
                                    key={category?.id}
                                    mode="outlined"
                                    onPress={() => {
                                        dispatch(
                                            setActiveCategory({
                                                id: category?.id,
                                                name: category?.name,
                                            }),
                                        );
                                        props?.handleSelectCategory(
                                            category?.id,
                                            category?.name,
                                        );
                                    }}
                                    style={styles.chip}>
                                    {category?.name}
                                </Chip>
                            );
                        })}
                </View>
            </>
        );
    };

    return (
        <SafeAreaView testID="MainScreen" style={styles.container}>
            <TopHeader
                onClose={props?.onClose}
                title={lang.title[activeLanguage]}
            />

            <View>
                <View style={styles.singleListContainer}>
                    <FlatList renderItem={renderItem} data={categories} />
                </View>
            </View>
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
