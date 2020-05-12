import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ShadowPropTypesIOS,
  Text,
} from "react-native";

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

  const GetUser = (com, setPageNav) => {
    {
      return eval(com).map((component, index) => (
        <View key={component} style={eval("stylesComponents.G" + (index + 1))}>
          <Button
            style={styles.button}
            title={component}
            onPress={
              com == "userComponentsMain" && index == 1
                ? () => setPageNav(4)
                : () => setPageNav(index + 1)
            }
          />
        </View>
      ));
    }
  };

  const SelectRole = (state, role, setPageNav, value) => {
    var com;
    if (role == "user") {
      value != 2 ? (com = "userComponenets") : (com = "userComponentsMain");
    } else if (role == "admin") {
      com = "adminComponenets";
    } else if (role == "bar") {
      com = "barComponents";
    }
    return GetUser(com, setPageNav, value);
  };

  return (
    <View style={styles.navBarr}>
      {SelectRole(props.status, props.role, props.SetStatus, props.seting)}
    </View>
  );
}

const styles = StyleSheet.create({
  navBarr: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "red",
  },
  button: {
    height: "100%",
  },
});

const stylesComponents = StyleSheet.create({
  //user
  G2: {
    justifyContent: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "purple",
  },

  G1: {
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "green",
  },
  G3: {
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "blue",
  },
});
