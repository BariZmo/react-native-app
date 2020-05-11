import React, { useState } from "react";
import { Text, View, StyleSheet, BackHandler, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [reservations, setReservations] = useState([
    { name: "Jonas", otherPeople: 0, date: "2020-05-11 23:55", id: 0 },
    { name: "Petras", otherPeople: 2, date: "2020-05-13 22:10", id: 1 },
    { name: "Juozas", otherPeople: 1, date: "2020-05-12 20:20", id: 2 },
    { name: "Klevas", otherPeople: 4, date: "2020-05-10 00:10", id: 3 },
    { name: "Giedrius", otherPeople: 0, date: "2020-05-14 20:40", id: 4 },
    { name: "Antanas", otherPeople: 3, date: "2020-05-17 21:15", id: 5 },
    { name: "Juozapas", otherPeople: 2, date: "2020-05-11 20:45", id: 6 },
    { name: "Smetona", otherPeople: 1, date: "2020-05-10 23:25", id: 7 },
  ]);

  const removeHandler = (id) => {
    setReservations((prevReservations) => {
      return prevReservations.filter((reservation) => reservation.id != id);
    });
  };

  return (
    <View style={styles.container}>
      {reservations.length == 0 ? (
        <Text style={styles.title}>Nepatvirtintų rezervacijų nerasta.</Text>
      ) : (
        <Text style={styles.title}>
          Viso {reservations.length} nepatvirtinta(-os) rezervacijos:
        </Text>
      )}
      <FlatList
        data={reservations}
        renderItem={({ item }) => (
          <ListItem item={item} handler={removeHandler} />
        )}
      ></FlatList>
    </View>
  );
}

function ListItem({ item, handler }) {
  return (
    <View style={itemStyles.item}>
      <View style={itemStyles.firstRow}>
        <Text style={itemStyles.name}>{item.name}</Text>
        <Text style={itemStyles.detail}>
          Reikalinga {item.otherPeople + 1} vieta(-os).
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[itemStyles.acceptButton, itemStyles.buttonStyle]}
          // TODO: move accepted reservation to "all reservations"
          onPress={() => {
            handler(item.id);
          }}
        >
          <Text>Priimti</Text>
        </TouchableOpacity>
      </View>
      <View style={itemStyles.firstRow}>
        <Text style={itemStyles.detail}>Atvykimo laikas: {item.date}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[itemStyles.itemButton, itemStyles.buttonStyle]}
        >
          <Text>Daugiau</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[itemStyles.cancelButton, itemStyles.buttonStyle]}
          onPress={() => {
            handler(item.id);
          }}
        >
          <Text>Atšaukti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const itemStyles = StyleSheet.create({
  buttonStyle: {
    padding: 5,
    margin: 5,
    width: 75,
    alignSelf: "flex-end",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  itemButton: {
    backgroundColor: "lightgrey",
  },
  acceptButton: {
    backgroundColor: "palegreen",
  },
  cancelButton: {
    backgroundColor: "coral",
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flex: 1,
    backgroundColor: "white",
    alignSelf: "stretch",
    margin: 10,
    borderRadius: 10,
  },
  name: {
    flex: 1,
    fontSize: 18,
    padding: 5,
  },
  detail: {
    flex: 2,
    fontSize: 14,
    padding: 5,
  },
});

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    color: "white",
    paddingTop: 10,
    margin: 10,
  },
  container: {
    marginTop: 30,
    marginBottom: 50,
    width: "100%",
    flex: 1,
  },
});
