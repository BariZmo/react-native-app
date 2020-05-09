import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Sample LoginPage text!</Text>
      <Button
        title="Go to User"
        onPress={() => navigation.navigate("UserPage")}
      />
      <Button
        title="Go to Staff"
        onPress={() => navigation.navigate("StaffPage")}
      />
      <Button
        title="Go to Admin"
        onPress={() => navigation.navigate("AdminPage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
