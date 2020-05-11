import React, { useState } from "react";
import { Text, View, StyleSheet, BackHandler, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SampleReservations } from "./SampleReservations";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [reservations, setReservations] = useState(SampleReservations);

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
