import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser, updateUser } from "../store/actions/userAction";
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
            // marginBottom: 20
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
          style={
            {
              // marginBottom: 20
            }
          }
        ></TextInput>
        <TextInput
          label="Last name"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
          }}
        ></TextInput>
        <View
          style={
            {
              // marginTop: 250,
            }
          }
        >
          <View
            style={
              {
                // marginBottom: 20
              }
            }
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
    marginTop: 50,
    flex: 1,
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
  },
});
