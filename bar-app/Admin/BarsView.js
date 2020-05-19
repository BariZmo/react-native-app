import React, { useState } from "react";
import {
  Text,
  View,
  BackHandler,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {} from "react-native-gesture-handler";
import { SampleBars } from "./SampleBars";
import { styles, itemStyles, modalStyles } from "./BarListStyles";

export default function () {
  BackHandler.addEventListener("hardwareBackPress", () => true);

  const [reservations, setReservations] = useState(SampleBars);
  // selectedItem is identified by id
  const [selectedItem, setSelectedItem] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  const removeHandler = (id) => {
    setReservations((prevReservations) => {
      return prevReservations.filter((reservations) => reservations.id != id);
    });
  };

  const openHandler = (id) => {
    setSelectedItem(id);
    setMenuOpen(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={itemStyles.addButton}>
        <Image
            style={itemStyles.icon}
            source={{ uri: "https://images-na.ssl-images-amazon.com/images/I/412rXWdCJ7L.png"}}
          >
        </Image>
      </TouchableOpacity>
      {reservations.length == 0 ? (
        <Text style={styles.title}>
          Barų nerasta.
        </Text>
      ) : (
        <Text style={styles.title}
              >
          
          Viso {reservations.length} barų:
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
            Adresas: {getReservation(reservations, selectedItem).address}
          </Text>
          <Text style={modalStyles.entry}>
            El. paštas: {getReservation(reservations, selectedItem).email}
          </Text>
          <Text style={modalStyles.entry}>
            Tel. nr.: {getReservation(reservations, selectedItem).number}
          </Text>
          <Text style={modalStyles.name}>
            {getReservation(reservations, selectedItem).tradeName}
          </Text>
          <Text style={modalStyles.title}>
            Išsami informacija apie barą:
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
  const reservation = reservations.find((res) => {
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
        <Text style={itemStyles.name}>{item.tradeName}</Text>
        <View style={{ width: 75 }}></View>
      </View>
      <View style={itemStyles.firstRow}>
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
