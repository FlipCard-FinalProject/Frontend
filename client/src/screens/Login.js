import * as React from "react";
import { useEffect, useState } from "react";
// import { TextInput } from "react-native-paper";
import { Button, StyleSheet, Text, View, Image, TextInput } from "react-native";
import { login, sendError } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const { errors, access_token } = useSelector((state) => state.user);

  useEffect(() => {
    if (errors.length > 0) {
      alert(errors);
      dispatch(sendError([]));
    }
    if (access_token) getData();
    if (access_token) navigation.navigate("Home");
  }, [errors, access_token]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value) {
        navigation.navigate("Home");
      }
    } catch (e) {
      // error reading value
    }
  };

  const userlogin = () => {
    let payload = {
      email,
      password,
    };
    dispatch(login(payload));
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: hp('8%'),
            }}
          >
            <Image source={require("../../assets/Flipcard.png")}></Image>
          </View>
          <TextInput
            style={{
              backgroundColor: "#fff",
              height: hp("7%"),
              marginBottom: hp("5%"),
              borderRadius: 25,
              elevation: 5,
              paddingLeft: wp("5%"),
              paddingRight: wp("5%"),
              marginLeft: wp("1%"),
              marginRight: wp("1%")
            }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              backgroundColor: "#fff",
              height: hp("7%"),
              marginBottom: hp("5%"),
              borderRadius: 25,
              elevation: 5,
              paddingLeft: wp("5%"),
              paddingRight: wp("5%"),
              marginLeft: wp("1%"),
              marginRight: wp("1%")
            }}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp("5%")}}>
            <View style={{ marginBottom: hp("5%"), width: wp("40%")}}>
              <Button
                color="#444444"
                onPress={() => navigation.navigate("Register")}
                title="Register"></Button>
            </View>
            <View style={{marginBottom: hp("5%"), width: wp("40%")}}>
              <Button onPress={userlogin} title="Login"></Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginLeft: wp("5%"),
    marginRight: wp("5%"),
    justifyContent: 'center'
  },
});
