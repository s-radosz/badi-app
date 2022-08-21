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
    additionalStyle?: any;
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
    additionalStyle,
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
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 40,
                                    paddingHorizontal: 10,
                                },
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
                        style={[
                            styles.input,
                            additionalStyle
                                ? additionalStyle
                                : {
                                      minWidth: '100%',
                                      height: 40,
                                      marginTop: 10,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                  },
                        ]}
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
        borderRadius: 6,
        borderColor: '#8c8c8c',
        color: '#424242',
        borderWidth: 2,
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
