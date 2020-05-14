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
  Animated,
} from "react-native";
import { GestureHandler } from "expo";
import Swipeable from "react-native-gesture-handler/Swipeable";

// *sort by date

export default function (props) {
  // temp, sb from props
  const [infoArray, setInfoArray] = useState([
    { id: 1, date: "2020 - 08 - 08", bar: "stikliai", confirmed: true },
    { id: 2, date: "2020 - 05 - 10", bar: "solento", confirmed: false },
    { id: 3, date: "2020 - 08 - 08", bar: "tv", confirmed: true },
    { id: 4, date: "2020 - 05 - 10", bar: "bokstas", confirmed: false },
    { id: 5, date: "2020 - 08 - 08", bar: "pasaku", confirmed: true },
    { id: 6, date: "2020 - 05 - 10", bar: "parkas", confirmed: false },
    { id: 7, date: "2020 - 08 - 08", bar: "gedimino", confirmed: true },
    { id: 8, date: "2020 - 05 - 10", bar: "pilis", confirmed: false },
    { id: 9, date: "2020 - 08 - 08", bar: "inkilu", confirmed: true },
    { id: 10, date: "2020 - 05 - 10", bar: "rojus", confirmed: false },
    { id: 11, date: "2020 - 08 - 08", bar: "gatves", confirmed: true },
    { id: 12, date: "2020 - 05 - 10", bar: "virtis", confirmed: false },
  ]);

  const [info, setInfo] = useState();

  const [modalVisibility, setModalVisibility] = useState(false);

  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.leftBack}>
        <Animated.Text style={[styles.leftText, { transform: [{ scale }] }]}>
          Daugiau informacijos
        </Animated.Text>
      </View>
    );
  };
  const LeftActionOpen = () => {
    console.log("more info");
  };

  const RightActions = ({ progress, dragX, index }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.rightBack}>
        <TouchableOpacity
          style={styles.swipeTouch}
          onPress={() => DeleteAction(index)}
        >
          <Animated.Text style={[styles.rightText, { transform: [{ scale }] }]}>
            Atšaukti
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DeleteAction = (index) => {
    var arr = infoArray;
    arr.splice(index, 1);
    setInfoArray([...arr]);
  };

  function Item({ infoElement, infoIndex }) {
    return (
      <Swipeable
        renderLeftActions={LeftActions}
        onSwipeableLeftOpen={LeftActionOpen}
        renderRightActions={(progress, dragX) => (
          <RightActions progress={progress} dragX={dragX} index={infoIndex} />
        )}
        onSwipeableRightOpen={(progress, dragX) => (
          <RightActions progress={progress} dragX={dragX} index={infoIndex} />
        )}
      >
        <View style={styles.spacer}></View>
        <View style={styles.touchable}>
          <View>
            <View style={styles.row}>
              <Text style={styles.constText}>Baras: </Text>
              <Text style={styles.dynamicText}>{infoElement.bar}</Text>
            </View>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.constText}>Data: </Text>
              <Text style={styles.dynamicText}>{infoElement.date}</Text>
            </View>
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
        renderItem={({ item, index }) => (
          <Item infoElement={item} infoIndex={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "90%",
    width: "80%",
    marginTop: "10%",
  },
  swipeTouch: {
    width: "100%",
    height: "100%",
  },
  swipeMain: {
    backgroundColor: "red",
  },
  touchable: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: "2%",
    backgroundColor: "#ECA80B",
    textDecorationColor: "yellow",
    textShadowColor: "red",
    textShadowRadius: 1,
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
  },
  list: {
    width: "100%",
  },
  row: {
    flexDirection: "row",

    width: "100%",
  },
  spacer: {
    width: "100%",
    marginTop: "5%",
    backgroundColor: "red",
  },

  leftBack: {
    backgroundColor: "#4B8302",
    borderRadius: 15,
    borderWidth: 1,
    height: "80%",
    top: "5%",
    flex: 1,
  },
  leftText: { top: "25%", fontWeight: "600", marginLeft: "5%" },
  rightBack: {
    backgroundColor: "#E62626",
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    height: "80%",
    marginTop: "5%",
  },
  rightText: {
    top: "25%",
    fontWeight: "900",
    marginLeft: "75%",
  },

  constText: {
    color: "black",
  },
  dynamicText: {
    color: "white",
  },
});
