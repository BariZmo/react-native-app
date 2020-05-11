import React, { useState } from "react";
import { Text, View, StyleSheet, BackHandler, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [reservations, setReservations] = useState([
    { name: "Jonas", otherPeople: 0, date: "2020-05-11 23:55", key: 0 },
    { name: "Petras", otherPeople: 2, date: "2020-05-13 22:10", key: 1 },
    { name: "Juozas", otherPeople: 1, date: "2020-05-12 20:20", key: 2 },
    { name: "Klevas", otherPeople: 4, date: "2020-05-10 00:10", key: 3 },
    { name: "Giedrius", otherPeople: 0, date: "2020-05-14 20:40", key: 4 },
    { name: "Antanas", otherPeople: 3, date: "2020-05-17 21:15", key: 5 },
    { name: "Juozapas", otherPeople: 2, date: "2020-05-11 20:45", key: 6 },
    { name: "Smetona", otherPeople: 1, date: "2020-05-10 23:25", key: 7 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Šiuo metu aktualios nepatvirtintos rezervacijos:
      </Text>
      <FlatList
        data={reservations}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            partySize={item.otherPeople + 1}
            date={item.date}
          />
        )}
      ></FlatList>
    </View>
  );
}

function ListItem({ name, partySize, date }) {
  return (
    <View style={styles.item}>
      <View style={styles.firstRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>Reikalinga {partySize} vieta(-os).</Text>
      </View>
      <Text style={styles.detail}>Atvykimo laikas: {date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    color: "white",
    paddingTop: 30,
    margin: 10,
  },
  container: {
    marginTop: 30,
    marginBottom: 50,
    width: "100%",
  },
  item: {
    backgroundColor: "white",
    alignSelf: "stretch",
    margin: 10,
  },
  name: {
    fontSize: 20,
    padding: 5,
  },
  detail: {
    fontSize: 14,
    padding: 5,
  },
});
