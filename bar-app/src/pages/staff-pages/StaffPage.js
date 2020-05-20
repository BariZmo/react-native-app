import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import StaffNavigationBar from "./StaffNavigationBar";
import UnapprovedReservationPage from "./UnapprovedReservationPage";
import ReservationPage from "./ReservationPage";
import BarAccountPage from "./BarAccountPage";

const BackAlert = () =>
  new Promise((resolve) => {
    Alert.alert(
      "Pranešimas:",
      "Ar tikrai norite atsijungti?",
      [
        {
          text: "Taip",
          onPress: () => {
            resolve("Yes");
          },
        },
        {
          text: "Ne",
          onPress: () => {
            resolve("No");
          },
        },
      ],
      { cancelable: false }
    );
  });

export default class StaffPage extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  updateState(data) {
    this.setState(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View style={styles.screen}>
            {this.state.currentPage == 0 ? (
              <UnapprovedReservationPage />
            ) : this.state.currentPage == 1 ? (
              <ReservationPage />
            ) : (
              <BarAccountPage />
            )}
          </View>
          <View style={styles.navigationBar}>
            <StaffNavigationBar
              updateParentState={this.updateState.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flexDirection: "column",
  },
  screen: {
    height: "100%",
    backgroundColor: "#809fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navigationBar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
