import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sveiki!</Text>
      <TextInput
        style={styles.input}
        placeholder="Jūsų el. paštas"
        placeholderTextColor="grey"
        onChangeText={(input) => setEmail(input)}
        onSubmitEditing={() => {
          passwordInput.focus();
        }}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Jūsų slaptažodis"
        placeholderTextColor="grey"
        onChangeText={(input) => setPassword(input)}
        ref={(input) => (passwordInput = input)}
        onSubmitEditing={() => {
          submit(email, password, navigation);
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          submit(email, password, navigation);
        }}
      >
        <Text style={styles.buttonText}>Tęsti</Text>
      </TouchableOpacity>
    </View>
  );
}

function submit(email, password, navigation) {
  if (email == "" && password == "") navigation.navigate("test");

  fetch("https://barappbroker20200515061143.azurewebsites.net/user")
    .then((response) => response.json())
    .then((users) => {
      let viableUsers = users.find(
        (e) => e.email == email && e.password == password
      );
      if (viableUsers != undefined) navigation.navigate("UserPage");
      else {
        fetch("https://barappbroker20200515061143.azurewebsites.net/bar")
          .then((response) => response.json())
          .then((users) => {
            let viableBars = users.find(
              (e) => e.email == email && e.password == password
            );
            if (viableBars != undefined) navigation.navigate("StaffPage");
            else {
              fetch(
                "https://barappbroker20200515061143.azurewebsites.net/admin"
              )
                .then((response) => response.json())
                .then((users) => {
                  let viableAdmins = users.find(
                    (e) => e.email == email && e.password == password
                  );
                  if (viableAdmins != undefined)
                    navigation.navigate("AdminPage");
                  else {
                    Alert.alert("Klaida:", "Duomenys neteisingi", [
                      {
                        text: "Tęsti",
                        onPress: () => {},
                      },
                    ]);
                  }
                });
            }
          });
      }
    });
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
    fontSize: 15,
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
