import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalProfile = () => {
  const [modalNameVisible, setModalVisible] = useState(true);
  const [modalAgeVisible, setModalAgeVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [textout, setTextout] = useState("1232132112");

  //   const modalChangeCondition = () => {
  //     setModalVisible(!modalNameVisible);
  //     setModalAgeVisible(!modalAgeVisible);
  //   };

  return (
    <View style={styles.centeredView}>
      <Text style={{ marginBottom: 300 }}>{textout}</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalNameVisible}
        onShow={() => setTextout("Nhap thoong tin")}
        onRequestClose={() => {
          setModalVisible(!modalNameVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                [
                  setModalAgeVisible(!modalAgeVisible),
                  setModalVisible(!modalNameVisible),
                ];
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        onShow={() => setTextout("Hay them anh nhe")}
        visible={modalImageVisible}
        onRequestClose={() => {
          setModalImageVisible(!modalImageVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Image</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalImageVisible(!modalImageVisible);
              }}
            >
              <Text style={styles.textStyle}>oke</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        onShow={() => setTextout("Them tuoi di")}
        visible={modalAgeVisible}
        onRequestClose={() => {
          setModalAgeVisible(!modalAgeVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Age</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                [
                  setModalAgeVisible(!modalAgeVisible),
                  setModalImageVisible(!modalImageVisible),
                ];
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalProfile;
