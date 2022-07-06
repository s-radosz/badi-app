import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import ButtonComponent from './../../Utils/ButtonComponent';
import InputComponent from './../../Utils/InputComponent';
import TextAreaComponent from './../../Utils/TextAreaComponent';
import lang from './../../../assets/lang/EditProfileInfo/utils/AgeDescScreen';
import TopHeader from './../../Utils/TopHeader';
import {darkGrayColor} from './../../../assets/global/globalStyles';

const fillInfoBg: any = require('./../../../assets/images/fillInfoBgMin.jpg');

const AgeDescScreen = (props: {
    handleChange: any;
    age: any;
    nickname: string;
    desc: string;
    nextStep: any;
}): any => {
    return (
        <View style={styles.sectionContainer}>
            <ScrollView>
                <TopHeader onClose={() => {}} title={lang.header['pl']} />

                <View style={styles.infoContainer}>
                    <Text style={styles.fillInfoHeader}>
                        {lang.fillBasicInfo['pl']}
                    </Text>

                    <Text style={styles.subText}>
                        {lang.nick['pl']} ({props.nickname.length}/20{' '}
                        {lang.chars['pl']}) *
                    </Text>

                    <InputComponent
                        placeholder={lang.nick['pl']}
                        inputOnChange={(nickname: string) =>
                            props.handleChange('nickname', nickname)
                        }
                        value={props.nickname}
                        secureTextEntry={false}
                        maxLength={20}
                    />

                    <Text style={styles.subText}>{lang.age['pl']} *</Text>

                    <InputComponent
                        placeholder={lang.age['pl']}
                        inputOnChange={(age: string) =>
                            props.handleChange('age', age)
                        }
                        value={props.age !== 0 ? String(props.age) : ''}
                        secureTextEntry={false}
                        maxLength={2}
                    />

                    <Text style={styles.subText}>
                        {lang.description['pl']} ({props.desc.length}/250{' '}
                        {lang.chars['pl']})
                    </Text>

                    <TextAreaComponent
                        placeholder={lang.description['pl']}
                        inputOnChange={(desc: string) =>
                            props.handleChange('desc', desc)
                        }
                        value={props.desc}
                        maxLength={250}
                        multiline={true}
                        numberOfLines={10}
                    />
                </View>
            </ScrollView>

            <View style={styles.sectionBtnContainer}>
                {props.age > 0 && props.nickname !== '' && (
                    <ButtonComponent
                        pressButtonComponent={props.nextStep}
                        buttonComponentText={lang.next['pl']}
                        fullWidth={true}
                        underlayColor="#dd904d"
                        whiteBg={false}
                        showBackIcon={false}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    infoContainer: {
        paddingLeft: 10,
        paddingRight: 10,
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
    subText: {
        textAlign: 'left',
        color: darkGrayColor,
        fontWeight: '400',
        fontSize: 12,
        paddingTop: 20,
        //fontFamily: "Open Sans"
    },
    sectionBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
});

export default AgeDescScreen;
