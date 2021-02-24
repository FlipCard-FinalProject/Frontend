import * as React from "react";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { login, sendError } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../helpers/Loading";
import Modal from "../helpers/ModalError";

const MyComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { loading, errors, access_token } = useSelector((state) => state.user);

  useEffect(() => {
    if (errors.length > 0) {
      setModalVisible(true);
      // dispatch(sendError([]));
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.container}>
        <Modal isError={isModalVisible} errors={errors} />
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              // marginBottom: 100,
            }}
          >
            <Image source={require("../../assets/Flipcard.png")}></Image>
          </View>
          <TextInput
            style={{
              marginBottom: hp("2%"),
            }}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              marginBottom: hp("5%"),
            }}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={{ marginBottom: hp("2%") }}>
            <Button onPress={userlogin} title="Login"></Button>
          </View>
          <Button
            color="#444444"
            style={{
              marginBottom: hp("2%"),
            }}
            onPress={() => navigation.navigate("Register")}
            title="Register"
          ></Button>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("15%"),
    flex: 1,
    flexDirection: "column",
    marginLeft: hp("2%"),
    marginRight: hp("2%"),
  },
});
