import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Modal } from "react-native";

export default function (props) {
  const [isChangeMode, setChangeMode] = useState(true);

  const selectChangeMode = () => {
    setChangeMode(!isChangeMode);
    console.log(isChangeMode);
  };

  return (
    <Modal visible={false}>
      <View>
        <View style={styles.row}>
          <Text> Id: </Text>
          <Text> {props.userInfo.id}</Text>
        </View>
        <View style={styles.row}>
          <Text> Number: </Text>
          <Text> {props.userInfo.number} </Text>
        </View>
        <View style={styles.row}>
          <Text> Email: </Text>
          <Text> {props.userInfo.email} </Text>
        </View>
        <View style={styles.row}>
          <Text> Rating: </Text>
          <Text> {props.userInfo.rating} </Text>
        </View>
        <View style={styles.row}>
          <Button title="Change" onPress={selectChangeMode} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  normalModal: {
    alignItems: "center",
  },
});
