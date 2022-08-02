import React from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

interface Props {
    placeholder: string;
    inputOnChange: (text: string) => void;
    value: string;
    secureTextEntry: boolean;
    maxLength: number;
    type?: string;
    editable?: boolean;
    onClick?: any;

    label?: string;
}

const InputComponent = ({
    placeholder,
    inputOnChange,
    value,
    secureTextEntry,
    maxLength,
    type,
    editable,
    onClick,
    label,
}: Props) => {
    return (
        <>
            {type === 'select' ? (
                <View style={label ? styles.labelInputContainer : null}>
                    {label ? <Text style={styles.label}>{label}</Text> : null}
                    <TouchableOpacity onPress={onClick}>
                        <View
                            style={[
                                styles.input,
                                {flexDirection: 'row', alignItems: 'center'},
                            ]}>
                            <Text>
                                {value
                                    ? value
                                    : placeholder
                                    ? placeholder
                                    : null}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={label ? styles.labelInputContainer : null}>
                    {label ? <Text style={styles.label}>{label}</Text> : null}
                    <TextInput
                        secureTextEntry={secureTextEntry}
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor="#919191"
                        onChangeText={inputOnChange}
                        value={value}
                        maxLength={maxLength}
                        keyboardType={type === 'number' ? 'numeric' : 'default'}
                        editable={editable}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        minWidth: '100%',
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

    label: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    labelInputContainer: {
        paddingBottom: 20,
    },
});

export default InputComponent;
