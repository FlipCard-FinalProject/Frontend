import React, { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register, sendError , setNewVal} from "../store/actions/userAction";
const { width, height } = Dimensions.get('window')
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../helpers/Loading";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const MyComponent = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const { loading, errors, newVal } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length > 0) {
      // dispatch(sendError([]));
    }
    if (newVal.email) {
      dispatch(setNewVal({}));
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
    <ImageBackground source={require("../../assets/background.png")} style={styles.image}>
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
              <Image source={require("../../assets/logo.png")}></Image>
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
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}/>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp("5%")}}>
                <View style={{ marginBottom: hp("5%"), width: wp("40%")}}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#fff', paddingTop: hp("1%"), height: hp("6%"), elevation: 5, borderRadius: 10}}
                    onPress={() => navigation.navigate("Login")}
                    title="Login">
                      <Text style={{ textAlign: 'center', display: 'flex', color: '#f85f73', fontWeight: 'bold'}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: hp("5%"), width: wp("40%")}}>
                  <TouchableOpacity
                  style={{ backgroundColor: '#f85f73', height: hp("6%"), elevation: 5, borderRadius: 10}}
                  onPress={userRegister} title="Register">
                    <Text style={{ textAlign: 'center', display: 'flex', marginTop: hp("1%"), color: '#fff', fontWeight: 'bold'}}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAwareScrollView>
          </View>
      </View>
      </ImageBackground>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
  },
});
