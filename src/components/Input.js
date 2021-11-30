import React from "react";
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ onChange, value, onSubmit }) => {
    return (
        <TextInput onSubmitEditing={onSubmit} onChangeText={onChange} value={value} style={styles.input} />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#eee',
        height: 34,
        alignSelf: 'stretch',
        padding: 5,
    }
})

export default Input