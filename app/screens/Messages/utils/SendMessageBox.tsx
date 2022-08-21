import React from 'react';
import {View, StyleSheet} from 'react-native';
import ButtonComponent from './../../../components/Utils/ButtonComponent';
import InputComponent from './../../../components/Utils/InputComponent';
import lang from './../../../lang/Messages/utils/SendMessageBox';
import {useSelector} from 'react-redux';

interface SendMessageBoxProps {
    sendMessage: any;
    receiverId: number;
    receiverName: string;
    receiverEmail: string;
    receiverPhotoPath: string;
    userMessage: string;
    setUserMessage: any;
    conversationId: number;
}

const SendMessageBox = ({
    sendMessage,
    receiverId,
    receiverName,
    receiverEmail,
    receiverPhotoPath,
    userMessage,
    setUserMessage,
    conversationId,
}: SendMessageBoxProps) => {
    const activeLanguage = useSelector(
        (state: any) => state?.Translations?.language,
    );

    return (
        <React.Fragment>
            <View style={styles.messageBoxContainer}>
                <InputComponent
                    placeholder={lang.message[activeLanguage]}
                    inputOnChange={(message: string) => setUserMessage(message)}
                    value={userMessage}
                    secureTextEntry={false}
                    maxLength={400}
                />
            </View>
            <View style={styles.btnContainer}>
                <ButtonComponent
                    pressButtonComponent={async () => {
                        await sendMessage(
                            //@ts-ignore
                            receiverId,
                            userMessage,
                            conversationId,
                            0,
                        );
                        await setUserMessage('');
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
