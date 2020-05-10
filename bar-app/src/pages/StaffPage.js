import React from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native";
import StaffNavigationBar from "./StaffNavigationBar";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.navigationBar}>
          <StaffNavigationBar />
        </View>
        <View style={styles.screen}>
          <Text>Sveiki baro [baras] darbuotojau</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  flexContainer: {
    flexDirection: "column-reverse",
  },
  screen: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#809fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navigationBar: {
    width: "100%",
    height: 100,
  },
});
