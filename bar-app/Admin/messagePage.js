import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MessageInput() {
    const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          Pranešimas
      </Text>
      <View style={styles.input}>
        <TextInput
        multiline
        onChangeText={message => setMessage(message)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          send(message);
        }}
      >
        <Text style={styles.buttonText}>Siųsti pranešimą</Text>
      </TouchableOpacity>
    </View>
  );
}

function send(text) {
    // TODO: send message to customer
  }

const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      margin: 30,
      width: 200,
      textAlign: "center",
      color: "#d2691e",
    },
    container: {
      flex: 1,
      backgroundColor: "#f0f8ff",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "white",
      backgroundColor: "lightgrey",
      padding: 5,
      margin: 5,
      width: 200,
      height: 150,
      borderRadius: 10,
      fontSize: 20,
    },
    button: {
      alignItems: "center",
      width: 200,
      padding: 10,
      margin: 20,
      backgroundColor: "#d2691e",
      borderColor: "white",
      borderWidth: 3,
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 20,
      color: "white",
    },
  });
