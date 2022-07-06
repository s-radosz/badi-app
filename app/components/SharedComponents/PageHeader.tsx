import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
const backIcon: any = require('./../../assets/images/backIcon.png');

type IPageHeader = {
    boldText: string;
    normalText?: string;
    closeMethod?: any;
    closeMethodParameter?: any;
};

const PageHeader = ({
    boldText,
    normalText,
    closeMethod,
    closeMethodParameter,
}: IPageHeader) => {
    return (
        <View style={styles.pageHeaderContainer}>
            {closeMethod ? (
                <TouchableOpacity
                    onPress={() => closeMethod(closeMethodParameter)}
                    style={styles.buttonCloseModal}>
                    <Image source={backIcon} style={styles.pageHeaderImage} />
                </TouchableOpacity>
            ) : null}
            <View style={styles.container}>
                <Text style={styles.filterModalHeaderTextContainer}>
                    <Text style={styles.filterModalHeaderTextBold}>
                        {boldText}
                    </Text>
                    {normalText ? normalText : ''}
                </Text>
            </View>
            <View style={styles.pageHeaderImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        // width: '100%',
        marginLeft: 40,
    },
    pageHeaderContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        // backgroundColor: 'red',
    },
    pageHeaderImage: {width: 40, height: 40},
    buttonCloseModal: {
        //width: "20%"
    },
    filterModalHeaderTextContainer: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    filterModalHeaderTextBold: {
        fontWeight: '600',
        color: '#424242',
        //fontFamily: "Open Sans"
    },
});

export default PageHeader;
