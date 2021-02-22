import React, { useState } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/userAction'

export default function Account ({navigation}) {
  const [firstName, setFirstName] = useState("Imam")
  const [lastName, setLastName] = useState("Zain")
  const dispatch = useDispatch()

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
      await AsyncStorage.removeItem('access_token')
      const data = await AsyncStorage.getItem('access_token')
      console.log(data, 'dari logout')
      dispatch(logout())

      navigation.navigate('Login')
      
    } catch (err) {
      console.log(err);
    }
}

  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>
        <Text style={{
          fontWeight: 'bold',
          marginBottom: 20
        }}>Imam@mail.com</Text>
        <TextInput
        label="First name"
        value={firstName}
        onChangeText={text => {setFirstName(text)}}
        style={{
          marginBottom: 20
        }}></TextInput>
        <TextInput
        label="Last name"
        value={lastName}
        onChangeText={text => {setLastName(text)}}></TextInput>
        <View style={{
          marginTop: 250,
        }}>
          <View style={{
            marginBottom: 20
          }}>
            <Button
            title="Save"
            onPress={() => navigation.navigate('Home')}></Button>
          </View>
          <View>
            <Button
            color="red"
            title="Logout"
            onPress={userlogout}></Button>
          </View>
        </View>
      </View>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
});