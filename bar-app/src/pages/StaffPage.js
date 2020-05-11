import React, { Component } from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native";
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
          <View style={styles.navigationBar}>
            <StaffNavigationBar
              updateParentState={this.updateState.bind(this)}
            />
          </View>
          <View style={styles.screen}>
            {this.state.currentPage == 0 ? (
              <UnapprovedReservationPage />
            ) : (
              <ReservationPage />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  flexContainer: {
    flexDirection: "column-reverse",
  },
  screen: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#809fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navigationBar: {
    width: "100%",
    height: 100,
  },
});
