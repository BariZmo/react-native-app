import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function () {
  const [reservations, setReservations] = useState([]);
  const [needLoad, setNeedLoad] = useState(true);

  let loadReservations = () =>
    fetch("https://barappbroker20200515061143.azurewebsites.net/reservation")
      .then((response) => {
        console.log("Loaded reservations.");
        setNeedLoad(false);
        return response.json();
      })
      .then((json) => {
        let myReservations = json.filter((res) => res.userId == global.loginId);
        if (myReservations != undefined) {
          fetch("https://barappbroker20200515061143.azurewebsites.net/bar")
            .then((response) => response.json())
            .then((barJson) => {
              myReservations.forEach((res) => {
                let myBar = barJson.find((b) => res.barId == b.id);
                if (myBar != undefined) {
                  res.bar = myBar.tradeName;
                }
              });

              setReservations(myReservations);
            });
        }
      });
  if (needLoad) loadReservations();

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
    console.log("More information");
  };

  const RightActions = ({ progress, dragX, id }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.rightBack}>
        <TouchableOpacity
          style={styles.swipeTouch}
          onPress={() => {
            fetch(
              `https://barappbroker20200515061143.azurewebsites.net/reservation/${id}`,
              { method: "DELETE" }
            ).then(() => setNeedLoad(true));
          }}
        >
          <Animated.Text style={[styles.rightText, { transform: [{ scale }] }]}>
            Atšaukti
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  function Item({ infoElement }) {
    return (
      <Swipeable
        renderLeftActions={LeftActions}
        onSwipeableLeftOpen={LeftActionOpen}
        renderRightActions={(progress, dragX) => (
          <RightActions progress={progress} dragX={dragX} id={infoElement.id} />
        )}
        onSwipeableRightOpen={(progress, dragX) => (
          <RightActions progress={progress} dragX={dragX} id={infoElement.id} />
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

  return (
    <View style={styles.main}>
      <FlatList
        data={reservations}
        renderItem={({ item }) => <Item infoElement={item} />}
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
