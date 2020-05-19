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
            "https://cdn3.iconfinder.com/data/icons/mixed-communication-and-ui-pack-1/48/general_pack_NEW_glyph_profile-512.png",
        }}
        style={imgStyle}
      />
      <Text style={styles.text}>Administratorius</Text>
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
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
