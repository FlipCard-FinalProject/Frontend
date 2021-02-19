import React from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function Create ({navigation}) {
  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
        <Text>Create Flipcard</Text>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}