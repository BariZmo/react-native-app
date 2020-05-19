import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Modal,
  Image,
  PermissionsAndroid,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { Marker } from "react-native-maps";
import SampleBars from "C:/Users/Saulius/Documents/GitHub/react-native-app/bar-app/Admin/SampleBars.js";
import MadeMapStyle from "./mapStyle.json";
import Constants from "expo-constants";

export default function (props) {
  const [permission, setPremission] = useState(false);
  const [location, setLocation] = useState({
    latitude: 54.687157,
    longitude: 25.279652,
    error: "",
  });
  const [bars, setBars] = useState(SampleBars);
  const [modalVisibility, setModalVisibility] = useState(false);

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
      <Modal visible={modalVisibility} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <FlatList>
              
            </FlatList>
            <Button title="go back" onPress={() => setModalVisibility(false)} />
          </View>
        </View>
      </Modal>
      <MapView
        style={styles.map}
        customMapStyle={MadeMapStyle}
        provider={PROVIDER_GOOGLE}
        onPress={() => getLocation()}
        initialRegion={{
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
          onPress={() => { setModalVisibility(true); }}
        >
        </Marker>
        <Marker
          coordinate={{ latitude: 54.680635, longitude: 25.286344 }}
          onPress={() => { setModalVisibility(true);} }
        >
        </Marker>
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
  modal: {
    width: "80%",
    height: "80%",
    backgroundColor: "#ECA80B",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "space-between",
    left: "10%",
    top: "5%",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  touchable: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: "2%",
    backgroundColor: "#ECA80B",
    textDecorationColor: "black",
    textShadowColor: "white",
    textShadowRadius: 10,
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
  },
  list: {
    width: "90%",
    height: "80%",
    top: "2%",
  },
  clearButton: {
    borderRadius: 10,
    backgroundColor: "#ECA80B",
    height: "10%",
    width: "80%",
    top: "5%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  clearText: {
    fontSize: 20,
    top: "25%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
  },
  spacer: {
    paddingTop: "5%",
  },
  elementID: {
    width: "250",
  },
  elementDate: {
    width: "250",
  },
  elementBar: {
    width: "250",
    paddingHorizontal: 50,
  },
});
