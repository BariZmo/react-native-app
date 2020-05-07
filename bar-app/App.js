import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TextComponent,
} from "react-native";

export default function App() {
  const [out, set] = useState("text to be set");
  const [goals, setGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    set(enteredText);
  };

  const addGoalHandler = () => {
    setGoals((currentGoals) => [...currentGoals, out]);
  };

  return (
    <View style={styles.app}>
      <View style={styles.navBar}>
        <View style={styles.reservations}>
          <Button title="res" onPress={addGoalHandler} />
        </View>

        <View style={styles.main}>
          <TextInput
            placeholder="main"
            onChangeText={goalInputHandler}
            style={{ borderColor: "black", borderBottomWidth: 1, padding: 10 }}
          />
        </View>

        <View style={styles.history}>
          <Button title="his" />
        </View>
      </View>
      <View>
        {goals.map((goal) => {
          <TextComponent>{goal}</TextComponent>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    paddingTop: 30,
    width: "100%",
  },
  navBar: {
    paddingTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  main: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  reservations: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  history: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
