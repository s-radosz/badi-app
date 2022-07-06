import React from 'react';
import {Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import lang from './../../../assets/lang/Profile/utils/ProfileOptions';

const woman: any = require('./../../../assets/images/woman.png');
const edit: any = require('./../../../assets/images/edit.png');
const highFive: any = require('./../../../assets/images/highFive.png');
const strollerOrange: any = require('./../../../assets/images/strollerOrange.png');
const bell: any = require('./../../../assets/images/bell.png');
const info: any = require('./../../../assets/images/info.png');

const ProfileOptions = (props: any) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.buttonOption}
                onPress={() =>
                    props.navigation &&
                    props.navigation.navigate('LoggedInUserDetails', {})
                }
                underlayColor={'#fff'}>
                <View>
                    <Image style={styles.img} source={woman} />
                    <Text style={styles.optionText}>{lang.preview['pl']}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.buttonOption}
                onPress={() => {
                    {
                        props.navigation &&
                            props.navigation.navigate('FillNecessaryInfo');
                    }
                }}
                underlayColor={'#fff'}>
                <View>
                    <Image style={styles.img} source={edit} />
                    <Text style={styles.optionText}>{lang.editData['pl']}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.buttonOption}
                onPress={() => props.navigation.navigate('UserFriendsList', {})}
                underlayColor={'#fff'}>
                <View>
                    <Image style={styles.img} source={highFive} />
                    <Text style={styles.optionText}>
                        {lang.myFriends['pl']}
                    </Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.buttonOption}
                onPress={() =>
                    props.navigation.navigate('UserNotificationList', {})
                }
                underlayColor={'#fff'}>
                <View>
                    <Image style={styles.img} source={bell} />
                    <Text style={styles.optionText}>
                        {lang.notifications['pl']}
                    </Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.buttonOption}
                onPress={() => props.navigation.navigate('About', {})}
                underlayColor={'#fff'}>
                <View>
                    <Image style={styles.img} source={info} />
                    <Text style={styles.optionText}>
                        {lang.aboutTheApp['pl']}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
    },
    img: {
        width: 45,
        height: 45,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
    },
    buttonOption: {
        width: '48%',
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 0,
        borderRadius: 6,
        borderColor: '#8c8c8c',
        borderWidth: 2,
    },
    optionText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 16,
        color: '#424242',
        //fontFamily: "Open Sans"
    },
});

export default ProfileOptions;
