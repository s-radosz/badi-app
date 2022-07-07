import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Linking,
    Image,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import BottomPanel from './../../../components/SharedComponents/BottomPanel';
import lang from './../../../lang/Profile/utils/About';
import TopHeader from './../../../components/Utils/TopHeader';
import {useSelector} from 'react-redux';

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
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="ProfileContainer">
                    <ScrollView>
                        <TopHeader
                            onClose={() => {}}
                            title={lang.aboutApp['pl']}
                        />

                        <View style={styles.aboutContainer}>
                            <View>
                                <Text style={styles.appName}>
                                    {lang.appName['pl']}
                                </Text>
                                <Text style={styles.appDesc}>
                                    {lang.appDesc['pl']}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={styles.feedback}
                                    onPress={() =>
                                        navigation.navigate('FeedbackModal', {})
                                    }>
                                    {lang.haveQuestion['pl']}{' '}
                                    <Text style={styles.writeToUs}>
                                        {lang.writeToUs['pl']}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.websiteContainer}>
                                <Text style={styles.visitWebsite}>
                                    {lang.visitWebsite['pl']}
                                </Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        Linking.openURL('https://juff-app.pl/');
                                    }}
                                    underlayColor={'#fff'}>
                                    <Text style={styles.websiteAddress}>
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
                                    <Text style={styles.voteApp}>
                                        {lang.voteApp['pl']}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <Text>{lang.socialText['pl']}</Text>
                                <View style={styles.socialContainer}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            Linking.openURL(
                                                'https://www.facebook.com',
                                            );
                                        }}
                                        underlayColor={'#fff'}>
                                        <Image
                                            style={styles.socialImg}
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
                                            style={styles.socialImg}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    aboutContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },
    appName: {
        fontWeight: '600',
        //fontFamily: "Open Sans",
        fontSize: 16,
        marginBottom: 5,
    },
    appDesc: {
        //fontFamily: "Open Sans",
        fontSize: 14,
        marginBottom: 30,
    },
    feedback: {
        //fontFamily: "Open Sans",
        fontSize: 14,
        marginBottom: 30,
    },
    writeToUs: {
        fontWeight: '600',
        color: '#000',
    },
    websiteContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    visitWebsite: {
        //fontFamily: "Open Sans",
        fontSize: 14,
    },
    websiteAddress: {
        //fontFamily: "Open Sans",
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    voteApp: {
        paddingTop: 30,
        paddingBottom: 30,
        //fontFamily: "Open Sans",
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    socialContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    socialImg: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
});

export default About;
