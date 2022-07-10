import React, {useState} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import BottomPanel from './../../components/SharedComponents/BottomPanel';
import ButtonComponent from './../../components/Utils/ButtonComponent';
import TextAreaComponent from './../../components/Utils/TextAreaComponent';
import axios from 'axios';
import {withNavigation} from 'react-navigation';
import lang from './../../lang/FeedbackModal/FeedbackModal';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../helpers/globalVariables';
import {setAlert} from '../../../app/store/alert/actions';
import {setLoader} from '../../../app/store/loader/actions';
import {
    fontSizeBig,
    lightBorderRadius,
    customOrangeColor,
} from './../../assets/global/globalStyles';

const loaderImage: any = require('./../../assets/images/loader.gif');

interface IFeedbackModalProps {
    navigation: any;
}

const FeedbackModal = ({navigation}: IFeedbackModalProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackTopic, setFeedbackTopic] = useState([
        {index: 0, text: 'App troubles'},
        {index: 1, text: 'Rebuild a feature'},
        {index: 2, text: 'New feature'},
        {index: 3, text: 'Other'},
    ]);
    const [activeTopic, setActiveTopic] = useState('');

    const handleSetFeedbackTopic = (index: number) => {
        let activeTopic = feedbackTopic.find((obj: any) => {
            return obj.index === index;
        });

        setActiveTopic(activeTopic.text);
    };

    const sendFeedback = async () => {
        let topic = activeTopic;
        let message = feedbackMessage;
        let userId = userData?.id;

        if (!activeTopic || !feedbackMessage) {
            dispatch(setAlert('danger', lang.allDataError[activeLanguage]));
        }

        if (activeTopic && feedbackMessage && userId && API_URL) {
            dispatch(setLoader(true));

            axios
                .post(API_URL + '/saveUserFeedback', {
                    topic: activeTopic,
                    message: feedbackMessage,
                    userId: userId,
                })
                .then(response => {
                    if (response.data.status === 'OK') {
                        setActiveTopic('');
                        setFeedbackMessage('');

                        dispatch(
                            setAlert(
                                'success',
                                lang.messageSuccess[activeLanguage],
                            ),
                        );

                        dispatch(setLoader(false));
                        navigation.goBack(null);
                    }
                })
                .catch(error => {
                    dispatch(
                        setAlert('danger', lang.messageError[activeLanguage]),
                    );

                    dispatch(setLoader(false));

                    navigation.goBack(null);
                });
        }
    };

    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper} data-test="FindUsers">
                    <React.Fragment>
                        <ScrollView keyboardShouldPersistTaps={'always'}>
                            <Text style={styles.feedbackHeaderText}>
                                {lang.header[activeLanguage]}
                            </Text>
                            <Text style={styles.feedbackSubHeaderText}>
                                {lang.feedbackText[activeLanguage]}
                            </Text>

                            <Text style={styles.feedbackTopic}>
                                {lang.messageSubject[activeLanguage]}
                            </Text>

                            {feedbackTopic.map((topic: any, index: number) => {
                                return (
                                    <View
                                        style={styles.checkboxWrapper}
                                        key={`FeedbackModal-${index}`}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleSetFeedbackTopic(index)
                                            }
                                            style={
                                                activeTopic == topic.text
                                                    ? styles.activeCheckbox
                                                    : styles.inActiveCheckbox
                                            }
                                        />
                                        <Text
                                            onPress={() =>
                                                handleSetFeedbackTopic(index)
                                            }
                                            style={
                                                activeTopic == topic.text
                                                    ? styles.checkboxTextActive
                                                    : styles.checkboxText
                                            }>
                                            {topic.text}
                                        </Text>
                                    </View>
                                );
                            })}

                            <View style={styles.msgContainer}>
                                <TextAreaComponent
                                    placeholder={
                                        lang.writeMessage[activeLanguage]
                                    }
                                    inputOnChange={(feedbackMessage: string) =>
                                        setFeedbackMessage(feedbackMessage)
                                    }
                                    value={feedbackMessage}
                                    maxLength={800}
                                    multiline={true}
                                    numberOfLines={10}
                                />
                            </View>

                            <ButtonComponent
                                pressButtonComponent={sendFeedback}
                                buttonComponentText={lang.send[activeLanguage]}
                                fullWidth={true}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                            />
                        </ScrollView>

                        <BottomPanel
                            data-test="BottomPanel"
                            navigation={navigation}
                        />
                    </React.Fragment>
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
    peachBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        //fontFamily: "Open Sans"
    },
    feedbackHeaderText: {
        textAlign: 'center',
        color: '#424242',
        fontWeight: '600',
        fontSize: fontSizeBig,
        marginTop: 30,
        paddingBottom: 30,
        //fontFamily: "Open Sans"
    },
    feedbackSubHeaderText: {
        textAlign: 'center',
        color: '#424242',
        fontWeight: '300',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 40,
        //fontFamily: "Open Sans"
    },
    feedbackMessage: {
        textAlignVertical: 'top',
        height: 80,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        borderColor: '#424242',
        borderRadius: lightBorderRadius,
        padding: 5,
    },
    feedbackBtn: {
        height: 45,
        width: '94%',
        marginTop: 15,
        marginBottom: 0,
        marginLeft: '3%',
        marginRight: '3%',
        borderRadius: lightBorderRadius,
        borderColor: customOrangeColor,
        borderWidth: 2,
        backgroundColor: customOrangeColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxWrapper: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
    },
    activeCheckbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        backgroundColor: '#f7b67e',
        borderColor: '#f7b67e',
        borderRadius: 20,
        marginRight: 5,
    },
    inActiveCheckbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 5,
    },
    checkboxText: {
        marginTop: 2,
        marginRight: 15,
        color: '#424242',
    },
    checkboxTextActive: {
        marginTop: 2,
        marginRight: 15,
        color: '#424242',
        fontWeight: '600',
    },
    feedbackTopic: {
        paddingLeft: 10,
        paddingBottom: 10,
        fontWeight: '600',
        color: '#424242',
    },
    loaderContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    msgContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default withNavigation(FeedbackModal);
