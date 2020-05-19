import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextComponent,
  Modal,
} from "react-native";

// *sort by date

export default function (props) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Mantas",
      rating: 10,
      blocked: false,
      blockTime: 2,
      lastLogin: "2020-10-10",
    },
    {
      id: 2,
      name: "Paksas",
      rating: 5,
      blocked: true,
      blockTime: 200,
      lastLogin: "2020-08-08",
    },
    {
      id: 3,
      name: "Stano",
      rating: 2,
      blocked: false,
      blockTime: 0,
      lastLogin: "2020-05-05",
    },
    {
      id: 4,
      name: "Milano",
      rating: 4,
      blocked: false,
      blockTime: 0,
      lastLogin: "2020-12-11",
    },
    {
      id: 5,
      name: "Frukto",
      rating: 8,
      blocked: true,
      blockTime: 12,
      lastLogin: "2020-01-02",
    },
    {
      id: 6,
      name: "Venduto",
      rating: 9,
      blocked: false,
      blockTime: 0,
      lastLogin: "2020-09-22",
    },
  ]);

  function UserInfo({ infoElement }) {
    console.log(infoElement);
    if(infoElement.blocked){
    return (
      <View style={styles.user}>
      <View style={styles.titleLine}>
        <Text>Naudotojas: {infoElement.name}</Text>
      </View>
      <View style={styles.firstLine}>
      <Button color="#ff5c5c" title="Panaikinti"/>
      <Button color="#ff5c5c" title="Blokuoti"/>
      <Button color="#158a51" title="Siųsti pranesimą" />
      </View>
      <View style={styles.secondLine}>
        <Text>Statusas: Blokuotas</Text>
        <Text>ID: {infoElement.id}</Text>
        <Text>Reitingas: {infoElement.rating}</Text>
      </View>
      <View style={styles.thirdLine}>
        <Text>Blokuotas kartų: {infoElement.blockTime}</Text>
      </View>
      <View style={styles.fourthLine}>
        <Text>Paskutinį kartą prisijungė: {infoElement.lastLogin}</Text>
      </View>
    </View>
    );
  }
  return (
    <View style={styles.user}>
    <View style={styles.titleLine}>
      <Text>Naudotojas: {infoElement.name}</Text>
    </View>
    <View style={styles.firstLine}>
      <Button color="#ff5c5c" title="Panaikinti"/>
      <Button color="#ff5c5c" title="Blokuoti"/>
      <Button color="#158a51" title="Siųsti pranesimą" />
      </View>
      <View style={styles.secondLine}>
        <Text>Statusas: Aktyvus</Text>
        <Text>ID: {infoElement.id}</Text>
        <Text>Reitingas: {infoElement.rating}</Text>
      </View>
      <View style={styles.thirdLine}>
        <Text>Blokuotas kartų: {infoElement.blockTime}</Text>
      </View>
      <View style={styles.fourthLine}>
        <Text>Paskutinį kartą prisijungė: {infoElement.lastLogin}</Text>
      </View>
    </View>
  );
}

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserInfo infoElement={item} />}
        keyExtractor={(user) => user.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    width: "100%",
    paddingVertical: "5%",
    backgroundColor: "#53914d",
    marginBottom: 60,
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
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
  fourthLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
});
