import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

// *sort by date

export default function (props) {
  const [bars, setBars] = useState([]);
  const [needLoad, setNeedLoad] = useState(true);
  let fetchItems = () => {
    fetch(`https://barappbroker20200515061143.azurewebsites.net/bar/`)
      .then((response) => {
        setNeedLoad(false);
        return response.json();
      })
      .then((json) => {
        setBars(json);
      });
  };
  if (needLoad) fetchItems();
  function UserInfo({ infoElement }) {
    return (
      <View style={styles.user}>
        <View style={styles.titleLine}>
          <Text>Baras: "{infoElement.tradeName}"</Text>
        </View>
        <View style={styles.firstLine}>
          <TouchableHighlight
            underlayColor="#FFACAC"
            style={[styles.button, { backgroundColor: "#ff5c5c" }]}
            onPress={() => {
              Alert.alert("Pranešimas", "Naudotojas sėkmingai panaikintas");
            }}
          >
            <Text style={styles.buttonText}>PANAIKINTI</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#FFACAC"
            style={[styles.button, { backgroundColor: "#ff5c5c" }]}
            onPress={() => {
              // Add edit window
            }}
          >
            <Text style={styles.buttonText}>REDAGUOTI</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.secondLine}>
          <Text>Adresas: {infoElement.address}</Text>
        </View>
        <View style={styles.secondLine}>
          <Text>Tel. numeris: {infoElement.number}</Text>
        </View>
        <View style={styles.thirdLine}>
          <Text>El. paštas: {infoElement.email}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableHighlight
          style={{
            backgroundColor: "#158A51",
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
            borderWidth: 2,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Pridėti naują barą
          </Text>
        </TouchableHighlight>
      </View>
      <FlatList
        style={{ marginTop: 20, width: "100%" }}
        data={bars}
        renderItem={({ item }) => <UserInfo infoElement={item} />}
        keyExtractor={(user) => user.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  user: {
    width: "100%",
    paddingVertical: "2%",
    backgroundColor: "#53914d",
    marginBottom: 20,
  },
  titleLine: {
    justifyContent: "right",
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#acdba7",
    justifyContent: "space-between",
  },
  firstLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
  secondLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
  thirdLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
});
