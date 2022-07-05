import React, {useContext} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Linking,
    Image,
    SafeAreaView,
} from 'react-native';
import Alert from './../../Alert/Alert';
import BottomPanel from './../../SharedComponents/BottomPanel';
import PageHeader from './../../SharedComponents/PageHeader';
import lang from './../../../assets/lang/Profile/utils/About';

import TopHeader from './../../Utils/TopHeader';

import {useDispatch, useSelector} from 'react-redux';

const fb: any = require('./../../../assets/images/fb.png');
const ig: any = require('./../../../assets/images/ig.png');

interface IAboutProps {
    navigation: any;
}

const About = ({navigation}: IAboutProps) => {
    const userData = useSelector((state: any) => state?.User?.details);

    //console.log(["about", context.userData]);

    return (
        <React.Fragment>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    data-test="ProfileContainer">
                    <ScrollView>
                        <TopHeader
                            onClose={() => {}}
                            title={lang.aboutApp['pl']}
                        />

                        <View
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingBottom: 20,
                                paddingTop: 20,
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontWeight: '600',
                                        //fontFamily: "Open Sans",
                                        fontSize: 16,
                                        marginBottom: 5,
                                    }}>
                                    {lang.appName['pl']}
                                </Text>
                                <Text
                                    style={{
                                        //fontFamily: "Open Sans",
                                        fontSize: 14,
                                        marginBottom: 30,
                                    }}>
                                    {lang.appDesc['pl']}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        //fontFamily: "Open Sans",
                                        fontSize: 14,
                                        marginBottom: 30,
                                    }}
                                    onPress={() =>
                                        navigation.navigate('FeedbackModal', {})
                                    }>
                                    {lang.haveQuestion['pl']}{' '}
                                    <Text
                                        style={{
                                            fontWeight: '600',
                                            color: '#000',
                                        }}>
                                        {lang.writeToUs['pl']}
                                    </Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    style={{
                                        //fontFamily: "Open Sans",
                                        fontSize: 14,
                                    }}>
                                    {lang.visitWebsite['pl']}
                                </Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        Linking.openURL('https://juff-app.pl/');
                                    }}
                                    underlayColor={'#fff'}>
                                    <Text
                                        style={{
                                            //fontFamily: "Open Sans",
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#000',
                                        }}>
                                        {lang.websiteAddress['pl']}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => {
                                        userData.platform &&
                                        userData.platform === 'android'
                                            ? Linking.openURL(
                                                  'https://play.google.com/store/apps',
                                              )
                                            : userData.platform &&
                                              userData.platform === 'ios' &&
                                              Linking.openURL(
                                                  'https://apps.apple.com/il/app',
                                              );
                                    }}
                                    underlayColor={'#fff'}>
                                    <Text
                                        style={{
                                            paddingTop: 30,
                                            paddingBottom: 30,
                                            //fontFamily: "Open Sans",
                                            fontSize: 14,
                                            fontWeight: '600',
                                            color: '#000',
                                        }}>
                                        {lang.voteApp['pl']}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <Text>{lang.socialText['pl']}</Text>
                                <View
                                    style={{
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            Linking.openURL(
                                                'https://www.facebook.com',
                                            );
                                        }}
                                        underlayColor={'#fff'}>
                                        <Image
                                            style={{
                                                width: 40,
                                                height: 40,
                                                marginRight: 5,
                                            }}
                                            source={fb}
                                        />
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={() => {
                                            Linking.openURL(
                                                'https://www.instagram.com',
                                            );
                                        }}
                                        underlayColor={'#fff'}>
                                        <Image
                                            style={{
                                                width: 40,
                                                height: 40,
                                                marginLeft: 5,
                                            }}
                                            source={ig}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <BottomPanel
                        data-test="BottomPanel"
                        navigation={navigation}
                    />
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};
export default About;
