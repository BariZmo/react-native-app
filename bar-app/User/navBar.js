import React, { useState } from "react";
import { View, StyleSheet, Button, ShadowPropTypesIOS } from "react-native";

import Component from "./components/navBarComponent";

export default function (props) {
  const [userComponenets, setUserComponents] = useState([
    "reservations",
    "main",
    "history",
  ]);

  const [userComponentsMain, setUserComponentsMain] = useState([
    "reservations",
    "map",
    "history",
  ]);

  /// admin
  const [adminComponenets, setAdminComponents] = useState([
    "bars",
    "main",
    "users",
  ]);

  ///
  const [barComponents, setBarComponents] = useState([
    "reservations",
    "main",
    "pending reservations",
  ]);

  const GetUser = (com) => {
    {
      return eval(com).map((component, index) => (
        <View key={component} style={eval("stylesComponents.G" + (index + 1))}>
          <Button title={component} />
        </View>
      ));
    }
  };

  const SelectRole = (state, role) => {
    var com;
    if (role == "user") {
      state ? (com = "userComponenets") : (com = "userComponentsMain");
      return GetUser(com);
    } else if (role == "admin") {
      com = "adminComponenets";
      return GetUser(com);
    } else if (role == "bar") {
      com = "barComponents";
      return GetUser(com);
    }
  };

  return (
    <View style={styles.navBar}>{SelectRole(props.status, props.role)}</View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",

    backgroundColor: "red",
  },
});

const stylesComponents = StyleSheet.create({
  //user
  G2: {
    justifyContent: "center",
    flex: 4,
    backgroundColor: "purple",
  },

  G1: {
    justifyContent: "center",
    flex: 3,
    backgroundColor: "green",
  },
  G3: {
    flex: 3,
    justifyContent: "center",
    backgroundColor: "blue",
  },
});
