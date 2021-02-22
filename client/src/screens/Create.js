import React, { useState, useEffect } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import Card from '../components/Card'
import { Input } from 'react-native-elements';
import { TextInput, Text } from "react-native-paper";
import { Button, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { insertCard, fetchingCardBySetCardId, clearForm } from "../store/actions/cardAction";
import { insertSetCard } from "../store/actions/setCardAction";
import { Audio } from 'expo-av';

export default function Create({ navigation }) {
  const [setCardId, setSetCardId] = React.useState("");
  const [card, setCard] = React.useState({
    hint: '',
    answer: '',
    type: ''
  });
  const [image, setImage] = useState('');
  const [titleInput, setTitleInput] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [sound, setSound] = React.useState('');
  const [recording, setRecording] = React.useState();
  
  const dispatch = useDispatch();

  const { newVal } = useSelector((state) => state.setCard)
  const { cards } = useSelector((state) => state.card)
  const { access_token } = useSelector((state) => state.user)

  // ******************** MEDIA ********************
  useEffect(() => {
    if (newVal.id !== undefined) {
      setSetCardId(newVal.id)
    } 
  }, [newVal.id])

  function createCard() {
    let payload = {
      hint: card.hint,
      answer: card.answer,
      type: 'text',
    };
    if (image !== '') {
      payload = {
        hint: image,
        answer: card.answer,
        type: 'image',
      };
    } 
    else if(sound !== ''){
      payload = {
        hint: sound,
        answer: card.answer,
        type: 'sound',
      };
    }
    else {
      payload = {
        hint: card.hint,
        answer: card.answer,
        type: 'text',
      };
    }
    dispatch(insertCard(setCardId, payload));
  }

  function createSetCard() {
    let payload = {
      title: titleInput,
      category
    }
    dispatch(insertSetCard(payload));
  }

  function saveSetCard() {
    dispatch(clearForm())
    setSetCardId('')
    setTitleInput('')
    setCategory('')
    navigation.navigate('Home')
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
  }, [pickImage]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, [pickPhoto]);

  const pickImage = async () => {
    console.log('here');
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
    let { name } = input
    const inputValue = { ...card, [name]: value }
    setCard(inputValue)
  }

  // ******************** AUDIO ********************

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setSound(uri)
    console.log('Recording stopped and stored at', uri);
  }

  // ******************** ETC ********************

  // useEffect(() => {
  //   if (cards.length > 0){
  //     dispatch(fetchingCardBySetCardId(setCardId, access_token))
  //   }
  // }, [cards])

  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
        <View>
          <Input
            placeholder='Set Title'
            onChangeText={text => setTitleInput(text)} />
        </View>
        <Picker
          selectedValue={category}
          style={{ height: 50, width: 400 }}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
          }>
          <Picker.Item label="Choose a category" enabled />
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

        {setCardId === '' && (
          <View style={{
            marginBottom: 100
          }}>
            <Button onPress={createSetCard} title="Create Set Card" />
          </View>)}
        {setCardId !== '' && (
          <View style={{ marginBottom: 100 }}>
            <Button title="Create Set pressed" />
            <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'column' }}>
              <View style={{ width: '90%' }}>
                <TextInput
                  style={{
                    marginBottom: 20,
                  }}
                  label="Hint"
                  placeholder="set hint"
                  name="hint"
                  value={card.hint}
                  onChangeText={e => onChange(e, { name: "hint" })}
                />
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ width: '20%' }}>
                  <Button title="add" onPress={pickImage} />
                </View>
                <View style={{ width: '20%' }}>
                  <Button title="camera" onPress={pickPhoto} />
                </View>
                <View style={{ width: '20%' }}>
                  <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
                </View>
                <View style={{ width: '20%' }}>
                  <Button title="Play Sound" />
                </View>
              </View>
              <TextInput
                style={{
                  marginBottom: 20,
                }}
                label="answer"
                placeholder="set answer"
                name="answer"
                value={card.answer}
                onChangeText={e => onChange(e, { name: "answer" })}
              />
              <View>
                { cards.length > 0 && (
                  cards.map(carde => {
                    return <Card card={carde} key={carde.id} navigation={navigation} />
                  })
                )}
              </View>
              <View style={{ marginBottom: 100 }}>
                {cards.length === 0 && (
                  <Button
                  onPress={createCard}
                  title="Add"/>
                )}
                {cards.length > 0 && (
                  <>
                    <Button
                    onPress={createCard}
                    title="Add more"/>

                    <Button
                    onPress={saveSetCard}
                    color="red"
                    title="Save"/>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}