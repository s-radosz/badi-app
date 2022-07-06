import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeAlert} from '../../../app/store/alert/actions';
import DropdownAlert from 'react-native-dropdownalert';

const Alert = () => {
    let dropDownAlertRef = useRef();
    const dispatch = useDispatch();

    const alertType = useSelector((state: any) => state?.Alert?.type);
    const alertText = useSelector((state: any) => state?.Alert?.text);

    useEffect(() => {
        if (alertType && alertText) {
            //@ts-ignore
            dropDownAlertRef.alertWithType(
                alertType === 'success' ? 'success' : 'danger',
                '',
                alertText,
            );

            handleCloseAlert();
            console.log(['alertType', alertType]);
        }
    }, [alertType, alertText]);

    const handleCloseAlert = () => {
        dispatch(closeAlert());
    };

    return (
        <>
            <DropdownAlert
                ref={ref => {
                    if (ref) {
                        //@ts-ignore
                        dropDownAlertRef = ref;
                    }
                }}
                imageSrc={null}
                imageStyle={styles.img}
                closeInterval={1500}
                messageStyle={styles.msg}
                tapToCloseEnabled={true}
                defaultContainer={styles.defaultContainer}
                elevation={100}
                zIndex={100}
                successColor={'#8BC28A'}
                errorColor={'#D3978E'}
            />
        </>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 0,
        height: 0,
        display: 'none',
    },
    defaultContainer: {
        paddingTop: 50,
        paddingBottom: 20,
    },
    msg: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
});

export default Alert;
