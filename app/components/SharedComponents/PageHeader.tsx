import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './style';
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
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                    // width: '100%',
                    marginLeft: 40,
                }}>
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

export default PageHeader;
