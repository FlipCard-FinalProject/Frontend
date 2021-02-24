import React, { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
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
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={hp("9%")}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: hp("5%"),
                marginLeft: wp("1%"),
                marginRight: wp("1%")
              }}
            >
              <Image source={require("../../assets/Flipcard.png")}></Image>
            </View>
            <TextInput
              style={{
                backgroundColor: "#fff",
                height: hp("7%"),
                marginBottom: hp("3%"),
                borderRadius: 25,
                elevation: 5,
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginLeft: wp("1%"),
                marginRight: wp("1%")
              }}
              placeholder="First name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={{
                backgroundColor: "#fff",
                height: hp("7%"),
                marginBottom: hp("3%"),
                borderRadius: 25,
                elevation: 5,
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginLeft: wp("1%"),
                marginRight: wp("1%")
              }}
              placeholder="Last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={{
                backgroundColor: "#fff",
                height: hp("7%"),
                marginBottom: hp("3%"),
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
                marginBottom: hp("3%"),
                borderRadius: 25,
                elevation: 5,
                paddingLeft: wp("5%"),
                paddingRight: wp("5%"),
                marginLeft: wp("1%"),
                marginRight: wp("1%")
              }}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}/>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp("5%")}}>
                <View style={{ marginBottom: hp("5%"), width: wp("40%")}}>
                  <Button
                    color="#444444"
                    onPress={() => navigation.navigate("Login")}
                    title="Login"></Button>
                </View>
                <View style={{marginBottom: hp("5%"), width: wp("40%")}}>
                  <Button onPress={userRegister} title="Register"></Button>
                </View>
              </View>
          </KeyboardAwareScrollView>
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
  spin: {
    justifyContent: "center",
    alignItems: "center",
  },
});
