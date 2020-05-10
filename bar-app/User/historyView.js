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
  const [barInfo, setBarInfo] = useState({
    id: 88,
    date: "2020-14-08",
  });

  const [infoArray, setInfoArray] = useState([
    { id: 20, date: "2020 - 08 - 08" },
    { id: 21, date: "2020 - 05 - 10" },
  ]);

  return (
    <View>
      <Text>BarId = {barInfo.id}</Text>
      <Text>Date = {barInfo.date}</Text>

      {infoArray.map((barI) => (
        <View>
          <Text>xdid : {barI.id}</Text>
          <Text>xddate : {barI.date}</Text>
        </View>
      ))}
    </View>
  );
}
