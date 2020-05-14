import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Keyboard } from "react-native";


import ReportModal from "./components/reportModal";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function (props) {
  const [isChangeMode, setChangeMode] = useState(false);

  const selectChangeMode = () => {
    setChangeMode(!isChangeMode);
  };

  const saveChanges = () => {
    selectChangeMode();
    userInfoHandler();
  };

  const [emailValue, setEmailValue] = useState(props.userInfo.email);
  const [numberValue, setNumberValue] = useState(props.userInfo.number);
  const [passwordValue, setPasswordValue] = useState(props.userInfo.password);

  const emailValueHandler = (enteredEmail) => {
    setEmailValue(enteredEmail);
  };

  const numberValueHandler = (enteredNumber) => {
    setNumberValue(enteredNumber);
  };

  const passwordValueHandler = (eneteredPassword) => {
    setPasswordValue(eneteredPassword);
  };

  const userInfoHandler = () => {
    props.changeUserInfo({
      ["id"]: props.userInfo.id,
      ["name"]: props.userInfo.name,
      ["email"]: emailValue,
      ["number"]: numberValue,
      ["rating"]: props.userInfo.rating,
      ["password"]: passwordValue,
      ["ban"]: props.userInfo.ban,
    });
  };

  const [reportVisibility, setReportVisibility] = useState(false);

  const ReportOpen = (setProfVisibility) => {
    setReportVisibility(true);
    setProfVisibility(false);
  };

  const InfoView = (setProfVisibility) => {
    setProfVisibility(!isChangeMode);
    return (
      <View style={styles.app}>
        <View style={styles.texts}>
          {!isChangeMode ? (
            <View style={styles.row}>
              <Text> Id: </Text>
              <Text> {props.userInfo.id}</Text>
            </View>
          ) : null}
          {!isChangeMode ? (
            <View style={styles.row}>
              <Text> Rating: </Text>
              <Text> {props.userInfo.rating} </Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <Text> Number: </Text>
            {!isChangeMode ? <Text> {props.userInfo.number} </Text> : null}
            {isChangeMode ? (
              <TextInput
                keyboardType={"phone-pad"}
                style={styles.input}
                placeholder={String(props.userInfo.number)}
                onChangeText={numberValueHandler}
                value={numberValue}
              />
            ) : null}
          </View>

          <View style={styles.row}>
            <Text> Email: </Text>
            {!isChangeMode ? <Text> {props.userInfo.email} </Text> : null}
            {isChangeMode ? (
              <TextInput
                style={styles.input}
                placeholder={props.userInfo.email}
                onChangeText={emailValueHandler}
                value={emailValue}
              />
            ) : null}
          </View>
          <View style={styles.row}>
            <Text> Password: </Text>
            {!isChangeMode ? <Text> {props.userInfo.password} </Text> : null}
            {isChangeMode ? (
              <TextInput
                style={styles.input}
                placeholder={props.userInfo.password}
                onChangeText={passwordValueHandler}
                value={passwordValue}
              />
            ) : null}
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            title={isChangeMode ? "Confirm changes" : "Change profile info"}
            onPress={isChangeMode ? saveChanges : selectChangeMode}
          >
            <Text style={styles.buttonText}>
              {isChangeMode ? "Patvirtinti" : "Keisti profilio duomenis"}
            </Text>
          </TouchableOpacity>
          {isChangeMode ? (
            <TouchableOpacity
              style={styles.button}
              title="Grįžti"
              onPress={selectChangeMode}
            >
              <Text style={styles.buttonText}>Grįžti</Text>
            </TouchableOpacity>
          ) : null}
          {!isChangeMode ? (
            <TouchableOpacity
              style={styles.button}
              title="Pranešti apie klaidą"
              onPress={() => ReportOpen(setProfVisibility)}
            >
              <Text style={styles.buttonText}>Pranešti apie klaidą</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

    );
  };

  return (
    <View style={styles.app}>
      {!reportVisibility ? (
        InfoView(props.SetProfile)
      ) : (
        <ReportModal
          Visibility={reportVisibility}
          SetVisibility={setReportVisibility}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
  texts: {
    alignItems: "center",
    bottom: "20%",
    height: "70%",
    backgroundColor: "#ECA80B",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "space-evenly",
    paddingHorizontal: "2%",
  },
  row: {
    flexDirection: "row",
    marginVertical: "1%",
    backgroundColor: "transparent",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  input: {
    backgroundColor: "#ECA80B",
    borderColor: "black",
    borderBottomWidth: 1,
    height: "120%",
    marginLeft: "1%",
    backgroundColor: "transparent",
  },
  button: {
    height: "60%",
    backgroundColor: "#ECA80B",
    borderRadius: 10,
    borderColor: "black",
    alignItems: "center",
    borderWidth: 3,
  },
  buttonView: {
    marginTop: "2%",
    width: "75%",
    height: "60%",
    bottom: "10%",
  },
  normalModal: {
    alignItems: "center",
  },
  buttonText: {
    alignItems: "center",
    color: "black",
    top: "15%",
    fontSize: 20,
  },
});
