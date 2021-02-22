import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function LoadingSpin() {
  return (
    <View style={styles.container}>
      <View style={styles.spin}>
        <ActivityIndicator size={hp("40%")} color="#00ff00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("7%"),
    flex: 1,
    flexDirection: "column",
    marginLeft: hp("2%"),
    marginRight: hp("2%"),
  },
  spin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
