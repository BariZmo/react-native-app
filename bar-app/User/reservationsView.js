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
    { id: 1, date: "2020 - 08 - 08", bar: "stikliai" },
    { id: 2, date: "2020 - 05 - 10", bar: "solento" },
  ]);

  const [modalVisibility, setModalVisibility] = useState(false);

  function Item({ infoElement }) {
    return (
      <View>
        <View style={styles.spacer}></View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setModalVisibility(true)}
        >
          <Text>Bar: {infoElement.bar}</Text>
          <Text>DATE: {infoElement.date}</Text>
          <Text>Time left: </Text>
        </TouchableOpacity>
      </View>
    );
  }
  // detailed info product - price

  return (
    <View style={styles.main}>
      <Modal visible={modalVisibility} animationType="slide">
        <View>
          <Text>xdwd</Text>
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
  touchable: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: "5%",
    backgroundColor: "teal",
    textDecorationColor: "yellow",
    textShadowColor: "red",
    textShadowRadius: 1,
    borderColor: "green",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
  },
  list: {
    width: "100%",
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
