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
    money: 0,
  });
  // temp, sb from props
  const [infoArray, setInfoArray] = useState([
    { id: 1, date: "2020 - 08 - 08", bar: "stikliai", money: 100 },
    { id: 2, date: "2020 - 05 - 10", bar: "solento", money: 50 },
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

  const [modalVisibility, setModalVisibility] = useState(false);

  const showDetails = (IDE) => {
    setCurrentId(IDE);
    setModalVisibility(true);
  };

  // renders all visits to bars, bar - visit info - sum spent <-- tbd

  /// learn 2 update vars
  const calcSum = (IDE) => {
    console.log(IDE);
    var sum = 0;

    spendInfo.map((infoElement) =>
      infoElement.id === IDE ? (sum += infoElement.price) : null
    );

    infoArray.map((infoElement) => (infoElement.id === IDE ? barInfo : null)); // <-------------- fix
    console.log(sum);
  };

  function Item({ infoElement }) {
    console.log(infoElement.money);
    return (
      <View>
        <View style={styles.row}>
          <Text>Bar: {infoElement.bar}</Text>
          <Text>DATE: {infoElement.date}</Text>
          <Text>Money spent: {infoElement.money}</Text>
        </View>
        <Button title="Spendings" onPress={() => showDetails(infoElement.id)} />
      </View>
    );
  }
  // detailed info product - price
  function VisitInfo({ infoElement }) {
    return (
      <View style={styles.row}>
        {infoElement.id == currentId ? (
          <Text>Item: {infoElement.item} </Text>
        ) : null}
        {infoElement.id == currentId ? (
          <Text>price: {infoElement.price}</Text>
        ) : null}
      </View>
    );
  }
  calcSum(1);
  return (
    <View style={styles.main}>
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
  main: {
    height: "50%",
  },
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
