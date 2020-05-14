import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function () {
  return (
    <View>
      <Image
        style={styles.img}
        source="https://support.content.office.net/lt-lt/media/1f00521a-e0a4-4a67-b6c6-5d78972fb966.png"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    backgroundColor: "#033033",
    position: "relative",
    resizeMode: "contain",
    alignItems: "stretch",
  },
});
