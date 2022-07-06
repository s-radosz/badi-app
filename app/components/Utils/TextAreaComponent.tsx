import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextAreaComponent = (props: {
    placeholder: string;
    inputOnChange: (text: string) => void;
    value: string;
    maxLength: number;
    multiline: boolean;
    numberOfLines: number;
}) => {
    return (
        <TextInput
            style={styles.textarea}
            placeholder={props.placeholder}
            placeholderTextColor="#919191"
            onChangeText={props.inputOnChange}
            value={props.value}
            maxLength={props.maxLength}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
        />
    );
};

const styles = StyleSheet.create({
    textarea: {
        borderWidth: 2,
        borderRadius: 6,
        marginTop: 10,
        padding: 10,
        height: 60,
        width: '100%',
        borderColor: '#8c8c8c',
        color: '#424242',
        textAlignVertical: 'top',
    },
});

export default TextAreaComponent;
