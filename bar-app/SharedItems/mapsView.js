import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  PermissionsAndroid,
  Alert,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { Marker } from "react-native-maps";
import MadeMapStyle from "./mapStyle.json";

export default function (props) {
  const [permission, setPremission] = useState(false);
  const [location, setLocation] = useState({
    latitude: 54.687157,
    longitude: 25.279652,
    error: "",
  });
  const [bars, setBars] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedLat, setSelectedLat] = useState(-1);
  const [selectedLong, setSelectedLong] = useState(-1);

  const [inputDate, setInputDate] = useState("");

  const [needLoad, setNeedLoad] = useState(true);
  let fetchData = () => {
    fetch("https://barappbroker20200515061143.azurewebsites.net/bar")
      .then((response) => {
        setNeedLoad(false);
        console.log("Bars loaded.");
        return response.json();
      })
      .then((json) => {
        json.forEach((b) => {
          let match = b.coordinates.match(/\d{0,}\.\d{0,}/g);
          b.latitude = parseFloat(match[0]);
          b.longitude = parseFloat(match[1]);
        });
        setBars(json);
      });
  };
  if (needLoad) fetchData();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      (error) => setLocation({ error: error.message }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 };
    });
  };

  const requestCameraPermission = () => {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "",
          message: "",
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
            <Text style={styles.modalTitle}>
              {getBar(bars, selectedLat, selectedLong).tradeName}
            </Text>
            <Text style={styles.modalText}>
              Tel. nr.: {getBar(bars, selectedLat, selectedLong).number}
            </Text>
            <Text style={styles.modalText}>
              El. paštas: {getBar(bars, selectedLat, selectedLong).email}
            </Text>
            <Text style={styles.modalText}>
              Adresas: {getBar(bars, selectedLat, selectedLong).address}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={"Apsilankymo data"}
              placeholderTextColor={"white"}
              value={inputDate}
              onChangeText={(text) => setInputDate(text)}
            ></TextInput>
            <View style={styles.container}>
              <TouchableHighlight
                style={styles.modalButton}
                onPress={() => {
                  setInputDate("");
                  setModalVisibility(false);
                }}
                underlayColor={"#bde8f6"}
              >
                <Text>Grįžti</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.modalButton}
                onPress={() => {
                  let json = JSON.stringify({
                    id: -1,
                    userId: global.loginId,
                    barId: getBar(bars, selectedLat, selectedLong).id,
                    otherPeople: 0,
                    date: inputDate,
                    accepted: false,
                  });

                  fetch(
                    "https://barappbroker20200515061143.azurewebsites.net/reservation",
                    {
                      method: "POST",
                      body: json,
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  ).then(() => {
                    Alert.alert(
                      "Pranešimas",
                      "Apie rezervaciją pranešta barui, laukite patvirtinimo",
                      [
                        {
                          text: "Tęsti",
                          onPress: () => {},
                        },
                      ]
                    );
                    setModalVisibility(false);
                    setInputDate("");
                  });
                }}
                underlayColor={"#bde8f6"}
              >
                <Text>Rezervuoti</Text>
              </TouchableHighlight>
            </View>
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
        {bars.map((prop) => (
          <Marker
            key={prop.id}
            coordinate={{
              latitude: prop.latitude,
              longitude: prop.longitude,
            }}
            onPress={() => {
              setSelectedLat(prop.latitude);
              setSelectedLong(prop.longitude);
              setModalVisibility(true);
            }}
          ></Marker>
        ))}
      </MapView>
    </View>
  );
}

function getBar(bars, latitude, longitude) {
  var bar = bars.find((b) => {
    return b.longitude == longitude && b.latitude == latitude;
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
    height: "70%",
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
  modalButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "skyblue",
    borderRadius: 15,
    borderWidth: 1,
  },
  imagePortrait: {
    width: 240,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 16,
  },
  modalInput: {
    backgroundColor: "#ECD80B",
    borderRadius: 15,
    borderWidth: 2,
    width: "80%",
    height: 40,
    padding: 3,
  },
  modalTitle: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 25,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "green",
    width: "30%",
  },
});
