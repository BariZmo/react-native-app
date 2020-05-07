import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TextComponent,
} from "react-native";

import NavBar from "./User/navBar";
import Profile from "./User/profile";
import Map from "./User/map";

export default function App() {
  const [outern, set] = useState("xd");
  const [goals, setGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    set(enteredText);
  };

  const addGoalHandler = () => {
    setGoals((goalser) => [...goalser, outern]);
  };

  return (
    <View style={styles.app}>
      <View style={styles.navBar}></View>
      <Profile />
      <Map />

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    paddingTop: 30,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  navBar: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "blue",
  },
  map: {
    width: "100%",
    height: "10%",
  },
  profile: {
    width: "100%",
    height: "10%",
  },
});
