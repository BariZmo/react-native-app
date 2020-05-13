import React, { useState } from "react";
import {
  Text,
  View,
  BackHandler,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {} from "react-native-gesture-handler";
import { SampleAcceptedReservations } from "./SampleAcceptedReservations";
import { styles, itemStyles, modalStyles } from "./ReservationListStyles";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [reservations, setReservations] = useState(SampleAcceptedReservations);
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

  const sendHandler = (id) => {
    setSelectedItem(id);
    // TODO: open reportView
    console.log("send");
  };

  const evaluateHandler = (id) => {
    setSelectedItem(id);
    // TODO: open evaluationView
    console.log("evaluate");
  };

  return (
    <View style={styles.container}>
      {reservations.length == 0 ? (
        <Text style={styles.title}>
          Nepraėjusių patvirtintų rezervacijų nerasta.
        </Text>
      ) : (
        <Text style={styles.title}>
          Viso {reservations.length} nepraėjusios patvirtinta(-os) rezervacijos:
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
              setTimeout(function () {
                setMenuOpen(false);
              }, 1);
            }}
            underlayColor={"white"}
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
            sendHandler={sendHandler}
            evaluateHandler={evaluateHandler}
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

function ListItem({
  item,
  removeHandler,
  openHandler,
  sendHandler,
  evaluateHandler,
}) {
  return (
    <View style={itemStyles.item}>
      <View style={itemStyles.firstRow}>
        <Text style={itemStyles.name}>{item.name}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[itemStyles.sendButton, itemStyles.buttonStyle]}
          onPress={() => {
            sendHandler(item.id);
          }}
        >
          <Text>Siųsti</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[itemStyles.evaluateButton, itemStyles.buttonStyle]}
          onPress={() => {
            evaluateHandler(item.id);
          }}
        >
          <Text>Įvertinti</Text>
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
