import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";

export default function App() {
  const [components, setComponent] = useState([
    "main",
    "reservations",
    "history",
  ]);

  return (
    <View>
      {components.map((component) => (
        <View key={component} style={styles.main}>
          <Button title={component} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transperant",
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
