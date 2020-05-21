import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import ReportView from "../User/ReportView";

export default function (props) {
  const [users, setUsers] = useState([]);
  const [needLoad, setNeedLoad] = useState(true);
  let fetchData = () => {
    fetch("https://barappbroker20200515061143.azurewebsites.net/user")
      .then((response) => {
        console.log("Loaded users.");
        setNeedLoad(false);
        return response.json();
      })
      .then((json) => {
        json.sort((a, b) => a.id > b.id);
        setUsers(json);
      });
  };
  if (needLoad) fetchData();

  const [sendOpen, setSendOpen] = useState(false);

  function UserInfo({ infoElement }) {
    return (
      <View style={styles.user}>
        <View style={styles.titleLine}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Naudotojas: {infoElement.name} {infoElement.surname}
          </Text>
        </View>
        <View style={styles.firstLine}>
          <TouchableHighlight
            underlayColor="#FFACAC"
            style={[styles.button, { backgroundColor: "#ff5c5c" }]}
            onPress={() => {
              Alert.alert("Pranešimas", "Naudotojas sėkmingai panaikintas");
            }}
          >
            <Text style={styles.buttonText}>PANAIKINTI</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#FFACAC"
            style={[styles.button, { backgroundColor: "#ff5c5c" }]}
            onPress={() => {
              let json = JSON.stringify({
                id: infoElement.id,
                name: infoElement.name,
                surname: infoElement.surname,
                email: infoElement.email,
                number: infoElement.number,
                password: infoElement.password,
                blocked: !infoElement.blocked,
              });
              fetch(
                `https://barappbroker20200515061143.azurewebsites.net/user/${infoElement.id}`,
                {
                  method: "PUT",
                  body: json,
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              ).then(() => setNeedLoad(true));
            }}
          >
            {infoElement.blocked ? (
              <Text style={styles.buttonText}>ATBLOKUOTI</Text>
            ) : (
              <Text style={styles.buttonText}>BLOKUOTI</Text>
            )}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#65CAA1"
            style={[styles.button, { backgroundColor: "#158a51" }]}
            onPress={() => {
              setSendOpen(true);
            }}
          >
            <Text style={styles.buttonText}>SIŲSTI PRANEŠIMĄ</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.fourthLine}>
          <Text>El. paštas: {infoElement.email}</Text>
        </View>
        <View style={styles.fourthLine}>
          <Text>Tel. nr.: {infoElement.number}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      {sendOpen ? (
        <ReportView
          title={"Sukurkite norimą pranešimą:"}
          shortQuery={"Pranešimo tema:"}
          shortQueryPlaceholder={`Pvz. "Paskyros saugumas pažeistas"`}
          longQuery={"Pranešimo tekstas:"}
          longQueryPlaceholder={`Pvz. "Atnaujinkite slaptažodį"`}
          sendHandler={(type, description) => {
            setSendOpen(false);
            let success = true;
            Alert.alert("Pranešimas:", "Pranešimas sėkmingai išsiųstas.", [
              {
                text: "Tęsti",
                onPress: () => {},
              },
            ]);
          }}
          cancelHandler={() => {
            setSendOpen(false);
          }}
        ></ReportView>
      ) : (
        <FlatList
          style={{ marginTop: 30 }}
          data={users}
          renderItem={({ item }) => <UserInfo infoElement={item} />}
          keyExtractor={(user) => user.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  user: {
    width: "100%",
    paddingVertical: "5%",
    backgroundColor: "#53914d",
    marginBottom: 20,
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
