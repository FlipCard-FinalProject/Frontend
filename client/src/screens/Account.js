
import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import SetCard from '../components/SetCard'
import { Button, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
// import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser, updateUser } from "../store/actions/userAction";
  
// const windowHeight = Dimensions.get('window').height
// const windowWidth = Dimensions.get('window').width
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { getUserId } from '../helpers/AsyncStorage';

export default function Account({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showForm, setShowForm] = useState(false)
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
  
  const handleShowForm = () => {
    if(showForm) setShowForm(false)
    else setShowForm(true)
  }

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
        <ScrollView style={{ display: 'flex', flexDirection: 'column', marginTop: 10}}>
          <View style={{alignSelf: 'center', width: '95%'}}>
            <View style={{ display: 'flex', marginBottom: 20, marginTop: 20}}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>{email}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, textAlign: 'center', marginRight: 5 }}>{`${first_name} ${last_name}`}</Text>
                <Icon name="create-outline" size={23} onPress={handleShowForm} ></Icon>
              </View>
            </View>

            {
              showForm && (
                <View style={{ display: 'flex' }}>
                  <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20, justifyContent: 'space-evenly' }}>

                    <View style={{ width: '45%' }}>
                      <TextInput
                      style={{
                        backgroundColor: '#fff',
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 20,
                      }}
                      value={firstName}
                      onChangeText={text => {setFirstName(text)}}>
                      </TextInput>
                    </View>

                    <View style={{width: '45%'}}>
                      <TextInput
                      style={{
                        backgroundColor: '#fff',
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 20,
                      }}
                      label="Last name"
                      value={lastName}
                      onChangeText={text => {setLastName(text)}}>
                      </TextInput>
                    </View>

                  </View>
                  <View style={styles.saveButtonContainer}>
                    <Button
                    title="Save"
                    onPress={updateHandle}></Button>
                  </View>
                </View>
              )
            }
            {/* ============================= */}
            {/* <View>
              <SetCard></SetCard>
            </View> */}

            <View style={styles.logoutButtonContainer}>
              <Button
                color="#aa2b1d"
                title="Logout"
                onPress={userlogout}></Button>
            </View>
          </View>
        </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    minHeight: 430,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  saveButtonContainer: {
    marginBottom: 20,
    width: '100%'
  },
  logoutButtonContainer: {
    marginTop: 20
  }
});
