import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import ButtonComponent from './../../../components/Utils/ButtonComponent';
import lang from './../../../lang/EditProfileInfo/utils/ChooseHobbiesScreen';
import {
    fontSizeBig,
    customOrangeColor,
    darkGrayColor,
} from './../../../assets/global/globalStyles';
import {useSelector} from 'react-redux';

const fillInfoBg: any = require('./../../../assets/images/fillInfoBgMin.jpg');
const gymOrange: any = require('./../../../assets/images/editProfile/gymOrange.png');
const walkOrange: any = require('./../../../assets/images/editProfile/walkOrange.png');
const ecoOrange: any = require('./../../../assets/images/editProfile/ecoOrange.png');
const airplaneOrange: any = require('./../../../assets/images/editProfile/airplaneOrange.png');
const bookOrange: any = require('./../../../assets/images/editProfile/bookOrange.png');
const cookingOrange: any = require('./../../../assets/images/editProfile/cookingOrange.png');
const tvOrange: any = require('./../../../assets/images/editProfile/tvOrange.png');
const vegetablesOrange: any = require('./../../../assets/images/editProfile/vegetablesOrange.png');
const ticketsOrange: any = require('./../../../assets/images/editProfile/ticketsOrange.png');
const spotlightsOrange: any = require('./../../../assets/images/editProfile/spotlightsOrange.png');
const musicOrange: any = require('./../../../assets/images/editProfile/musicOrange.png');
const dressOrange: any = require('./../../../assets/images/editProfile/dressOrange.png');
const danceOrange: any = require('./../../../assets/images/editProfile/danceOrange.png');
const moneyOrange: any = require('./../../../assets/images/editProfile/moneyOrange.png');
const palmOrange: any = require('./../../../assets/images/editProfile/palmOrange.png');
const paintOrange: any = require('./../../../assets/images/editProfile/paintOrange.png');
const networkOrange: any = require('./../../../assets/images/editProfile/networkOrange.png');
const cameraOrange: any = require('./../../../assets/images/editProfile/cameraOrange.png');

interface ChoosedHobbiesProps {
    hobbies: any;
    changeHobbyStatus: any;
    submitData: any;
    prevStep: any;
}

const ChooseHobbiesScreen = ({
    hobbies,
    changeHobbyStatus,
    submitData,
    prevStep,
}: ChoosedHobbiesProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <View style={styles.sectionContainer}>
            <ScrollView>
                <ImageBackground source={fillInfoBg} style={styles.fillImg}>
                    <Text style={styles.headerText}>
                        {lang.header[activeLanguage]}
                    </Text>
                </ImageBackground>
                <Text style={styles.fillInfoHeader}>
                    {lang.hobbyText[activeLanguage]}
                </Text>
                <View style={styles.hobbiesContainer}>
                    {hobbies &&
                        hobbies.map(
                            (
                                hobby: {
                                    keyId: number;
                                    active: boolean;
                                    name: string;
                                },
                                i: number,
                            ) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            changeHobbyStatus(hobby.keyId)
                                        }
                                        style={
                                            hobby.active
                                                ? styles.activeHobbyContainer
                                                : styles.hobbyContainer
                                        }
                                        key={`ChooseHobbiesScreen-${i}`}>
                                        {hobby.name === 'Sport' ? (
                                            <View>
                                                <Image
                                                    source={gymOrange}
                                                    resizeMode="contain"
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Spacery' ? (
                                            <View>
                                                <Image
                                                    source={walkOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Zero Waste' ? (
                                            <View>
                                                <Image
                                                    source={ecoOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Podróże' ? (
                                            <View>
                                                <Image
                                                    source={airplaneOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Czytanie' ? (
                                            <View>
                                                <Image
                                                    source={bookOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Gotowanie' ? (
                                            <View>
                                                <Image
                                                    source={cookingOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Seriale' ? (
                                            <View>
                                                <Image
                                                    source={tvOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Odżywianie' ? (
                                            <View>
                                                <Image
                                                    source={vegetablesOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Kino' ? (
                                            <View>
                                                <Image
                                                    source={ticketsOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Teatr' ? (
                                            <View>
                                                <Image
                                                    source={spotlightsOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Muzyka' ? (
                                            <View>
                                                <Image
                                                    source={musicOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Moda' ? (
                                            <View>
                                                <Image
                                                    source={dressOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Taniec' ? (
                                            <View>
                                                <Image
                                                    source={danceOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Biznes' ? (
                                            <View>
                                                <Image
                                                    source={moneyOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Zwierzęta' ? (
                                            <View>
                                                <Image
                                                    source={palmOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Sztuka' ? (
                                            <View>
                                                <Image
                                                    source={paintOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Social Media' ? (
                                            <View>
                                                <Image
                                                    source={networkOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : hobby.name === 'Fotografia' ? (
                                            <View>
                                                <Image
                                                    source={cameraOrange}
                                                    style={
                                                        styles.hobbyOptionImage
                                                    }
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={
                                                        styles.hobbyOptionText
                                                    }>
                                                    {hobby.name}
                                                </Text>
                                            </View>
                                        ) : (
                                            <View>
                                                <Text>{hobby.name}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            },
                        )}
                </View>
            </ScrollView>

            <View style={styles.sectionBtnBackContainer}>
                <View style={{width: '30%'}}>
                    <ButtonComponent
                        pressButtonComponent={prevStep}
                        buttonComponentText={lang.back[activeLanguage]}
                        fullWidth={false}
                        underlayColor="#dd904d"
                        whiteBg={true}
                        showBackIcon={true}
                    />
                </View>
                <View style={{width: '71%'}}>
                    <ButtonComponent
                        pressButtonComponent={submitData}
                        buttonComponentText={lang.save[activeLanguage]}
                        fullWidth={true}
                        underlayColor="#dd904d"
                        whiteBg={false}
                        showBackIcon={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fillImg: {
        width: '100%',
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    sectionBtnBackContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginLeft: 7,
        marginRight: 7,
    },
    sectionBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    headerText: {
        textAlign: 'left',
        color: '#fff',
        fontWeight: '800',
        fontSize: fontSizeBig,
        paddingBottom: 30,
        paddingTop: 30,
        paddingLeft: 20,
        //fontFamily: "Open Sans"
    },
    headerTwoText: {
        textAlign: 'center',
        color: darkGrayColor,
        fontWeight: '600',
        fontSize: 16,
        paddingBottom: 10,
        paddingTop: 35,
        //fontFamily: "Open Sans"
    },
    fillInfoHeader: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center',
        //fontFamily: "Open Sans"
    },
    hobbiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    hobbyContainer: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
        borderWidth: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderColor: '#8c8c8c',
        borderRadius: 6,
    },
    activeHobbyContainer: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
        borderWidth: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderColor: customOrangeColor,
        borderRadius: 6,
    },
    infoContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    hobbyOptionText: {
        width: '100%',
    },
    hobbyOptionImage: {
        width: 40,
        height: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
    },
});

export default ChooseHobbiesScreen;
