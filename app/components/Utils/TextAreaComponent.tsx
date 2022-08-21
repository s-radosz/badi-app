import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface TextAreaComponentProps {
    placeholder: string;
    inputOnChange: (text: string) => void;
    value: string;
    maxLength: number;
    multiline: boolean;
    numberOfLines: number;
}

const TextAreaComponent = ({
    placeholder,
    inputOnChange,
    value,
    maxLength,
    multiline,
    numberOfLines,
}: TextAreaComponentProps) => {
    return (
        <TextInput
            style={styles.textarea}
            placeholder={placeholder}
            placeholderTextColor="#919191"
            onChangeText={inputOnChange}
            value={value}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
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
