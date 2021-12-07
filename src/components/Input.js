import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";

const Input = ({ onChange, value }) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        style={styles.inputField}
        onChangeText={onChange}
        value={value}
        placeholder={"Escribi un item"}
        placeholderTextColor={'rgba(0, 0, 0, 0.25)'}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputField: {
   marginLeft: 20, 
   fontWeight: 'bold',  
   fontSize: 24,
   fontStyle: 'normal',
  }
});

export default Input;
