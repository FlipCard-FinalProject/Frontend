import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux'
import { sendError as sendErrorUser}  from "../store/actions/userAction";
import { sendError as sendErrorCard  }  from "../store/actions/cardAction";
import { sendError as sendErrorSetcard } from "../store/actions/setCardAction"; 

export default function ModalError({ isError, errors }) {
  const [isModalVisible, setModalVisible] = useState(isError);
  const dispatch = useDispatch()

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    dispatch(sendErrorUser([]))
    dispatch(sendErrorCard([]))
    dispatch(sendErrorSetcard([]))
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
