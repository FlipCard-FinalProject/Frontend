import React from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import SetCard from '../components/SetCard'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function Home ({navigation}) {
  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
        <SetCard navigation={navigation}></SetCard>
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