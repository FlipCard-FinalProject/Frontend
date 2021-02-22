import React, { useState } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import SetCard from '../components/SetCard'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'
export default function Home ({navigation}) {
  const [category, setCategory] = React.useState('');
  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
      <Picker
        selectedValue={category}
        style={{height: 50, width: 400}}
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