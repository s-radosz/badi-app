import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import TopHeader from './../../../components/Utils/TopHeader';
import lang from './../../../lang/Start/SelectCategory/SelectCategory';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {setActiveCategory} from './../../../store/categories/actions';
import {customOrangeColor} from './../../../assets/global/globalStyles';

interface SelectCategoryProps {
    onClose: () => void;
    navigation: any;
    handleSelectCategory: (id: number, name: string) => void;
}

const SelectCategory = ({
    onClose,
    navigation,
    handleSelectCategory,
}: SelectCategoryProps) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );
    const categories = useSelector(
        (state: any) => state?.Categories?.categoryGroups,
    );
    const activeCategory = useSelector(
        (state: any) => state?.Categories?.activeCategory,
    );

    const handleClickCategoryTile = (category: {name: string; id: number}) => {
        if (activeCategory?.name === category?.name) {
            dispatch(
                setActiveCategory({
                    id: null,
                    name: null,
                }),
            );
            handleSelectCategory(null, null);
        } else {
            dispatch(
                setActiveCategory({
                    id: category?.id,
                    name: category?.name,
                }),
            );
            handleSelectCategory(category?.id, category?.name);
        }
    };

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
                                    onPress={() =>
                                        handleClickCategoryTile(category)
                                    }
                                    style={[
                                        styles.chip,
                                        activeCategory?.name === category?.name
                                            ? {borderColor: customOrangeColor}
                                            : null,
                                    ]}>
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
            <TopHeader onClose={onClose} title={lang.title[activeLanguage]} />

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
        backgroundColor: '#fff',
    },
    topBarBack: {
        backgroundColor: '#fff',
        elevation: 0,
    },
    singleListContainer: {
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
        borderWidth: 2,
    },
});
