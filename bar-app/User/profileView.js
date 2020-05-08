import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

export default function (props) {
  return (
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
        <Button title="Change" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
