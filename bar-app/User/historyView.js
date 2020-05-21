import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextComponent,
  Modal,
} from "react-native";

// *sort by date

export default function (props) {
  // temp, sb from props
  const [infoArray, setInfoArray] = useState([
    { id: 1, date: "2020 - 08 - 08", bar: "stikliai", money: 100 },
    { id: 2, date: "2020 - 05 - 10", bar: "solento", money: 50 },
    { id: 3, date: "2020 - 08 - 08", bar: "stikliai", money: 100 },
    { id: 4, date: "2020 - 05 - 10", bar: "solento", money: 50 },
    { id: 5, date: "2020 - 08 - 08", bar: "stikliai", money: 100 },
    { id: 6, date: "2020 - 05 - 10", bar: "solento", money: 50 },
    { id: 7, date: "2020 - 08 - 08", bar: "stikliai", money: 100 },
    { id: 8, date: "2020 - 05 - 10", bar: "solento", money: 50 },
  ]);

  const [currentId, setCurrentId] = useState({
    id: 1,
  });
  // temp, sb from props
  const [spendInfo, setSpendInfo] = useState([
    { identityid: 1, id: 1, item: "surelis", price: 20.21 },
    { identityid: 2, id: 1, item: "jogurtas", price: 14.87 },
    { identityid: 3, id: 2, item: "tortas", price: 11.27 },
  ]);

  const [modalVisibility, setModalVisibility] = useState(false);

  const showDetails = (IDE) => {
    setCurrentId(IDE);
    setModalVisibility(true);
  };

  const calcSum = (IDE) => {
    var sum = 0;
    spendInfo.map((infoElement) =>
      infoElement.id === IDE ? (sum += infoElement.price) : null
    );

    var index = infoArray.findIndex((obj) => obj.id === IDE);
    var updatedInfo = infoArray[index];
    updatedInfo.money = sum;
  };

  const ClearHistory = () => {
    setInfoArray([]);
  };

  function Item({ infoElement }) {
    return (
      <View>
        <View style={styles.spacer}></View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => showDetails(infoElement.id)}
        >
          <Text>
            Bar: {infoElement.bar}
            {"\n"}
            DATE: {infoElement.date}
            {"\n"}
            Money spent: {infoElement.money}
          </Text>
        </TouchableOpacity>
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

  infoArray.map((info) => calcSum(info.id));

  return (
    <View style={styles.main}>
      <Modal visible={modalVisibility} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <FlatList
              style={styles.list}
              data={spendInfo}
              renderItem={({ item }) => <VisitInfo infoElement={item} />}
              keyExtractor={(item) => item.identityid}
            />
            <Button title="go back" onPress={() => setModalVisibility(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        style={styles.list}
        data={infoArray}
        renderItem={({ item }) => <Item infoElement={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => ClearHistory()}
      >
        <Text style={styles.clearText}> Išvalyti istorija</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: "10%",
    height: "85%",
    alignItems: "center",
    width: "100%",
  },
  modal: {
    width: "80%",
    height: "80%",
    backgroundColor: "#ECA80B",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "space-between",
    left: "10%",
    top: "5%",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  touchable: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: "2%",
    backgroundColor: "#ECA80B",
    textDecorationColor: "black",
    textShadowColor: "white",
    textShadowRadius: 10,
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
  },
  list: {
    width: "90%",
    height: "80%",
    top: "2%",
  },
  clearButton: {
    borderRadius: 10,
    backgroundColor: "#ECA80B",
    height: "10%",
    width: "80%",
    top: "5%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  clearText: {
    fontSize: 20,
    top: "25%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    // width: "100%",
  },
  spacer: {
    paddingTop: "5%",
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
