import React, {useState, useEffect} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import styles from './style';
const close: any = require('./../../assets/images/closeWhite.png');
import {useDispatch, useSelector} from 'react-redux';

const Alert = (props: any) => {
    const [showAlert, setShowAlert] = useState(true);
    const [message, setMessage] = useState('');

    const alertType = useSelector((state: any) => state?.alert?.type);
    const alertText = useSelector((state: any) => state?.alert?.text);

    useEffect(() => {
        if (alertType) {
            console.log(['alertType', alertType]);
        }
    }, [alertType, alertText]);

    // useEffect(() => {
    //   if (props.alertMessage) {
    //     setShowAlert(true);
    //     setMessage(props.alertMessage);
    //   }
    // }, [props.alertMessage]);

    if (showAlert) {
        return (
            <View style={styles.alertContainer}>
                <Text
                    data-test="message"
                    style={
                        props.alertType == 'success'
                            ? styles.successContainer
                            : props.alertType == 'danger'
                            ? styles.dangerContainer
                            : null
                    }>
                    {message}
                </Text>
                <TouchableHighlight
                    onPress={props.closeAlert}
                    style={styles.closeAlert}
                    underlayColor={'#fff'}>
                    <Image source={close} style={{width: 16, height: 16}} />
                </TouchableHighlight>
            </View>
        );
    } else {
        return <View />;
    }
};
export default Alert;
