import React, { useEffect, useState } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import SetCard from '../components/SetCard'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home ({navigation}) {
  const [access, setAccess] = useState()
  const [category, setCategory] = React.useState('');

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
      <ScrollView style={{ display: 'flex', flexDirection: 'column', marginTop: 10}}>
        <View style={{alignSelf: 'center', width: '95%'}}>
          <Picker
            selectedValue={category}
            style={{ height: 50 }}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            <Picker.Item label="Choose a category" enabled/>
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="Animal" value="animal" />
            <Picker.Item label="Technology" value="technology" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Game" value="game" />
            <Picker.Item label="Music" value="music" />
            <Picker.Item label="People" value="people" />
            <Picker.Item label="Math" value="math" />
            <Picker.Item label="Programming" value="programming" />
            <Picker.Item label="Funny" value="funny" />
            <Picker.Item label="Others" value="others" />
          </Picker>
          <SetCard
          navigation={navigation}></SetCard>
          <SetCard navigation={navigation}></SetCard>
        </View>
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