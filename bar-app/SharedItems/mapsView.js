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
        >
          <Image
            style={styles.icon}
            source={{
              uri:
                "https://media.istockphoto.com/photos/brunette-young-man-with-chain-picture-id820105644?k=6&m=820105644&s=612x612&w=0&h=08rFDvFrzrxQZwnanG8dK_SFKE5kAdOKlB3emeT0QiU=",
            }}
          />
        </Marker>
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
    height: "90%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
