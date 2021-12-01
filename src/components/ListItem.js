import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default ({ title, onPress, completed }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {completed ? (
        <Text style={[styles.text, styles.strike]}>{title}</Text>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#3E3364",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  strike: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
