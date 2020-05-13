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
    marginTop: "10%",
  },
  swipeTouch: {
    width: "100%",
    height: "100%",
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
    borderRadius: 15,

    height: "100%",
    top: "5%",
    flex: 1,
  },
  leftText: { top: "25%", fontWeight: "600", marginLeft: "5%" },
  rightBack: {
    backgroundColor: "red",
    borderRadius: 15,
    flex: 1,
    height: "100%",
    top: "5%",
  },
  rightText: {
    top: "25%",
    fontWeight: "900",
    marginLeft: "75%",
  },
});
