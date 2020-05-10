import React from "react";
import { Text, View, StyleSheet, BackHandler, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

var width = Dimensions.get("window").width;

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Nepatvirtintos registracijos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Patvirtintos registracijos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Paskyra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    width: width / 3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    justifyContent: "center",
    alignContent: "center",
    color: "black",
    textAlign: "center",
    elevation: 5,
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 1,
  },
});
