import React, {useState} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
// import Alert from './../Alert/Alert';
import BottomPanel from './../SharedComponents/BottomPanel';
import styles from './style';
import ButtonComponent from './../Utils/ButtonComponent';
import TextAreaComponent from './../Utils/TextAreaComponent';
// import {GlobalContext} from './../../Context/GlobalContext';
import axios from 'axios';
import {withNavigation} from 'react-navigation';
import lang from './../../assets/lang/FeedbackModal/FeedbackModal';

import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from './../../helpers/globalVariables';
import {setAlert} from '../../../app/store/alert/actions';
import {setLoader} from '../../../app/store/loader/actions';

const loaderImage: any = require('./../../assets/images/loader.gif');

interface IFeedbackModalProps {
    navigation: any;
}

const FeedbackModal = ({navigation}: IFeedbackModalProps) => {
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state?.User?.details);

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
            dispatch(setAlert('danger', lang.allDataError['pl']));
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
                            setAlert('success', lang.messageSuccess['pl']),
                        );

                        dispatch(setLoader(false));
                        navigation.goBack(null);
                    }
                })
                .catch(error => {
                    dispatch(setAlert('danger', lang.messageError['pl']));

                    dispatch(setLoader(false));

                    navigation.goBack(null);
                });
        }
    };

    return (
        <React.Fragment>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    data-test="FindUsers">
                    <React.Fragment>
                        <ScrollView keyboardShouldPersistTaps={'always'}>
                            <Text style={styles.feedbackHeaderText}>
                                {lang.header['pl']}
                            </Text>
                            <Text style={styles.feedbackSubHeaderText}>
                                {lang.feedbackText['pl']}
                            </Text>

                            <Text style={styles.feedbackTopic}>
                                {lang.messageSubject['pl']}
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

                            <View
                                style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}>
                                <TextAreaComponent
                                    placeholder={lang.writeMessage['pl']}
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
                                buttonComponentText={lang.send['pl']}
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
                    {/* )} */}
                </View>
            </SafeAreaView>
        </React.Fragment>
    );
};

export default withNavigation(FeedbackModal);
