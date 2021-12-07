import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ListItem = ({ title, completed, changeState }) => {
  return (
    <TouchableOpacity onPress={changeState} >
      {completed ? (
        <Text style={[styles.text, styles.strike]}>{title}</Text>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "black",
    paddingLeft: 20,
  },
  strike: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

export default ListItem;
