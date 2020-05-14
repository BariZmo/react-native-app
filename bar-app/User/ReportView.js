import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  BackHandler,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function (props) {
  BackHandler.addEventListener("hardwareBackPress", () => {
    props.cancelHandler();
  });

  const [bugType, setBugType] = useState("");
  const [bugDesciption, setBugDesciption] = useState("");

  const bugTypeHandler = (bugTyped) => {
    setBugType(bugTyped);
  };

  const descriptionTypeHandler = (descriptionTyped) => {
    setBugDesciption(descriptionTyped);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>{props.title}</Text>
        <View>
          <Text>{props.shortQuery}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={props.shortQueryPlaceholder}
            placeholderTextColor="white"
            onChangeText={bugTypeHandler}
            value={bugType}
          />
        </View>
        <View>
          <Text>{props.longQuery}</Text>
          <TextInput
            style={styles.textInput}
            numberOfLines={2}
            multiline={true}
            textAlignVertical="top"
            placeholder={props.longQueryPlaceholder}
            placeholderTextColor="white"
            onChangeText={descriptionTypeHandler}
            value={bugDesciption}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              if (bugType == "" || bugDesciption == "") {
                Alert.alert("Klaida:", "Neįvedėte duomenų", [
                  {
                    text: "Tęsti",
                    onPress: () => {},
                  },
                ]);
              } else {
                props.sendHandler(bugType, bugDesciption);
              }
            }}
            underlayColor={"lightblue"}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Siųsti</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => props.cancelHandler()}
            underlayColor={"lightblue"}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Atšaukti</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    alignSelf: "flex-start",
    color: "lightgrey",
    paddingTop: 10,
    margin: 10,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 30,
  },
  background: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#809fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    alignSelf: "stretch",
    width: 300,
    marginTop: 10,
    marginBottom: 20,
    padding: 5,
  },
  button: {
    backgroundColor: "skyblue",
    width: 100,
    padding: 5,
    borderRadius: 5,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  buttonRow: { flexDirection: "row" },
  buttonText: { color: "white", fontWeight: "bold" },
});
