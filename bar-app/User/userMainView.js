import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import Profile from "./components/profile";
import Map from "./components/map";

export default function () {
  return (
    <View style={styles.app}>
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "10%",
  },
  profile: {
    width: "100%",
    height: "10%",
  },
});
