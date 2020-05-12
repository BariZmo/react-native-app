import React, { useState } from "react";
import { Text, View, StyleSheet, BackHandler, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { SampleBars } from "./SampleBars";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [bars, setBars] = useState(SampleBars);
  let myBar = bars[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Baro "${myBar.tradeName}" paskyra:`}</Text>
      <View style={styles.imagePortrait}>
        <View style={styles.imageBackground}></View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/sampleBar.jpg")}
          ></Image>
        </View>
      </View>
      <Text style={styles.info}>{`Tel. nr.: ${myBar.number}`}</Text>
      <Text style={styles.info}>{`El. paštas: ${myBar.email}`}</Text>
      <Text style={styles.info}>{`Adresas: ${myBar.address}`}</Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableHighlight
          underlayColor={"red"}
          activeOpacity={0.8}
          style={styles.errorButton}
          // TODO: add error input
          onPress={() => {}}
        >
          <Text style={{ color: "black" }}>Pranešti apie klaidą</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorButton: {
    backgroundColor: "orange",
    width: 90,
    margin: 10,
    padding: 5,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "black",
  },
  info: {
    fontSize: 16,
    margin: 10,
    backgroundColor: "#AACCEE",
    borderRadius: 5,
    padding: 3,
  },
  title: {
    fontSize: 22,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imagePortrait: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  imageBackground: {
    position: "absolute",
    width: 320,
    height: 220,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  imageContainer: {
    width: 300,
    height: 200,
  },
  image: { flex: 1, width: undefined, height: undefined },
  container: {
    marginTop: 40,
    flex: 1,
  },
});