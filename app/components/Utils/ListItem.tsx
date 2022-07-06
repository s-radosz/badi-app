import React from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {fontSizeSmall, darkGrayColor} from './../../assets/global/globalStyles';

const ListItem = (props: {
    onPress: () => void;
    API_URL: string;
    image: string;
    mainText: string;
    subText: string;
    subSubText: string;
    key: string;
    userHadUnreadedMessages: boolean;
}) => {
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor={'#fff'}>
            <View style={styles.listItemContainer}>
                <View
                    style={
                        props.userHadUnreadedMessages
                            ? styles.listItemSingleContainerActive
                            : styles.listItemSingleContainer
                    }>
                    <Image
                        style={styles.listItemImage}
                        source={{
                            uri: `${props.image}`,
                        }}
                    />
                    <View style={styles.listItemTextContainer}>
                        <View>
                            <Text style={styles.listItemMainText}>
                                {props.mainText}
                            </Text>
                            <View>
                                <Text style={styles.listItemSubText}>
                                    {props.subText}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.listItemSubText}>
                                    {props.subSubText}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    listItemContainer: {
        width: '94%',
        marginLeft: '3%',
        marginRight: '3%',
        marginBottom: 10,
    },
    listItemSingleContainer: {
        width: '100%',
        borderWidth: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 6,
        borderColor: '#424242',
        paddingLeft: 10,
        paddingRight: 10,
        overflow: 'hidden',
    },
    listItemSingleContainerActive: {
        width: '100%',
        borderWidth: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 6,
        borderColor: '#424242',
        backgroundColor: '#ffeee0',
        paddingLeft: 10,
        paddingRight: 10,
        overflow: 'hidden',
    },
    listItemImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 25,
        overflow: 'hidden',
    },
    listItemTextContainer: {
        paddingLeft: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
    },
    listItemMainText: {
        fontSize: fontSizeSmall,
        textAlign: 'left',
        color: darkGrayColor,
        fontWeight: '400',
        //fontFamily: "Open Sans"
    },
    listItemSubText: {
        fontSize: 10,
        //fontFamily: "Open Sans"
    },
});

export default ListItem;
