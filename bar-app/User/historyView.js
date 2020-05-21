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
  TouchableHighlight,
  Alert,
} from "react-native";

// *sort by date

export default function (props) {
  // temp, sb from props
  const [infoArray, setInfoArray] = useState([]);

  const [items, setCurrentItems] = useState([]);

  const [needLoad, setNeedLoad] = useState(true);
  let fetchData = () => {
    fetch("https://barappbroker20200515061143.azurewebsites.net/visit")
      .then((response) => {
        setNeedLoad(false);
        return response.json();
      })
      .then((json) => {
        let myVisits = json.filter((visit) => visit.userId == global.loginId);
        fetch("https://barappbroker20200515061143.azurewebsites.net/bar")
          .then((barResponse) => barResponse.json())
          .then((barJson) => {
            myVisits.forEach((visit) => {
              let myBar = barJson.find((bar) => bar.id == visit.barId);
              visit.bar = myBar.tradeName;

              visit.sum = visit.costs.reduce((a, b) => a + b, 0);
            });

            setInfoArray(myVisits);
          });
      });
  };
  if (needLoad) fetchData();

  const [modalVisibility, setModalVisibility] = useState(false);

  const showDetails = (item) => {
    let a = item.costs;
    let b = item.items;
    let zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let items = zip(a, b);

    setCurrentItems(items);
    setModalVisibility(true);
  };

  const ClearHistory = () => {
    Alert.alert("Pranešimas", "Istorija sėkmingai ištrinta.");
  };

  function Item({ infoElement }) {
    return (
      <View>
        <View style={styles.spacer}></View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => showDetails(infoElement)}
        >
          <Text style={styles.listItemText}>
            Baras - "{infoElement.bar}"{"\n"}
            Pinigų išleista (viso): {infoElement.sum}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function VisitInfo({ infoElement }) {
    return (
      <View style={styles.row}>
        <Text style={styles.itemStyle}>Pirkinys: {infoElement[1]} </Text>
        <Text style={styles.itemStyle}>kaina: {infoElement[0]}</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <Modal visible={modalVisibility} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <FlatList
              style={styles.list}
              data={items}
              renderItem={({ item }) => <VisitInfo infoElement={item} />}
              keyExtractor={(item, i) => i}
            />
            <TouchableHighlight
              onPress={() => {
                setModalVisibility(false);
              }}
              style={styles.modalButton}
            >
              <Text>Grįžti</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <FlatList
        style={styles.list}
        data={infoArray}
        renderItem={({ item }) => <Item infoElement={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => ClearHistory()}
      >
        <Text style={styles.clearText}>Išvalyti istoriją</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "skyblue",
    borderRadius: 15,
    borderWidth: 2,
  },
  itemStyle: {
    fontSize: 16,
  },
  listItemText: {
    padding: 5,
  },
  main: {
    marginTop: "10%",
    height: "85%",
    alignItems: "center",
    width: "100%",
  },
  modal: {
    width: "80%",
    height: "80%",
    backgroundColor: "#ECA80B",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "space-between",
    left: "10%",
    top: "5%",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  touchable: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: "2%",
    backgroundColor: "#ECA80B",
    textDecorationColor: "black",
    textShadowColor: "white",
    textShadowRadius: 10,
    borderColor: "black",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
  },
  list: {
    width: "90%",
    height: "80%",
    top: "2%",
  },
  clearButton: {
    borderRadius: 10,
    backgroundColor: "#ECA80B",
    height: "10%",
    width: "80%",
    top: "5%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  clearText: {
    fontSize: 20,
    top: "25%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,

    // width: "100%",
  },
  spacer: {
    paddingTop: "5%",
  },

  elementID: {
    width: "250",
  },
  elementDate: {
    width: "250",
  },
  elementBar: {
    width: "250",
    paddingHorizontal: 50,
  },
});
