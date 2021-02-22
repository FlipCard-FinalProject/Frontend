import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser, updateUser } from "../store/actions/userAction";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { getUserId } from '../helpers/AsyncStorage';

export default function Account({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { profile } = useSelector((state) => state.user);
  const { id, email, first_name, last_name } = profile;
  const dispatch = useDispatch();

  useEffect(() => {
    getUserId();
    setFirstName(first_name);
    setLastName(last_name);
  }, [id, email, first_name, last_name]);

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userid");
      if (id !== null) {
        dispatch(getUser(id));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  console.log(profile, "<<<");
  // const userlogout = () => {
  //     AsyncStorage.removeItem('access_token')
  //     .then(() => {
  //       return AsyncStorage.getItem('access_token')
  //     }) .then(data => {
  //       dispatch(logout())
  //       console.log(data, 'dari logout')
  //       navigation.navigate('Login')
  //     })
  //     .catch(err => console.log(err))
  // }

  const userlogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      const data = await AsyncStorage.getItem("access_token");
      console.log(data, "dari logout");
      dispatch(logout());

      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  };

  const updateHandle = () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
    };
    dispatch(updateUser(id, payload));
    navigation.navigate("Home");
  };

  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: hp("2%"),
          }}
        >
          {email}
        </Text>
        <TextInput
          label="First name"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
          }}
          style={{
            marginBottom: hp("2%"),
          }}
        ></TextInput>
        <TextInput
          label="Last name"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
          }}
        ></TextInput>
        <View
          style={{
            marginTop: hp("25%"),
          }}
        >
          <View
            style={{
              marginBottom: hp("2%"),
            }}
          >
            <Button title="Save" onPress={updateHandle}></Button>
          </View>
          <View>
            <Button color="red" title="Logout" onPress={userlogout}></Button>
          </View>
        </View>
      </View>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
    flex: 1,
    flexDirection: "column",
    marginLeft: hp("2%"),
    marginRight: hp("2%"),
  },
});
