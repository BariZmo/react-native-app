import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import {} from "react-native-gesture-handler";
import { styles, itemStyles, modalStyles } from "./ReservationListStyles";
import ReportView from "../../../User/ReportView";

export default function () {
  const [reservations, setReservations] = useState([]);
  // selectedItem is identified by id
  const [selectedItem, setSelectedItem] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [messagePageOpen, setMessagePageOpen] = useState(false);
  const [needToLoad, setNeedToLoad] = useState(true);

  // Load reservations from broker
  let fetchData = () => {
    fetch("https://barappbroker20200515061143.azurewebsites.net/reservation")
      .then((response) => {
        setNeedToLoad(false);
        console.log("Received approved reservations.");
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
                  reservation.accepted == true
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

  const openHandler = (id) => {
    setSelectedItem(id);
    setMenuOpen(true);
  };

  const sendHandler = (id) => {
    setMessagePageOpen(true);
  };

  const evaluateHandler = (id) => {
    setSelectedItem(id);
  };

  return (
    <View style={styles.container}>
      {messagePageOpen == true ? (
        <ReportView
          title={"Sukurkite norimą pranešimą:"}
          shortQuery={"Pranešimo tema:"}
          shortQueryPlaceholder={`Pvz. "Jūsų apsilankymo laikas"`}
          longQuery={"Pranešimo tekstas:"}
          longQueryPlaceholder={`Pvz. "Nedirbsime"`}
          sendHandler={(type, description) => {
            // TODO:
            // a) send a message to user
            // b) get success value
            setMessagePageOpen(false);
            let success = true;
            if (success) {
              Alert.alert("Pranešimas:", "Pranešimas sėkmingai išsiųstas.", [
                {
                  text: "Tęsti",
                  onPress: () => {},
                },
              ]);
            } else {
              Alert.alert("Pranešimas:", "Pranešimo išsiųsti nepavyko.", [
                {
                  text: "Tęsti",
                  onPress: () => {},
                },
              ]);
            }
          }}
          cancelHandler={() => {
            setMessagePageOpen(false);
          }}
        ></ReportView>
      ) : (
        <View>
          {reservations.length == 0 ? (
            <Text style={styles.title}>
              Nepraėjusių patvirtintų rezervacijų nerasta.
            </Text>
          ) : (
            <Text style={styles.title}>
              Viso {reservations.length} nepraėjusios patvirtinta(-os)
              rezervacijos:
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
      )}
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
