import React, { useState } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
export default function Account ({navigation}) {
  const [firstName, setFirstName] = useState("Imam")
  const [lastName, setLastName] = useState("Zain")
  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>
        <Text style={{
          fontWeight: 'bold',
          marginBottom: 20
        }}>Imam</Text>
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
            onPress={() => navigation.navigate('Login')}></Button>
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