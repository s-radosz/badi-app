import React from 'react';
import {Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {customOrangeColor} from './../../assets/global/globalStyles';
const backArrow: any = require('./../../assets/images/backArrow.png');

interface ButtonComponentProps {
    pressButtonComponent: () => void;
    buttonComponentText: string;
    fullWidth: boolean;
    underlayColor: string;
    whiteBg: boolean;
    showBackIcon: boolean;
    additionalStyle?: any;
}

const ButtonComponent = ({
    pressButtonComponent,
    buttonComponentText,
    fullWidth,
    underlayColor,
    whiteBg,
    showBackIcon,
    additionalStyle,
}: ButtonComponentProps) => {
    return (
        <TouchableHighlight
            style={
                additionalStyle
                    ? [additionalStyle, styles.buttonComponent]
                    : fullWidth
                    ? styles.buttonComponentFullWidth
                    : whiteBg
                    ? styles.buttonComponentFullWidthWhite
                    : [
                          styles.buttonComponent,
                          {
                              height: 45,
                              width: 180,
                              marginTop: 20,
                              marginBottom: 15,
                          },
                      ]
            }
            onPress={pressButtonComponent}
            underlayColor={underlayColor}>
            {showBackIcon ? (
                <Image
                    source={backArrow}
                    style={{width: 20}}
                    resizeMode="contain"
                />
            ) : (
                <Text
                    style={[
                        whiteBg ? styles.whiteBtnText : styles.peachBtnText,
                        {fontWeight: 'bold', lineHeight: 40},
                    ]}>
                    {buttonComponentText}
                </Text>
            )}
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    buttonComponentFullWidth: {
        height: 45,
        width: '94%',
        marginTop: 15,
        marginBottom: 0,
        marginLeft: '3%',
        marginRight: '3%',
        borderRadius: 6,
        borderColor: customOrangeColor,
        borderWidth: 2,
        backgroundColor: customOrangeColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonComponentFullWidthWhite: {
        height: 45,
        width: '94%',
        marginTop: 15,
        marginBottom: 0,
        marginLeft: '3%',
        marginRight: '3%',
        borderRadius: 6,
        borderColor: customOrangeColor,
        borderWidth: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonComponent: {
        borderRadius: 6,
        borderColor: customOrangeColor,
        borderWidth: 2,
        backgroundColor: customOrangeColor,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    peachBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
    whiteBtnText: {
        color: customOrangeColor,
        textAlign: 'center',
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
});

export default ButtonComponent;
