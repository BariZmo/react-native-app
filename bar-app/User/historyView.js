import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TextComponent,
} from "react-native";

function Item({ infoElement }) {
  return (
    <View style={styles.row}>
      <Text style={styles.elementID}>ID: {infoElement.id}</Text>
      <Text style={styles.elementBar}>Bar: {infoElement.bar}</Text>
      <Text style={styles.date}>DATE: {infoElement.date}</Text>

      <Button title="Spendings" />
    </View>
  );
}

export default function () {
  const [barInfo, setBarInfo] = useState({
    id: 88,
    date: "2020-14-08",
    bar: "Pas Vytauta",
  });

  const [infoArray, setInfoArray] = useState([
    { id: 20, date: "2020 - 08 - 08", bar: "stikliai" },
    { id: 21, date: "2020 - 05 - 10", bar: "solento" },
  ]);

  return (
    <View>
      <FlatList
        style={styles.list}
        data={infoArray}
        renderItem={({ item }) => <Item infoElement={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    // width: "100%",
  },

  elementID: {
    width: "250",
  },
  elementDate: {
    width: "250",
  },
  elementBar: {
    width: "250",
    paddingHorizontal: 50,
  },
});
