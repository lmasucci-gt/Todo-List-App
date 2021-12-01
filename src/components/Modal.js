import React, { Children } from "react";
import { Dimensions, StyleSheet, Modal, View, Text } from "react-native";

export default ({ children }) => {
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.center}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    borderRadius: 15,
    flexDirection: "column",
    height: Dimensions.get("window").height - 400,
    width: Dimensions.get("window").width - 160,
    backgroundColor: "#150112",
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
});
