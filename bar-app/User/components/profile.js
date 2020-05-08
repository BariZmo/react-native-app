import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function () {
  return (
    <View style={styles.view}>
      <Image
        source={{ uri: "https://reactjs.org/logo-og.png" }}
        style={styles.img}
      />
      <Text style={styles.text}>Mantas Radzi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 400,
    height: 400,
    position: "relative",
    justifyContent: "center",
  },
});
