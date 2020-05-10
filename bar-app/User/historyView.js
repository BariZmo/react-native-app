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
  // temp, sb from props
  const [infoArray, setInfoArray] = useState([
    { id: 20, date: "2020 - 08 - 08", bar: "stikliai" },
    { id: 21, date: "2020 - 05 - 10", bar: "solento" },
  ]);

  const [currentId, setCurrentId] = useState({
    id: 1,
  });
  // temp, sb from props
  const [spendInfo, setSpendInfo] = useState([
    { id: 1, item: "surelis", price: 20.21 },
    { id: 1, item: "jogurtas", price: 14.87 },
    { id: 2, item: "tortas", price: 11.27 },
  ]);

  const [modalVisibility, setModalVisibility] = useState(true);

  // renders all visits to bars
  function Item({ infoElement }) {
    return (
      <View>
        <View style={styles.row}>
          <Text>ID: {infoElement.id}</Text>
          <Text>Bar: {infoElement.bar}</Text>
          <Text>DATE: {infoElement.date}</Text>

          <Button title="Spendings" onPress={() => setModalVisibility(true)} />
        </View>
      </View>
    );
  }

  function VisitInfo({ infoElement }) {
    console.log(currentId);
    return (
      <View style={styles.row}>
        {infoElement.id === currentId ? (
          <Text>ID: {infoElement.id}</Text>
        ) : null}
        {infoElement.id === currentId ? (
          <Text>Item: {infoElement.item} </Text>
        ) : null}
        {infoElement.id === currentId ? (
          <Text>price: {infoElement.price}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View>
      <Modal visible={modalVisibility} animationType="slide">
        <View>
          <FlatList
            data={spendInfo}
            renderItem={({ item }) => <VisitInfo infoElement={item} />}
            keyExtractor={(item) => item.id}
          />
          <Button title="go back" onPress={() => setModalVisibility(false)} />
        </View>
      </Modal>

      <FlatList
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
