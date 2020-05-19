import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  Image,
  PermissionsAndroid,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { Marker } from "react-native-maps";
import MadeMapStyle from "./mapStyle.json";
import Constants from "expo-constants";

export default function (props) {
  const [permission, setPremission] = useState(false);
  const [location, setLocation] = useState({
    latitude: 54.687157,
    longitude: 25.279652,
    error: "",
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      (error) => setLocation({ error: error.message }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 };
    });
    console.log(location);
  };

  const requestCameraPermission = () => {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Very nice good app asks your location <333333",
          message: "Pls press confirm by pressing right OK",
          buttonNeutral: "OK", //askmelatter
          buttonNegative: "OK", //No
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the maps");
      } else {
        console.log("Maps permission denied");
      }

      setPremission(true);
      getLocation();
    } catch (err) {
      console.warn(err);
    }
  };

  if (!permission) {
    requestCameraPermission();
  }

  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        customMapStyle={MadeMapStyle}
        provider={PROVIDER_GOOGLE}
        onPress={() => getLocation()}
        region={{
          latitude: 54.687157,
          longitude: 25.279652,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={1000}
          fillColor={"rgba(255, 52, 52, 0.2)"}
        />
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
