import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ desc, onPress, completed }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>

      {!completed
      ? <Text styles={[styles.text, styles.strike]}>{desc}</Text>
      : <Text styles={styles.text}>{desc}</Text>  
    }

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 18,
  },
  strike: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
  }
});
