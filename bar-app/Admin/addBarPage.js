import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ({ navigation }) {
  const [tradeName, setTradeName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Įrašykite baro duomenis</Text>
      <TextInput
        style={styles.input}
        placeholder="Pavadinimas"
        placeholderTextColor="grey"
        onChangeText={(input) => setTradeName(input)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numeris"
        placeholderTextColor="grey"
        onChangeText={(input) => setNumber(input)}
      />
      <TextInput
        style={styles.input}
        placeholder="Elektroninis paštas"
        placeholderTextColor="grey"
        onChangeText={(input) => setEmail(input)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresas"
        placeholderTextColor="grey"
        onChangeText={(input) => setAdress(input)}
      />
      <GoToMapButton />
    </View>
  );
}

  function GoToMapButton(tradeName, number, email, adress) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                submit(tradeName, number, email, adress);
                navigation.navigate("AdminMapPage");
            }}
        >
        <Text style={styles.buttonText}>Tęsti</Text>
      </TouchableOpacity>
    );
  }

  function submit(tradeName, number, email, adress) {
    // TODO: send data to file or server and save it
    //
    //
    //
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
