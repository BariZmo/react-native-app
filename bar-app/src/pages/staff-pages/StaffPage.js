import React, { Component } from "react";
import { View, StyleSheet, BackHandler, Dimensions } from "react-native";
import StaffNavigationBar from "./StaffNavigationBar";
import UnapprovedReservationPage from "./UnapprovedReservationPage";
import ReservationPage from "./ReservationPage";

export default class StaffPage extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  updateState(data) {
    this.setState(data);
  }

  render() {
    BackHandler.addEventListener("hardwareBackPress", () => true);

    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <View style={styles.screen}>
            {this.state.currentPage == 0 ? (
              <UnapprovedReservationPage />
            ) : (
              <ReservationPage />
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
