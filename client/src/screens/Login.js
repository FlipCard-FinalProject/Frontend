import * as React from "react";
import { useEffect, useState } from "react";
// import { TextInput } from "react-native-paper";
import { Button, StyleSheet, Text, View, Image, TextInput, ImageBackground, Dimensions } from "react-native";
import { login, sendError } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../helpers/Loading";
import Modal from "../helpers/ModalError";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "react-native-elements";
const { width, height } = Dimensions.get('window')

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
      <ImageBackground source={require("../../assets/background.png")} style={styles.image}>
      <View style={styles.container}>
        <Modal isError={isModalVisible} errors={errors} />
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: hp('8%'),
            }}
          >
            <Image source={require("../../assets/logo.png")}></Image>
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
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: hp("5%"), display: 'flex' }}>
            <View style={{ marginBottom: hp("5%"), width: wp("40%")}}>
              <TouchableOpacity
              style={{ backgroundColor: '#fff', paddingTop: hp("1%"), height: hp("6%"), elevation: 5, borderRadius: 10, width: wp("35"), alignSelf: 'center'}}
                onPress={() => navigation.navigate("Register")}
                title="Register">
                  <Text style={{ textAlign: 'center', color: '#f85f73', fontWeight: 'bold'}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: hp("5%"), width: wp("40%")}}>
              <TouchableOpacity
                style={{ backgroundColor: '#f85f73', height: hp("6%"), elevation: 5, borderRadius: 10, width: wp("35"), alignSelf: 'center' }}
                onPress={userlogin}
                title="Login">
              <Text style={{ textAlign: 'center', marginTop: hp("1%"), color: '#fff', fontWeight: 'bold'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    alignItems: 'center'
  },
});
