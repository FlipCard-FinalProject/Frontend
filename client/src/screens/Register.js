import React, { useEffect } from "react";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import Loading from "../helpers/Loading";

const MyComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const { loading, errors } = useSelector((state) => state.user);
  const data = useSelector((state) => state.user.newVal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length > 0) {
      // dispatch(sendError([]));
    }
    if (data.email) {
      dispatch(newVal({}));
      navigation.navigate("Login");
    }
  }, [errors, newVal]);

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
    return <Loading />;
  }

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={hp("9%")}
        >
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
        </KeyboardAwareScrollView>
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
