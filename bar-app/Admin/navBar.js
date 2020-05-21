import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ShadowPropTypesIOS,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

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

  const SetImage = (com, index) => {
    var path;
    com == "userComponentsMain" && index == 1
      ? (path = "Pagrindinis")
      : index == 1
      ? (path = "Pagrindinis")
      : index == 0
      ? (path = "Naudotojai")
      : index == 2
      ? (path = "Barai")
      : null;

    return <Text style={styles.img}>{path}</Text>;
  };

  const GetUser = (com, setPageNav) => {
    {
      return eval(com).map((component, index) => (
        <View key={component} style={eval("stylesComponents.G" + (index + 1))}>
          <TouchableOpacity
            style={styles.button}
            title={component}
            onPress={
              com == "userComponentsMain" && index == 1
                ? () => setPageNav(4)
                : () => setPageNav(index + 1)
            }
          >
            {SetImage(com, index)}
          </TouchableOpacity>
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
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    height: "100%",
    alignItems: "center",
  },
  img: {
    alignItems: "center",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 17,
  },
});

const stylesComponents = StyleSheet.create({
  //user
  G2: {
    justifyContent: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "#158a51",
    borderColor: "black",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  G1: {
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "#158a51",
  },
  G3: {
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "#158a51",
  },
});
