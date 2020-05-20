import React, { useState, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Button,
  PermissionsAndroid,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { Marker } from "react-native-maps";
import MadeMapStyle from "../SharedItems/mapStyle.json";

var permission = false;
var location = { latitude: 54.687157, longitude: 25.279652, error: "" };

function setPermission(bool) {
  permission=bool;
}

function setLocation(latitude, longitude, error) {
  location.latitude=latitude;
  location.longitude=longitude;
}

export default class AdminMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
    if (!permission) {
      requestCameraPermission();
    }
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          // can do actions with marker's coordinates of marker here 
          // can do actions with marker's coordinates of marker here 
        }
      ]
    })
  }

  render() {
    return (
      <View style={styles.main}>
        <MapView 
          style={styles.map}
          customMapStyle={MadeMapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 54.687157,
            longitude: 25.279652,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
            onPress={this.handlePress}
        >
        {this.state.markers.map((marker) => {
          return (
            <Marker {...marker} >
              <Image
                style={styles.marker}
                source={{ uri: "https://codelabs.developers.google.com/codelabs/advanced-android-training-google-maps/img/3077e66f9f7a1a46.png"}}
              />
            </Marker>
          )
        })}
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={1000}
            fillColor={"rgba(255, 52, 52, 0.2)"}
          />
        </MapView>
    </View>
    );
  }
}

function getLocation() {
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

function requestCameraPermission() {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marker: {
    backgroundColor: "transparent",
    width: 40,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  },
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
  button: {
    backgroundColor: 'green',
    width: '30%',
  }
});

AppRegistry.registerComponent('maps', () => maps);