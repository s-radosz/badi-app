import React from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {customOrangeColor} from './../../assets/global/globalStyles';
const trash: any = require('./../../assets/images/trash.png');

const ListItemDelete = (props: {
    key: string;
    text: string;
    onPress: () => void;
}) => {
    return (
        <View key={props.key} style={styles.removeFilterBtnContainer}>
            <Text style={styles.removeFilterText}>{props.text}</Text>
            <TouchableHighlight
                style={styles.removeFilterBtn}
                onPress={props.onPress}
                underlayColor={'#dd904d'}>
                <Image source={trash} style={styles.img} />
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
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
    img: {
        width: 20,
        height: 20,
    },
});

export default ListItemDelete;
