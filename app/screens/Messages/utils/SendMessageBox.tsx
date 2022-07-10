import React from 'react';
import {View, StyleSheet} from 'react-native';
import ButtonComponent from './../../../components/Utils/ButtonComponent';
import InputComponent from './../../../components/Utils/InputComponent';
import lang from './../../../lang/Messages/utils/SendMessageBox';
import {useSelector} from 'react-redux';

const SendMessageBox = (props: {
    sendMessage: any;
    receiverId: number;
    receiverName: string;
    receiverEmail: string;
    receiverPhotoPath: string;
    userMessage: string;
    setUserMessage: any;
    conversationId: number;
}): any => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <React.Fragment>
            <View style={styles.messageBoxContainer}>
                <InputComponent
                    placeholder={lang.message[activeLanguage]}
                    inputOnChange={(message: string) =>
                        props.setUserMessage(message)
                    }
                    value={props.userMessage}
                    secureTextEntry={false}
                    maxLength={400}
                />
            </View>
            <View style={styles.btnContainer}>
                <ButtonComponent
                    pressButtonComponent={async () => {
                        await props.sendMessage(
                            //@ts-ignore
                            props.receiverId,
                            props.userMessage,
                            props.conversationId,
                            0,
                        );
                        await props.setUserMessage('');
                    }}
                    buttonComponentText={lang.sendMessage[activeLanguage]}
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                />
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    messageBoxContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 0,
    },
    btnContainer: {
        marginBottom: 15,
    },
});

export default SendMessageBox;
