import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Modal,
  TextInput,
  Keyboard,
} from "react-native";

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
      ["blockTime"]: props.userInfo.blockTime,
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
      <View>
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
              onPress={() => ReportOpen(setProfVisibility)}
            />
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
    width: "100%",
  },
  texts: {
    alignItems: "center",
    width: "60%",
    height: "60%",
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
    height: "10%",
  },
  input: {
    backgroundColor: "#ECA80B",
    borderColor: "black",
    borderBottomWidth: 1,
    height: "160%",
    marginLeft: "1%",
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
