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

  const SetImage = (com, index) => {
    var path;
    com == "userComponentsMain" && index == 1
      ? (path =
          "https://cdn4.iconfinder.com/data/icons/map-29/512/map-location-navigation-direction-10-512.png")
      : index == 1
      ? (path =
          "https://cdn3.iconfinder.com/data/icons/mixed-communication-and-ui-pack-1/48/general_pack_NEW_glyph_profile-512.png")
      : index == 0
      ? (path =
          "https://cdn0.iconfinder.com/data/icons/seo-39/64/create-event-calendar-date-book-reservation-512.png")
      : index == 2
      ? (path =
          "https://www.pinclipart.com/picdir/big/138-1388962_game-history-history-icon-vector-clipart.png")
      : null;

    return (
      <Image
        source={{
          uri: path,
        }}
        style={styles.img}
      />
    );
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
    marginTop: "7%",
    height: 50,
    width: 50,
  },
});

const stylesComponents = StyleSheet.create({
  //user
  G2: {
    justifyContent: "center",
    width: "40%",
    height: "100%",
    backgroundColor: "#ECA80B",
    borderColor: "black",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  G1: {
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "#ECA80B",
  },
  G3: {
    justifyContent: "center",
    width: "30%",
    height: "100%",
    backgroundColor: "#ECA80B",
  },
});
