import React, { useState } from "react";
import { View, StyleSheet, Button, ShadowPropTypesIOS } from "react-native";

import Component from "./components/navBarComponent";

export default function (props) {
  const [componentsNM, setComponentNM] = useState([
    "reservations",
    "main",
    "history",
  ]);

  const [componentsM, setComponentM] = useState([
    "reservations",
    "map",
    "history",
  ]);

  const getNavLayout = (state) => {
    {
      var com;
      state ? (com = "componentsNM") : (com = "componentsM");

      return eval(com).map((component) => (
        <View key={component} style={eval("stylesComponents." + component)}>
          <Button title={component} />
        </View>
      ));
    }
  };

  return <View style={styles.navBar}>{getNavLayout(props.status)}</View>;
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
  main: {
    justifyContent: "center",

    flex: 4,
    backgroundColor: "purple",
  },
  map: {
    justifyContent: "center",
    flex: 4,
    backgroundColor: "orange",
  },
  reservations: {
    justifyContent: "center",
    flex: 3,
    backgroundColor: "green",
  },
  history: {
    flex: 3,
    justifyContent: "center",
    backgroundColor: "blue",
  },
});
