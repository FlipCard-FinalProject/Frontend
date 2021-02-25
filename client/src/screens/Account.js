import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import SetCardEditable from "../components/SetCardAcount";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ImageBackground
} from "react-native";
import { Card, Title } from 'react-native-paper'
const { width, height } = Dimensions.get('window')
// import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser, updateUser } from "../store/actions/userAction";
import { fetchingSetCards } from "../store/actions/setCardAction";
import Loading from "../helpers/Loading";
import { getData } from "../helpers/AsyncStorage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { getUserId } from '../helpers/AsyncStorage';

export default function Account({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const { id, email, first_name, last_name } = profile;
  const { setCards, loading, errors } = useSelector((state) => state.setCard);
  const [listSetCards, setListSetCards] = useState(setCards.filter(set => set.user_id === id));
  // let filtered = setCardsOrigin.filter(set => set.user_id === id)

  const dispatch = useDispatch();

  useEffect(() => {
    let filtered = setCards.filter(set => set.user_id === id)
        setListSetCards(filtered)
  },[setCards])
  
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

      const access_token = await AsyncStorage.getItem("access_token");
      if (access_token !== null) {
        dispatch(fetchingSetCards(id, access_token));
        let filtered = setCards.filter(set => set.user_id === id)
        setListSetCards(filtered)
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  // console.log(profile, "<<<");
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
      // console.log(data, "dari logout");
      dispatch(logout());

      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowForm = () => {
    if (showForm) setShowForm(false);
    else setShowForm(true);
  };

  const updateHandle = () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
    };
    dispatch(updateUser(id, payload));
    navigation.navigate("Home");
  };

  if (loading) {
    return <Loading />;
  }

  // if (errors.length > 0) {
  //   alert(errors);
  //   dispatch(sendError([]));
  // }

  return (
    <>
      <Header navigation={navigation}></Header>
      <ImageBackground source={require("../../assets/mainbackground.png")} style={styles.image}>
      <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            marginBottom: hp("2%"),
            marginTop: hp("5%"),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View>
            <Image style={{width: 80, height: 80, marginBottom: hp("3")}} source={require("../../assets/user.png")}></Image>
            {/* <Icon name="person-circle" color="#444444" size={hp("15")}></Icon> */}
          </View>
          <View>
            <Text
              style={{
                fontSize: hp("3%"),
                textAlign: "center",
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        { !showForm ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: hp("2%"),
                  textAlign: "center",
                  margin: hp("0.5%"),
                }}
              >{`${first_name} ${last_name}`}</Text>
              <Icon
                name="create-outline"
                size={23}
                onPress={handleShowForm}
              ></Icon>
            </View>
          ):(
            <View style={{ display: "flex", justifyContent: 'center' }}>
              <Card style={{elevation: 5, paddingBottom: hp("3"), paddingTop: hp("3")}}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: hp("2%"),
                    marginTop: hp("2%"),
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ width: "40%" }}>
                    <TextInput
                      style={styles.textInput}
                      value={firstName}
                      onChangeText={(text) => {
                        setFirstName(text);
                      }}
                    ></TextInput>
                  </View>

                  <View style={{ width: wp("40%") }}>
                    <TextInput
                      style={styles.textInput}
                      label="Last name"
                      value={lastName}
                      onChangeText={(text) => {
                        setLastName(text);
                      }}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.saveButtonContainer}>
                  <Button title="Save" onPress={updateHandle}></Button>
                </View>
              </Card>
            </View>
          )}
        <View style={styles.logoutButtonContainer}>
          <Button color="#ef4f4f" title="Logout" onPress={userlogout}></Button>
        </View>

        {/* ============================= */}
        
        {/* <ScrollView
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: hp("50%"),
          }}
        > */}
        {
          listSetCards.length === 0 ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: wp("30"), height: hp("30")}} source={require("../../assets/empty.png")}></Image>
              </View>
          ) : (
              listSetCards.map((set) => {
                // console.log(set);
                return (
                  <SetCardEditable
                    navigation={navigation}
                    props={set}
                    key={set.id}
                  ></SetCardEditable>
                );
              })
            )
        }
        {/* </ScrollView> */}
      </View>
      </ScrollView>
      </ImageBackground>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    justifyContent: 'center',
    paddingBottom: hp("15%")
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  saveButtonContainer: {
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
    width: wp("50"),
    alignSelf: 'center'
  },
  logoutButtonContainer: {
    marginTop: hp("2%"),
    marginBottom: hp("5%"),
    width: wp("50"),
    alignSelf: 'center'
  },
  textInput: {
    height: hp("7"),
    borderColor: 'grey',
    borderRadius: 15,
    paddingLeft: wp("5"),
    backgroundColor: '#fff',
    elevation: 5,
  },
  image: {
    width: width,
    height: height,
  },
});
