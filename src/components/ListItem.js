import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ListItem = ({ title, onPress, completed }) => {
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
    marginHorizontal: 35,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#04088E",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderBottomWidth: 2.5,
    borderBottomColor: "black",
    borderRightColor: "black",
    borderRightWidth: 2.5,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  strike: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

export default ListItem;
