import React, { useEffect } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { Input } from 'react-native-elements';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
export default function Create ({navigation}) {
  const [category, setCategory] = React.useState('');
  const [cardShow, setCardShow] = React.useState(9);
  const handleAddCard = () => {
    if(cardShow >= 0) setCardShow(cardShow + 1)
  }
  useEffect(() => {
    console.log(cardShow);
  }, [cardShow])
  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
      <Input
        placeholder='Set Title'/>
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
      <View style={{ marginBottom: 20}}>
        <Input placeholder='Set Hint'/>
        <Input placeholder='Set answer'/>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
        }}
      />
      </View>
      { cardShow < 9 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 8 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 7 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 6 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 5 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 4 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 3 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      { cardShow < 2 && (
        <View style={{ marginBottom: 20}}>
          <Input placeholder='Set Hint'/>
          <Input placeholder='Set answer'/>
                <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}/>
        </View>
      )}
      <View style={{
        marginBottom: 100
      }}>
        <Button
        onPress={handleAddCard}
        title="Add more"></Button>
        <Button
        title="Save"></Button>
      </View>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}