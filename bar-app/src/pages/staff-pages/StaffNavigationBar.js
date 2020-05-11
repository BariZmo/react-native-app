import React, { Component } from "react";
import { Text, View, StyleSheet, BackHandler, Dimensions } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight,
} from "react-native-gesture-handler";

export default class StaffNavigationBar extends Component {
  updateParentState(data) {
    this.props.updateParentState(data);
  }

  render() {
    BackHandler.addEventListener("hardwareBackPress", () => true);

    return (
      <View style={styles.navigationBar}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            this.updateParentState({ currentPage: 0 });
          }}
          underlayColor={"#bde8f6"}
        >
          <Text style={styles.buttonText}>Nepatvirtintos registracijos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            this.updateParentState({ currentPage: 1 });
          }}
          underlayColor={"#bde8f6"}
        >
          <Text style={styles.buttonText}>Patvirtintos registracijos</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    width: Dimensions.get("screen").width / 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    justifyContent: "center",
    alignContent: "center",
    color: "black",
    textAlign: "center",
    elevation: 5,
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 1,
  },
});
