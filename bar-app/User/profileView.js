import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Modal, TextInput } from "react-native";

import ReportView from "./ReportView";
import UserMainView from "./userMainView";

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

  const emailValueHandler = (enteredEmail) => {
    setEmailValue(enteredEmail);
  };

  const numberValueHandler = (enteredNumber) => {
    setNumberValue(enteredNumber);
  };

  const userInfoHandler = () => {
    props.changeUserInfo({
      ["id"]: props.userInfo.id,
      ["name"]: props.userInfo.name,
      ["email"]: emailValue,
      ["number"]: numberValue,
      ["rating"]: props.userInfo.rating,
    });
  };

  const [reportVisibility, setReportVisibility] = useState(false);

  const InfoView = () => {
    return (
      <View>
        <View style={styles.row}>
          <Text> Id: </Text>
          <Text> {props.userInfo.id}</Text>
        </View>
        <View style={styles.row}>
          <Text> Rating: </Text>
          <Text> {props.userInfo.rating} </Text>
        </View>
        <View style={styles.row}>
          <Text> Number: </Text>
          <Text> {props.userInfo.number} </Text>
          {isChangeMode ? (
            <TextInput
              style={styles.input}
              placeholder={String(props.userInfo.number)}
              onChangeText={numberValueHandler}
              value={numberValue}
            />
          ) : null}
        </View>
        <View style={styles.row}>
          <Text> Email: </Text>
          <Text> {props.userInfo.email} </Text>
          {isChangeMode ? (
            <TextInput
              style={styles.input}
              placeholder={props.userInfo.email}
              onChangeText={emailValueHandler}
              value={emailValue}
            />
          ) : null}
        </View>

        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            title={isChangeMode ? "Confirm changes" : "Change profile info"}
            onPress={isChangeMode ? saveChanges : selectChangeMode}
          />
          {isChangeMode ? (
            <Button
              style={styles.button}
              title="Back"
              onPress={selectChangeMode}
            />
          ) : null}
          {!isChangeMode ? (
            <Button
              style={styles.button}
              title="Report bug"
              onPress={() => setReportVisibility(true)}
            />
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.app}>
      {!reportVisibility ? (
        InfoView()
      ) : (
        <ReportView
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
  },
  row: {
    flexDirection: "row",
    marginVertical: "1%",
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "10%",
  },
  input: {
    backgroundColor: "white",
  },
  button: {
    height: "15%",
    marginVertical: "5%",
    backgroundColor: "blue",
  },
  buttonView: {
    marginVertical: "5%",
  },
  normalModal: {
    alignItems: "center",
  },
});
