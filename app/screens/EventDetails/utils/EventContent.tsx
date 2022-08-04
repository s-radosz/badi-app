import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {customOrangeColor} from './../../../assets/global/globalStyles';

const calendar: any = require('./../../../assets/images/calendar.png');
const group: any = require('./../../../assets/images/group.png');

interface EventContentProps {
    categoryName: string;
    title: string;
    description: string;
    date: string;
    membersLimit: number | string;
}

const EventContent = ({
    categoryName,
    title,
    description,
    date,
    membersLimit,
}: EventContentProps) => {
    return (
        <>
            <Text style={styles.listItemCategory}>{categoryName}</Text>
            <View style={styles.listItemSeparator}></View>
            <Text style={styles.listItemTitle}>{title}</Text>
            <Text style={styles.listItemDescription}>{description}</Text>
            <View style={styles.listItemBottom}>
                <View style={styles.listItemBottomElement}>
                    <Image
                        style={styles.listItemImg}
                        source={calendar}
                        resizeMode="contain"
                    />
                    <Text style={styles.listItemDate}>{date}</Text>
                </View>
                <View style={styles.listItemBottomElement}>
                    <Image
                        style={styles.listItemImg}
                        source={group}
                        resizeMode="contain"
                    />
                    <Text style={styles.listItemMembers}>{membersLimit}</Text>
                </View>
            </View>
        </>
    );
};

export default EventContent;

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
    },
    listItemContainer: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    listItemSeparator: {
        width: 50,
        height: 3,
        backgroundColor: customOrangeColor,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 20,
    },
    listItemCategory: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    listItemImg: {
        width: 20,
        marginRight: 10,
    },
    listItemBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemBottomElement: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        marginTop: 20,
        paddingRight: 30,
    },
    listItemTitle: {
        fontSize: 15,
    },
    listItemDescription: {
        fontSize: 13,
    },
    listItemDate: {
        fontSize: 14,
    },
    listItemMembers: {
        fontSize: 14,
    },
});
