import React, { useState } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import SetCard from '../components/SetCard'
import { Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/userAction'

export default function Account ({navigation}) {
  const [firstName, setFirstName] = useState("Imam")
  const [lastName, setLastName] = useState("Zain")
  const [showForm, setShowForm] = useState(false)
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
const handleShowForm = () => {
  if(showForm) setShowForm(false)
  else setShowForm(true)
}

  return (
    <>
      <Header navigation={navigation}></Header>
        <ScrollView>

          <View>
            <Text>
              Imam@mail.com
            </Text>
            <Text
            onPress={handleShowForm}>
              Imam Zain
            </Text>
          </View>

          {
            showForm && (
              <View>
                <Input
                label="First name"
                value={firstName}
                onChangeText={text => {setFirstName(text)}}>
                </Input>
                <Input
                label="Last name"
                value={lastName}
                onChangeText={text => {setLastName(text)}}>
                </Input>
                <View style={styles.saveButtonContainer}>
                  <Button
                  title="Save"
                  onPress={() => navigation.navigate('Home')}></Button>
                </View>
              </View>
            )
          }
          <View>
            <SetCard></SetCard>
            <SetCard></SetCard>
            <SetCard></SetCard>
          </View>
          <View style={styles.logoutButtonContainer}>
            <Button
              color="red"
              title="Logout"></Button>
          </View>

        </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
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
  }
});