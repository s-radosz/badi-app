import React from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
} from 'react-native';
import ButtonComponent from './../../../components/Utils/ButtonComponent';
import lang from './../../../lang/EditProfileInfo/utils/PhotoScreen';
import {
    darkGrayColor,
    fontSizeBig,
} from './../../../assets/global/globalStyles';
import {useSelector} from 'react-redux';
const fillInfoBg: any = require('./../../../assets/images/fillInfoBgMin.jpg');

interface PhotoProps {
    photo: any;
    handleChoosePhoto: any;
    nextStep: any;
    prevStep: any;
    userSavedPhoto: string;
    API_URL: string;
}

const PhotoScreen = ({
    photo,
    handleChoosePhoto,
    nextStep,
    prevStep,
    userSavedPhoto,
    API_URL,
}: PhotoProps) => {
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
                    {lang.photoText[activeLanguage]}
                </Text>

                {photo ? (
                    <Image source={{uri: photo.path}} style={styles.image} />
                ) : null}

                {userSavedPhoto && API_URL && !photo ? (
                    <Image
                        source={{uri: `${userSavedPhoto}`}}
                        style={styles.image}
                    />
                ) : null}

                <View style={{marginTop: 10}}>
                    <ButtonComponent
                        pressButtonComponent={handleChoosePhoto}
                        buttonComponentText={lang.choose[activeLanguage]}
                        fullWidth={true}
                        underlayColor="#dd904d"
                        whiteBg={false}
                        showBackIcon={false}
                    />
                </View>
            </ScrollView>

            <View style={styles.sectionBtnBackContainer}>
                <View style={styles.backBtn}>
                    <ButtonComponent
                        pressButtonComponent={prevStep}
                        buttonComponentText={lang.back[activeLanguage]}
                        fullWidth={false}
                        underlayColor="#dd904d"
                        whiteBg={true}
                        showBackIcon={true}
                    />
                </View>
                <View style={styles.nextBtn}>
                    {photo || userSavedPhoto ? (
                        <ButtonComponent
                            pressButtonComponent={nextStep}
                            buttonComponentText={lang.next[activeLanguage]}
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                        />
                    ) : null}
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
    image: {
        width: 200,
        height: 200,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    backBtn: {
        width: '30%',
    },
    nextBtn: {
        width: '71%',
    },
});

export default PhotoScreen;
