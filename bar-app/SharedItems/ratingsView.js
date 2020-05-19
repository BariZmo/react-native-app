import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
// setVisibility <--
// Visibility <==
// setRating <==
// setComment <--

export default function (props) {
  const [rating, setLocRating] = useState(1);
  const [comment, setLocComment] = useState();

  const Star = ({ index }) => {
    return (
      <TouchableOpacity onPress={() => setLocRating(index)}>
        <View style={starles.starlink}>
          <FontAwesome name="star" color="#313000" size={50} />
          {rating + 1 <= index ? (
            <FontAwesome
              name="star"
              color="#23233F"
              size={45}
              style={starles.star}
            />
          ) : (
            <FontAwesome
              name="star"
              color="#ECA80B"
              size={45}
              style={starles.star}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const setInputs = (setCom) => {
    setLocComment(setCom);
  };

  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.background}>
        <View style={styles.main}>
          <View style={starles.constelation}>
            <Star index={1} />
            <Star index={2} />
            <Star index={3} />
            <Star index={4} />
            <Star index={5} />
          </View>
          <Text style={inputles.text}>Komentaras </Text>
          <TextInput
            text={inputles.text}
            style={inputles.input}
            multiline={true}
            placeholder={`  Pvz. "Viskas puiku, bet  trūko vibo "`}
            placeholderTextColor="white"
            onChangeText={setInputs}
            value={comment}
          />
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={() => props.SetVisibility(false)}
          >
            <Text style={styles.buttonSendText}>Įvertinti</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => props.SetVisibility(false)}
          >
            <Text style={styles.buttonBackText}>Grįžti</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const starles = StyleSheet.create({
  constelation: {
    top: "10%",
    flexDirection: "row",
  },
  star: {
    borderColor: "blue",
    position: "absolute",
    top: "4.3%",
    left: "0.9%",
  },
  starlink: {
    backgroundColor: "transparent",
  },
});

const inputles = StyleSheet.create({
  text: {
    color: "white",
    top: "10%",
    fontSize: 15,
  },
  input: {
    top: "15%",
    backgroundColor: "#ECA80B",
    height: "15%",
    borderRadius: 20,
    borderWidth: 3,
    width: "80%",
  },
});

const styles = StyleSheet.create({
  star: {
    borderColor: "blue",
    position: "absolute",
    top: "4.3%",
    left: "0.9%",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  main: {
    width: "80%",
    height: "60%", //#ECA80B
    backgroundColor: "#055055",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 4,
    alignItems: "center",
    left: "10%",
    top: "20%",
  },
  buttonBack: {
    backgroundColor: "#ECA80B",
    width: "80%",
    height: "10%",
    position: "absolute",
    bottom: "1%",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
  },

  buttonSend: {
    backgroundColor: "#ECA80B",
    width: "80%",
    height: "10%",
    position: "absolute",
    bottom: "13%",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
  },
  buttonBackText: {
    marginLeft: "40%",
    fontSize: 20,
    color: "white",
  },
  buttonSendText: {
    marginLeft: "35%",
    fontSize: 20,
    color: "white",
  },
});
