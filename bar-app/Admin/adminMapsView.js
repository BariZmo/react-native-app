import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  List,
  Button,
  TextInput,
  Modal,
  Image,
  PermissionsAndroid,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { Marker } from "react-native-maps";
import { SampleBars } from "./../Admin/SampleBars";
import MadeMapStyle from "../SharedItems/mapStyle.json";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from "react-dom";

export default function (props) {
  const [permission, setPermission] = useState(false);
  const [location, setLocation] = useState({
    latitude: 54.687157,
    longitude: 25.279652,
    error: "",
  });
  const [bars, setBars] = useState(SampleBars);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState({
    latitude: 0,
    longitude: 0,
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

      setPermission(true);
      getLocation();
    } catch (err) {
      console.warn(err);
    }
  };

  if (!permission) {
    requestCameraPermission();
  }

  const placeMarker = (selectedCoordinate) => {
      <Marker
        coordinate={{
          latitude: selectedCoordinate.latitude,
          longitude: selectedCoordinate.longitude,
        }}>
          <View>
            <Text>asdasf</Text>
          </View>
      </Marker>
  }

  return (
    <View style={styles.main}>
      <Modal visible={modalVisibility} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>{ getBar(bars, selectedCoordinate).tradeName }</Text>
            <Image
              style={styles.imagePortrait}
              source={{ uri: "https://cdn.foodhospitality.in/wp-content/uploads/2020/05/18182620/Vikram-Achanta_Co-founder-of-30BestBarsIndia.jpg"}}
            />
            <Text style={styles.modalText}>number: { getBar(bars, selectedCoordinate).number }</Text>
            <Text style={styles.modalText}>email: { getBar(bars, selectedCoordinate).email }</Text>
            <Text style={styles.modalText}>address: { getBar(bars, selectedCoordinate).address }</Text>
            <View style={ styles.container }>
              <Button style={ styles.button } title="Grįžti" onPress={() => setModalVisibility(false)} />
              <Button style={ styles.button } title="Redaguoti" />
            </View>
          </View>
        </View>
      </Modal>
      <MapView
        style={styles.map}
        customMapStyle={MadeMapStyle}
        provider={PROVIDER_GOOGLE}
        onPress={(e) => { 
          setSelectedCoordinate({ 
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
           });
          placeMarker(selectedCoordinate); 
        }}
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
          onPress={() => {
            setSelectedCoordinate({ latitude: 54.687255, longitude: 25.214918 });
            setModalVisibility(true); 
          }}
        >
        </Marker>
        <Marker
          coordinate={{ latitude: 54.680635, longitude: 25.286344 }}
          onPress={() => { 
            setSelectedCoordinate({ latitude: 54.680635, longitude: 25.286344 });
            setModalVisibility(true);
          }}
        >
        </Marker>
      </MapView>
    </View>
  );
}

function getBar(bars, selectedCoordinate) {
  var bar = bars.find((b) => {
    return b.longitude == selectedCoordinate.longitude && b.latitude == selectedCoordinate.latitude;
  });
  if (bar != undefined) return bar;
  else
    return {
      tradeName: "tr",
      number: "nu",
      email: "em",
      address: "ad",
      id: 0,
      latitude: 0,
      longitude: 0,
    };
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
    top: "2%",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  imagePortrait: {
    width: 240,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'green',
    width: '30%',
  }
});
