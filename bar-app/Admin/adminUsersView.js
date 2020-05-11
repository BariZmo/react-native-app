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
    return (
      <View style={styles.user}>
        <View style={styles.firstLine}>
          <Text>ID: {infoElement.id}</Text>
          <Text>name: {infoElement.name}</Text>
          <Text>rating: {infoElement.rating}</Text>
          <Button title="Blokuoti" />
        </View>
        <View style={styles.secondLine}>
          <Text>blocked: {String(infoElement.blocked)}</Text>
          <Text>blockTime: {infoElement.blockTime}</Text>
          <Button title="Panaikinti" />
        </View>
        <Text>lastLogin: {infoElement.lastLogin}</Text>
        <Button title="Pranesimas" />
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
  },
  firstLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  secondLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
});
