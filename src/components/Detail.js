import React from "react";
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

export default ({ completed, closeModal, showDetailTitle, showDetailDesc }) => {
  return (
    <>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{showDetailTitle}</Text>
      </View>
      <View style={styles.modalBody}>
        <Text style={styles.modalDesc}>{showDetailDesc}</Text>
      </View>
      <View>
        { completed ? 
        <Button color={'#150112'} title={'Pending'} onPress={completed} />
        : <Button color={'#150112'} title={'¡Completed!'} onPress={completed} /> }
        <Button color={'#150112'} title="Exit" onPress={closeModal} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    flex: 6,
    margin: 15,
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
});
