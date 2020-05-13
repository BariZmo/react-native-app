export { modalStyles, itemStyles, styles };

import { StyleSheet } from "react-native";

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
  evaluateButton: {
    backgroundColor: "yellow",
  },
  sendButton: {
    backgroundColor: "moccasin",
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
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  container: {
    marginTop: 30,
    marginBottom: 50,
    width: "100%",
    flex: 1,
  },
});
