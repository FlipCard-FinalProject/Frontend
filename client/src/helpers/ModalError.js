import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default function ModalError({ isError, errors }) {
  const [isModalVisible, setModalVisible] = useState(isError);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal isVisible={isModalVisible} animationType="fade">
      <View style={styles.modalView}>
        {errors.map((err, i) => {
          return <Text key={i}>{err}</Text>;
        })}
        <View style={{ paddingTop: "5%" }}>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
});
