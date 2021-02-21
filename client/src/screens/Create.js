import React, { useEffect } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { Input } from 'react-native-elements';
import { TextInput } from "react-native-paper";
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { insertCard} from "../store/actions/cardAction";

export default function Create ({navigation}) {
  const [image, setImage] = React.useState('');
  const [setCardId, setSetCardId] = React.useState(1);
  const [card, setCard] = React.useState({
    hint: '',
    answer: '',
    type: ''
  });
  const [category, setCategory] = React.useState('');
  const [cardShow, setCardShow] = React.useState(9);
  const dispatch = useDispatch();

  function createCard() {
    let payload = {
      hint : card.hint,
      answer: card.answer,
      type: '',
    };
    if (image !== '') {
      payload = {
        hint: image,
        answer: card.answer,
        type: 'image',
      };
    } else {
      payload = {
        hint: card.hint,
        answer: card.answer,
        type: 'text',
      };
    }
    dispatch(insertCard(setCardId, payload));
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChange = (e, input) => {
    console.log(e);
    let value = e
    let {name} = input
    const inputValue = { ...card, [name]: value }
    setCard(inputValue)
}

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
        <View>
          <Input
            placeholder='Set Title'/>
          <Button title="add"
          onPress={pickImage}/>
          <Button title="camera"
          onPress={pickPhoto}/>
        </View>
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
      <TextInput
            style={{
              marginBottom: 20,
            }}
            label="Hint"
            placeholder="set hint"
            name="hint"
            value={card.hint}
            onChangeText={e => onChange(e, {name:"hint"})}
          />
        <TextInput
            style={{
              marginBottom: 20,
            }}
            label="answer"
            placeholder="set answer"
            name="answer"
            value={card.answer}
            onChangeText={e => onChange(e, {name:"answer"})}
          />
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
        title="Add more"></Button>
        <Button
        onPress={createCard}
        title="Save"></Button>
      </View>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}