import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';
import lang from './../../assets/lang/Auth/ConfirmAccount';
import {
    customOrangeColor,
    fontSizeBig,
} from './../../assets/global/globalStyles';

interface IConfirmAccountProps {
    navigation: any;
}

const ConfirmAccount = ({navigation}: IConfirmAccountProps) => {
    return (
        <React.Fragment>
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>{lang.header['pl']}</Text>

                    <Text style={styles.descriptionText}>
                        {lang.description['pl']}
                    </Text>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Login')}
                        underlayColor={'#fff'}>
                        <Text style={styles.registerBtn}>
                            {lang.login['pl']}
                        </Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

interface Style {
    container: ViewStyle;
    headerText: TextStyle;
    registerBtn: TextStyle;
    areaContainer: ViewStyle;
    descriptionText: TextStyle;
}

const styles = StyleSheet.create<Style>({
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: '600',
        fontSize: fontSizeBig,
        marginTop: 70,
        paddingBottom: 50,
        //fontFamily: "Open Sans"
    },
    descriptionText: {marginBottom: 40},
    registerBtn: {
        color: customOrangeColor,
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
});

export default ConfirmAccount;
