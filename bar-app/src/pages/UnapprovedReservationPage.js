import React from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  return (
    <View style={styles.container}>
      <Text>Nepatvirtintos registracijos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
