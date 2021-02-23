import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/loading2.gif")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
