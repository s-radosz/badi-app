import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    SafeAreaView,
    StyleSheet,
    TextStyle,
    ViewStyle,
    Dimensions,
} from 'react-native';
//@ts-ignore
import AppIntroSlider from 'react-native-app-intro-slider';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import Languages from './../../components/Languages/Languages';
import {
    customOrangeColor,
    fontSizeBig,
    peachBtnText,
} from '../../assets/global/globalStyles';
import lang from './../../lang/Welcome/Welcome';
import {useSelector} from 'react-redux';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const logo: any = require('./../../assets/images/logo-sq.png');
const friends: any = require('./../../assets/images/friends.png');
const support: any = require('./../../assets/images/support.png');
const like: any = require('./../../assets/images/like.png');

interface WelcomeProps {
    navigation: any;
}

const Welcome = ({navigation}: WelcomeProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const slides = [
        {
            key: 'slide1',
            title: 'slide1',
            text: lang.firstSlide[activeLanguage],
            image: logo,
        },
        {
            key: 'slide2',
            title: 'slide1',
            text: lang.secondSlide[activeLanguage],
            image: friends,
        },
        {
            key: 'slide3',
            title: 'slide1',
            text: lang.thirdSlide[activeLanguage],
            image: support,
        },
    ];

    const welcomeSliderRenderItem = ({item}: any) => {
        return (
            <View style={styles.welcomeSlide}>
                <Image
                    // @ts-ignore
                    style={styles.sliderImg}
                    resizeMode="contain"
                    source={item.image}
                />
                <Text style={styles.welcomeSlideText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.areaContainer}>
            <View style={styles.container}>
                <Languages />

                <View>
                    <View style={{height: 400}}>
                        <AppIntroSlider
                            renderItem={welcomeSliderRenderItem}
                            data={slides}
                            activeDotStyle={styles.activeWelcomeSlideRect}
                            dotStyle={styles.inActiveWelcomeSlideRect}
                            // paginationStyle={styles.welcomeSliderPagination}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <ButtonComponent
                            pressButtonComponent={() =>
                                navigation.navigate('Login')
                            }
                            buttonComponentText={lang.login[activeLanguage]}
                            fullWidth={false}
                            underlayColor="#000"
                            whiteBg={false}
                            showBackIcon={false}
                        />
                        <TouchableHighlight
                            style={styles.registerBtn}
                            onPress={() => navigation.navigate('Register')}
                            underlayColor={'#fff'}>
                            <Text style={styles.subBtn}>
                                {lang.register[activeLanguage]}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

interface Style {
    container: ViewStyle;
    logo: TextStyle;
    registerBtn: TextStyle;
    fullWidth: any;
    welcomeSlide: ViewStyle;
    welcomeSlideText: TextStyle;
    activeWelcomeSlideRect: ViewStyle;
    inActiveWelcomeSlideRect: ViewStyle;
    welcomeSliderPagination: ViewStyle;
    subBtn: TextStyle;
    peachBtnText: any;
    sliderImg: ViewStyle;
    areaContainer: ViewStyle;
    btnContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    welcomeSliderPagination: {
        marginTop: 30,
        marginBottom: 30,
    },
    activeWelcomeSlideRect: {
        backgroundColor: customOrangeColor,
        width: 35,
        marginTop: 100,
    },
    inActiveWelcomeSlideRect: {
        backgroundColor: '#e5e5e5',
        width: 15,
        marginTop: 100,
    },
    welcomeSlide: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: fullHeight / 1.8,
    },
    welcomeSlideText: {
        fontSize: 22,
        color: '#424242',
        textAlign: 'center',
        fontWeight: '300',
        //fontFamily: "Open Sans",
        marginBottom: 80,
        width: '70%',
    },
    fullWidth: fullWidth,
    logo: {
        textAlign: 'center',
        color: '#333',
        fontWeight: '800',
        fontSize: fontSizeBig,
        paddingBottom: 10,
    },
    subBtn: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
    peachBtnText: peachBtnText,
    registerBtn: {marginBottom: 50},
    sliderImg: {maxWidth: 120},
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
});

export default Welcome;
