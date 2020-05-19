import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Modal,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function (props) {
  return (
    <Modal visible={props.Visibility} transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.main}>
          <Text>Klaidos tipas</Text>
          <TextInput
            text={styles.textInputText}
            style={styles.textInput}
            multiline={true}
            placeholder={`Pvz. "Neteisingi duomenys sistemoje"`}
            placeholderTextColor="white"
          />
          <Text>Klaidos apibūdinimas</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder={`Pvz. "Neteisingi duomenys sistemoje"`}
            placeholderTextColor="white"
          />

          <TouchableOpacity
            style={styles.buttonSend}
            onPress={() => props.SetVisibility(false)}
          >
            <Text style={styles.buttonSendText}>Siųsti</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => props.SetVisibility(false)}
          >
            <Text style={styles.buttonBackText}>Grįžti</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "80%",
    height: "80%",
    backgroundColor: "#ECA80B",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 4,
    alignItems: "center",
    left: "10%",
    top: "5%",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },

  buttonBack: {
    backgroundColor: "#055055",
    width: "80%",
    height: "10%",
    position: "absolute",
    bottom: "1%",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
  },
  buttonBackText: {
    marginLeft: "40%",
    fontSize: 20,
    color: "white",
  },
  buttonSend: {
    backgroundColor: "#055055",
    width: "80%",
    height: "10%",
    position: "absolute",
    bottom: "13%",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
  },
  buttonSendText: {
    marginLeft: "40%",
    fontSize: 20,
    color: "white",
  },
  textInput: {
    backgroundColor: "#055055",
    width: "80%",
    marginTop: "5%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  textInputText: {
    marginLeft: "1%",
    color: "white",
  },
  buttonBackText: {
    marginLeft: "40%",
    fontSize: 20,
    color: "white",
  },
});
