import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sveiki!</Text>
      <TextInput
        style={styles.input}
        placeholder="Jūsų el. paštas"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        placeholder="Jūsų slaptažodis"
        placeholderTextColor="grey"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {} /*navigation.navigate("UserPage")*/}
      >
        <Text style={styles.buttonText}>Tęsti</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 30,
    width: 200,
    textAlign: "center",
    color: "white",
    textShadowRadius: 3,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
  },
  container: {
    flex: 1,
    backgroundColor: "#809fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "lightgrey",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    width: 100,
    padding: 10,
    margin: 20,
    backgroundColor: "#00aeef",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
