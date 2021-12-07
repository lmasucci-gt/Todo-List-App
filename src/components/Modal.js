import React, { Children } from "react";
import { StyleSheet, Modal, View } from "react-native";

const CustomModal =  ({ children }) => {
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
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    position: 'absolute',
    borderRadius: 15,
    left: 235,
    top: 210,
    height: 70,
    width: 152,
    backgroundColor: "#FFFFFF",
    padding: 0,
    shadowColor: "rgba(0, 0, 0, 0.15)", 
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CustomModal;
