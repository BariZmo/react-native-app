import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  Image,
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import MadeMapStyle from "./mapStyle.json";
import { Permissions, Location } from "expo";

export default function (params) {
  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        customMapStyle={MadeMapStyle}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 54.687157,
          longitude: 25.279652,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Marker
          coordinate={{ latitude: 54.687255, longitude: 25.214918 }}
          description="xdwde"
        ></Marker>
        <Marker
          coordinate={{ latitude: 54.680635, longitude: 25.286344 }}
        ></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 10,
    height: 10,
  },
  main: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
