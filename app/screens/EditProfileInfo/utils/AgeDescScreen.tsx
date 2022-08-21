import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import ButtonComponent from './../../../components/Utils/ButtonComponent';
import InputComponent from './../../../components/Utils/InputComponent';
import TextAreaComponent from './../../../components/Utils/TextAreaComponent';
import lang from './../../../lang/EditProfileInfo/utils/AgeDescScreen';
import TopHeader from './../../../components/Utils/TopHeader';
import {darkGrayColor} from './../../../assets/global/globalStyles';
import {useSelector} from 'react-redux';

const fillInfoBg: any = require('./../../../assets/images/fillInfoBgMin.jpg');

interface AgeDescProps {
    handleChange: any;
    age: any;
    nickname: string;
    desc: string;
    nextStep: any;
}

const AgeDescScreen = ({
    handleChange,
    age,
    nickname,
    desc,
    nextStep,
}: AgeDescProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <View style={styles.sectionContainer}>
            <ScrollView>
                <TopHeader
                    onClose={() => {}}
                    title={lang.header[activeLanguage]}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.fillInfoHeader}>
                        {lang.fillBasicInfo[activeLanguage]}
                    </Text>

                    <Text style={styles.subText}>
                        {lang.nick[activeLanguage]} ({nickname.length}/20{' '}
                        {lang.chars[activeLanguage]}) *
                    </Text>

                    <InputComponent
                        placeholder={lang.nick[activeLanguage]}
                        inputOnChange={(nickname: string) =>
                            handleChange('nickname', nickname)
                        }
                        value={nickname}
                        secureTextEntry={false}
                        maxLength={20}
                    />

                    <Text style={styles.subText}>
                        {lang.age[activeLanguage]} *
                    </Text>

                    <InputComponent
                        placeholder={lang.age[activeLanguage]}
                        inputOnChange={(age: string) =>
                            handleChange('age', age)
                        }
                        value={age !== 0 ? String(age) : ''}
                        secureTextEntry={false}
                        maxLength={2}
                    />

                    <Text style={styles.subText}>
                        {lang.description[activeLanguage]} ({desc.length}
                        /250 {lang.chars[activeLanguage]})
                    </Text>

                    <TextAreaComponent
                        placeholder={lang.description[activeLanguage]}
                        inputOnChange={(desc: string) =>
                            handleChange('desc', desc)
                        }
                        value={desc}
                        maxLength={250}
                        multiline={true}
                        numberOfLines={10}
                    />
                </View>
            </ScrollView>

            <View style={styles.sectionBtnContainer}>
                {age > 0 && nickname !== '' && (
                    <ButtonComponent
                        pressButtonComponent={nextStep}
                        buttonComponentText={lang.next[activeLanguage]}
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
