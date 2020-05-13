import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function (props) {
  var imgStyle;

  props.isBlocked ? (imgStyle = styles.imgBlocked) : (imgStyle = styles.img);

  return props.profileVisibility ? (
    <View style={styles.view}>
      <Image
        source={{
          uri:
            "https://media.istockphoto.com/photos/brunette-young-man-with-chain-picture-id820105644?k=6&m=820105644&s=612x612&w=0&h=08rFDvFrzrxQZwnanG8dK_SFKE5kAdOKlB3emeT0QiU=",
        }}
        style={imgStyle}
      />
      <Text style={styles.text}>Stasius povlovskis</Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 400,
    position: "relative",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#99FF11",
  },
  imgBlocked: {
    width: 200,
    height: 200,
    borderRadius: 400,
    position: "relative",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "red",
  },
  text: {
    marginTop: "5%",
    color: "white",
  },
});
