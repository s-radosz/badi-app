import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const InputComponent = (props: {
    placeholder: string;
    inputOnChange: (text: string) => void;
    value: string;
    secureTextEntry: boolean;
    maxLength: number;
}) => {
    return (
        <TextInput
            secureTextEntry={props.secureTextEntry}
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor="#919191"
            onChangeText={props.inputOnChange}
            value={props.value}
            maxLength={props.maxLength}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginTop: 10,
        borderRadius: 6,
        height: 40,
        borderColor: '#8c8c8c',
        color: '#424242',
        borderWidth: 2,
        paddingLeft: 10,
        paddingRight: 10,
        //fontFamily: "Open Sans"
    },
});

export default InputComponent;
