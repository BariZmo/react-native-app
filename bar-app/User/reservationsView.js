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
import { GestureHandler } from "expo";
import Swipeable from "react-native-gesture-handler/Swipeable";

// *sort by date

export default function (props) {
  // temp, sb from props
  const [infoArray, setInfoArray] = useState([
    { id: 1, date: "2020 - 08 - 08", bar: "stikliai", confirmed: true },
    { id: 2, date: "2020 - 05 - 10", bar: "solento", confirmed: false },
  ]);

  const [info, setInfo] = useState();

  const [modalVisibility, setModalVisibility] = useState(false);

  const LeftActions = (progress, dragX) => {
    return (
      <View style={styles.leftBack}>
        <Text style={styles.leftText}>REMOVE</Text>
      </View>
    );
  };

  function Item({ infoElement }) {
    return (
      <Swipeable renderLeftActions={LeftActions}>
        <View>
          <View style={styles.spacer}></View>
          <View style={styles.touchable}>
            <Text>Bar: {infoElement.bar}</Text>
            <Text>DATE: {infoElement.date}</Text>
            <Text>Time left: </Text>
          </View>
        </View>
      </Swipeable>
    );
  }
  // detailed info product - price

  return (
    <View style={styles.main}>
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
    height: "90%",
    marginTop: "10%",
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

  leftBack: {
    backgroundColor: "yellow",
    alignItems: "center",
    height: "100%",
    top: "5%",
  },
  leftText: { top: "25%" },
});
