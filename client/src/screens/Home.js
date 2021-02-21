import React, { useEffect, useState } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import SetCard from '../components/SetCard'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home ({navigation}) {
  const [access, setAccess] = useState()

  useEffect(() => {
    console.log('masuk home')
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('access_token')
        if(value !== null) {
          setAccess(value)
        } else {
          navigation.navigate('Login')
        }
      } catch(e) {
        // error reading value
      }
    }
    getData()
  }, [access])
  console.log(access, 'console diluar')
  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
        <SetCard
        navigation={navigation}></SetCard>
        <SetCard navigation={navigation}></SetCard>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});