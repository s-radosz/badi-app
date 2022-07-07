import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ButtonComponent from './../../../components/Utils/ButtonComponent';
import lang from './../../../lang/EditProfileInfo/utils/CoordsScreen';
import {fontSizeBig} from './../../../assets/global/globalStyles';
const fillInfoBg: any = require('./../../../assets/images/fillInfoBgMin.jpg');

const mapStyle = [
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
];

interface CoordsProps {
    onRegionChange: any;
    region: any;
    nextStep: any;
    prevStep: any;
}
const CoordsScreen = ({
    onRegionChange,
    region,
    nextStep,
    prevStep,
}: CoordsProps) => {
    return (
        <View style={styles.sectionContainer}>
            <ScrollView>
                <ImageBackground source={fillInfoBg} style={styles.fillImg}>
                    <Text style={styles.headerText}>{lang.header['pl']}</Text>
                </ImageBackground>

                <Text style={styles.fillInfoHeader}>
                    {lang.cordsText['pl']}
                </Text>

                <MapView
                    customMapStyle={mapStyle}
                    style={styles.map}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    onRegionChange={onRegionChange}
                    initialRegion={region}>
                    <Marker coordinate={region} />
                </MapView>
            </ScrollView>

            <View style={styles.sectionBtnBackContainer}>
                <View style={styles.backBtn}>
                    <ButtonComponent
                        pressButtonComponent={prevStep}
                        buttonComponentText={lang.back['pl']}
                        fullWidth={false}
                        underlayColor="#dd904d"
                        whiteBg={true}
                        showBackIcon={true}
                    />
                </View>
                <View style={styles.nextBtn}>
                    <ButtonComponent
                        pressButtonComponent={nextStep}
                        buttonComponentText={lang.next['pl']}
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
    map: {
        width: '100%',
        height: Dimensions.get('window').height - 260,
        marginTop: 15,
    },
    backBtn: {
        width: '30%',
    },
    nextBtn: {
        width: '71%',
    },
});

export default CoordsScreen;
