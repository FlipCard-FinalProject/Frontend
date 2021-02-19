import React from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function Flipcard ({navigation}) {
  return(
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
        <Text>FLIPCARD</Text>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}