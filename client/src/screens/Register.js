import React, { useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register, newVal, sendError } from "../store/actions/userAction";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.errors);
  const data = useSelector((state) => state.user.newVal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.length > 0) {
      alert(error);
      dispatch(sendError([]));
    }
    if (data.email) {
      dispatch(newVal({}));
      navigation.navigate("Login");
    }
  }, [error, newVal]);

  function userRegister() {
    let payload = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };
    dispatch(register(payload));
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.spin}>
          <ActivityIndicator size={hp("40%")} color="#00ff00" />
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: hp("5%"),
            }}
          >
            <Image source={require("../../assets/Flipcard.png")}></Image>
          </View>
          <TextInput
            style={{
              marginBottom: hp("2%"),
            }}
            label="First name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={{
              marginBottom: hp("2%"),
            }}
            label="Last name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
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
          <View
            style={{
              marginBottom: hp("2%"),
            }}
          >
            <Button onPress={userRegister} title="Register"></Button>
          </View>
          <View>
            <Button
              color="#444444"
              onPress={() => navigation.navigate("Login")}
              title="Login"
            ></Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

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
