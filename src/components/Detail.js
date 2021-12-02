import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default ({
  changeState,
  completed,
  closeModal,
  showDetailTitle,
  showDetailDesc,
  onChange,
 /* onSubmit,*/
  value,
}) => {
  return (
    <>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{showDetailTitle}</Text>
      </View>
      <View style={styles.modalBody}>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.inputField}
          onChangeText={onChange}
          value={value}
          placeholder={showDetailDesc ? showDetailDesc : "Task description"}
          placeholderTextColor={"#fff"}
        />
      </View>
      <View style={styles.containerButtons}>
        {completed ? (
          <TouchableOpacity
            onPress={changeState}
            style={styles.touchableOptions}
          >
            <MaterialIcons name="pending-actions" size={22} color="white" />
            <Text style={styles.buttonText}>Pending</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={changeState}
            style={styles.touchableOptions}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
            <Text style={styles.buttonText}>¡Completed!</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity  style={styles.touchableOptions}>
          <Ionicons name="save-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal} style={styles.touchableOptions}>
          <Ionicons name="exit-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    justifyContent: "flex-start",
    flex: 3,
  },
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
  },
  modalDesc: {
    color: "white",
  },
  containerButtons: {
    flex: 3,    
    flexDirection: "column",
    alignItems: "stretch",
    marginHorizontal: 20,
  },
  touchableOptions: { 
    paddingTop: 8,   
    borderTopWidth: 0.5,
    borderTopColor: 'white',
    backgroundColor: "#150112",
    flex: 1,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    paddingLeft: 10,
  },
  inputField: {
    color: 'white',
    fontSize: 15,
    margin: 15,
  },
});
