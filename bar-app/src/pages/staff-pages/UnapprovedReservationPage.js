import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {} from "react-native-gesture-handler";
import { SampleReservations } from "./SampleReservations";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [reservations, setReservations] = useState(SampleReservations);
  // selectedItem is identified by id
  const [selectedItem, setSelectedItem] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  const removeHandler = (id) => {
    setReservations((prevReservations) => {
      return prevReservations.filter((reservation) => reservation.id != id);
    });
  };

  const openHandler = (id) => {
    setSelectedItem(id);
    setMenuOpen(true);
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
      <Modal
        style={modalStyles.modal}
        transparent={true}
        visible={menuOpen}
        onRequestClose={() => {
          setMenuOpen(false);
        }}
      >
        <View style={modalStyles.modalBase}>
          <TouchableHighlight
            style={modalStyles.continueButton}
            activeOpacity={0.5}
            onPress={() => {
              setMenuOpen(false);
            }}
          >
            <Text>Tęsti</Text>
          </TouchableHighlight>
          <Text style={modalStyles.entry}>
            Atvykimo data: {getReservation(reservations, selectedItem).date}
          </Text>
          <Text style={modalStyles.entry}>
            El. paštas: {getReservation(reservations, selectedItem).email}
          </Text>
          <Text style={modalStyles.entry}>
            Tel. nr.: {getReservation(reservations, selectedItem).number}
          </Text>
          <Text style={modalStyles.entry}>
            Viso lankytojų:{" "}
            {getReservation(reservations, selectedItem).otherPeople + 1}
          </Text>
          <Text style={modalStyles.name}>
            {getReservation(reservations, selectedItem).name +
              " " +
              getReservation(reservations, selectedItem).surname}
          </Text>
          <Text style={modalStyles.title}>
            Išsami informacija apie lankytoją:
          </Text>
        </View>
      </Modal>
      <FlatList
        data={reservations}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            removeHandler={removeHandler}
            openHandler={openHandler}
          />
        )}
      ></FlatList>
    </View>
  );
}

function getReservation(reservations, id) {
  reservation = reservations.find((res) => {
    return res.id == id;
  });
  if (reservation != undefined) return reservation;
  else
    return {
      name: "",
      surname: "",
      number: "",
      email: "",
      otherPeople: 0,
      date: "",
      id: 0,
    };
}

function ListItem({ item, removeHandler, openHandler }) {
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
            removeHandler(item.id);
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
          onPress={() => {
            openHandler(item.id);
          }}
        >
          <Text>Daugiau</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[itemStyles.cancelButton, itemStyles.buttonStyle]}
          onPress={() => {
            removeHandler(item.id);
          }}
        >
          <Text>Atšaukti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modal: {},
  modalBase: {
    backgroundColor: "#EEEEEE",
    flex: 1,
    borderRadius: 20,
    marginTop: "30%",
    marginBottom: "40%",
    marginLeft: "5%",
    marginRight: "5%",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
  },
  continueButton: {
    alignSelf: "flex-end",
    margin: 10,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 15,
    width: 75,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    padding: 5,
    margin: 10,
  },
  entry: {
    fontSize: 16,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
  },
  name: {
    fontSize: 20,
    padding: 5,
    margin: 5,
    fontWeight: "bold",
  },
});

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
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
  },
  detail: {
    flex: 1.5,
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
