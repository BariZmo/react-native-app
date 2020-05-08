import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

export default function () {
  const [emailValue, setEmailValue] = useState({
    id: 10,
    date: "2020-08-08",
  });

  return (
    <FlatList>
      <View>
        <Text>BarId = {}</Text>
        <Text>Date = {}</Text>
      </View>
    </FlatList>
  );
}
