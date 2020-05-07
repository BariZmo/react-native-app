import React from "react";
import { View, StyleSheet } from "react-native";

import Component from "./components/navBarComponent";

export default function () {
  return (
    <View style={styles.navBar}>
      <Component />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "red",
  },
});
