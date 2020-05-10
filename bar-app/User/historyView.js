import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TextComponent,
  Modal,
} from "react-native";

// *sort by date

export default function (props) {
  const [barInfo, setBarInfo] = useState({
    id: 88,
    date: "2020-14-08",
    bar: "Pas Vytauta",
  });

  const [infoArray, setInfoArray] = useState([
    { id: 20, date: "2020 - 08 - 08", bar: "stikliai" },
    { id: 21, date: "2020 - 05 - 10", bar: "solento" },
  ]);

  const [spendInfo, setSpendInfo] = useState([
    { id: 1, item: "surelis", price: 20.21 },
    { id: 1, item: "jogurtas", price: 14.87 },
    { id: 2, item: "tortas", price: 11.27 },
  ]);

  const [modalVisibility, setModalVisibility] = useState(true);

  function spending({ item }) {
    return (
      <View style={styles.row}>
        <Text style={styles.elementID}>ID: {infoElement.id}</Text>
        <Text style={styles.elementBar}>Bar: {infoElement.bar}</Text>
        <Text>Spent money: </Text>
        <Button title="Close" />
      </View>
    );
  }
  function showSpendings(spendingID) {
    return (
      <Modal visible={setModalVisibility}>
        <FlatList
          style={styles.list}
          data={infoArray}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </Modal>
    );
  }

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
