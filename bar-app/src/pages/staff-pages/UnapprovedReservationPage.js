import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { styles, itemStyles, modalStyles } from "./ReservationListStyles";

export default function () {
  const [reservations, setReservations] = useState([]);
  // selectedItem is identified by id
  const [selectedItem, setSelectedItem] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [needToLoad, setNeedToLoad] = useState(true);

  // Load reservations from broker
  let fetchData = () => {
    fetch("https://barappbroker20200515061143.azurewebsites.net/reservation")
      .then((response) => {
        setNeedToLoad(false);
        console.log("Received unapproved reservations.");
        return response.json();
      })
      .then((responseJson) => {
        fetch("https://barappbroker20200515061143.azurewebsites.net/user")
          .then((response) => response.json())
          .then((userJson) => {
            responseJson.forEach((reserv) => {
              let user = userJson.find((u) => u.id == reserv.userId);
              reserv.name = user.name;
              reserv.surname = user.surname;
              reserv.email = user.email;
              reserv.number = user.number;
            });

            setReservations(
              responseJson.filter(
                (reservation) =>
                  reservation.barId == global.loginId &&
                  reservation.accepted == false
              )
            );
          });
      });
  };
  if (needToLoad) fetchData();

  const removeHandler = (id) => {
    fetch(
      `https://barappbroker20200515061143.azurewebsites.net/reservation/${id}`,
      {
        method: "DELETE",
      }
    ).then(() => setNeedToLoad(true));
  };

  const acceptHandler = (item) => {
    let json = JSON.stringify({
      id: item.id,
      userId: item.userId,
      barId: item.barId,
      otherPeople: item.otherPeople,
      date: item.date,
      accepted: true,
    });
    fetch(
      `https://barappbroker20200515061143.azurewebsites.net/reservation/${item.id}`,
      {
        method: "PUT",
        body: json,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => setNeedToLoad(true));
  };

  const openHandler = (id) => {
    setSelectedItem(id);
    setMenuOpen(true);
  };

  return (
    <View style={styles.container}>
      {reservations.length == 0 || reservations.length == undefined ? (
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
            acceptHandler={acceptHandler}
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

function ListItem({ item, removeHandler, openHandler, acceptHandler }) {
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
          onPress={() => {
            acceptHandler(item);
          }}
        >
          <Text>Patvirtinti</Text>
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
            console.log(item);
            removeHandler(item.id);
          }}
        >
          <Text>Atšaukti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
