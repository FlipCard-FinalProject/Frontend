import React, { useEffect } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import { Input } from 'react-native-elements';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { insertCard } from "../store/actions/cardAction";
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons'
import { Card, Title } from 'react-native-paper'

export default function Create({ navigation }) {
  const [setCardId, setSetCardId] = React.useState(1);
  const [card, setCard] = React.useState({
    hint: '',
    answer: '',
    type: ''
  });
  const [image, setImage] = React.useState('');
  const [titleInput, setTitleInput] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [cardShow, setCardShow] = React.useState(9);
  const [sound, setSound] = React.useState();
  const [recording, setRecording] = React.useState();
  const [currentlyRecording, setCurrentlyRecording] = React.useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(false)
  const [inputType, setInputType] = React.useState('text')
  const [formType, setFormType] = React.useState('hint')
  const dispatch = useDispatch();

  // ******************** MEDIA ********************

  function createCard() {
    let payload = {
      hint: card.hint,
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
      setCurrentlyRecording(true) // Recording status
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setCurrentlyRecording(false) // Recording status
  }

  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  // ******************** ETC ********************

  const handleAddCard = () => {
    if(cardShow >= 0) setCardShow(cardShow - 1)
  }
  const handleChangeInputType = (type) => {
    setInputType(type)
  }
  const handleChangeFormType = (type) => {
    setFormType(type)
  }

  useEffect(() => {
    console.log(`input type: ${inputType}`);
  }, [inputType])

  useEffect(() => {
    console.log(cardShow, 'card left');
  }, [cardShow])

  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView style={{ display: 'flex', flexDirection: 'column', marginTop: 10}}>
        <View style={{alignSelf: 'center', width: '95%'}}>
          <View style={{ marginTop: 20, marginBottom: 10}}>
            <Input
              placeholder='Set Title'
              onChangeText={text => setTitleInput(text)} />
          </View>
        <Picker
          selectedValue={category}
          style={{height: 50, marginBottom: 20}}
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
        {titleInput.trim() !== '' && (
          <>
            <Card style={{ marginBottom: 20, paddingTop: 30, paddingBottom: 30, display: 'flex', flexDirection: 'column'}}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{width: '20%' }}>
                  <Button
                  title="Text"
                  onPress={() => handleChangeInputType('text')}></Button>
                </View>
                <View style={{width: '20%'}}>
                  <Button
                  title="Audio"
                  onPress={() => handleChangeInputType('audio')}></Button>
                </View>
                <View style={{width: '20%'}}>
                  <Button
                  title="Images"
                  onPress={() => handleChangeInputType('image')}></Button>
                </View>
              </View>
              
              {/* ==================== TEXT INPUT ==================== */}
              
              {
                inputType === 'text' && (
                  <View style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', paddingTop: 30 }}>
                    <View style={{ marginLeft: 20 }}>
                      <Input
                      name="hint"
                      placeholder="Set Hint"
                      onChangeText={e => onChange(e, { name: "hint" }
                      value={card.hint}
                      />
                      <Input
                      placeholder="Set Answer"
                      name="answer"
                      value={card.answer}
                      onChangeText={e => onChange(e, { name: "answer" }/>
                    </View>
                    <View>
                      <Button title="Confirm"></Button>
                    </View>
                  </View>
                )
              }
              
              {/* ==================== AUDIO INPUT ==================== */}
              
              {
                inputType === 'audio' && (
                  <View style={{display: 'flex', flexDirection: 'column', minHeight: 135, justifyContent: 'space-evenly', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '25%' }}>
                          <TouchableOpacity
                          style={{display: 'flex', flexDirection: 'row', height: 100, justifyContent: 'center', alignItems: 'center'}}
                          title="add"
                          onPress={recording ? stopRecording : startRecording}>
                            <Icon name={currentlyRecording === false ? "mic-outline" : "mic"} size={40}/>
                          </TouchableOpacity>
                        {/* <Button title="Hint" onPress={() => console.log('hint')}></Button> */}
                      </View>
                      <View style={{ flexDirection: 'column', width: '25%' }}>
                        <View style={{ flexDirection: 'row'}}>
                        </View>
                        <View>
                          <TouchableOpacity
                          style={{display: 'flex', flexDirection: 'row', height: 100, justifyContent: 'center', alignItems: 'center'}}
                          title="camera"
                          onPress={() => currentlyPlaying === false ? setCurrentlyPlaying(true) : setCurrentlyPlaying(false)}>
                            <Icon name={currentlyPlaying === false ? "play-outline" : "play"} size={40}/>
                          </TouchableOpacity>
                        </View>
                        {/* <Button title="Answer" onPress={() => console.log('answer')}></Button> */}
                      </View> 
                      <View style={{ width: '25%' }}>
                          <TouchableOpacity
                          style={{display: 'flex', flexDirection: 'row', height: 100, justifyContent: 'center', alignItems: 'center'}}
                          title="add"
                          onPress={recording ? stopRecording : startRecording}>
                            <Icon name={currentlyRecording === false ? "mic-outline" : "mic"} size={40}/>
                          </TouchableOpacity>
                        {/* <Button title="Hint" onPress={() => console.log('hint')}></Button> */}
                      </View>
                      <View style={{ flexDirection: 'column', width: '25%' }}>
                        <View style={{ flexDirection: 'row'}}>
                        </View>
                        <View>
                          <TouchableOpacity
                          style={{display: 'flex', flexDirection: 'row', height: 100, justifyContent: 'center', alignItems: 'center' }}
                          title="camera"
                          onPress={() => currentlyPlaying === false ? setCurrentlyPlaying(true) : setCurrentlyPlaying(false)}>
                            <Icon name={currentlyPlaying === false ? "play-outline" : "play"} size={40}/>
                          </TouchableOpacity>
                        </View>
                        {/* <Button title="Answer" onPress={() => console.log('answer')}></Button> */}
                      </View> 
                    </View>
                    <View style={{ }}>
                      <Button title="Confirm"></Button>
                    </View>
                  </View>
                )
              }
              
              {/* ==================== IMAGE INPUT ==================== */}
              
              {
                inputType === 'image' && (
                <View style={{display: 'flex', flexDirection: 'column', minHeight: 195, justifyContent: 'space-evenly', marginTop: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '50%', justifyContent: 'space-between'}}>
                        <Card.Cover style={{}} source={{ uri: `https://nayturr.com/wp-content/uploads/2020/09/linear-equation-sep032020-min-e1599143556912.jpg` }} />
                        {/* <Button title="Hint" onPress={() => console.log('hint')}></Button> */}
                      </View>
                      <View style={{ flexDirection: 'column', width: '50%' }}>
                        <View style={{ }}>
                          <TouchableOpacity
                          style={{display: 'flex', flexDirection: 'row', height: 100, justifyContent: 'center'}}
                          title="add"
                          onPress={pickImage}>
                            <Icon name="image" color="#444444" size={80}></Icon>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                          style={{display: 'flex', flexDirection: 'row', height: 100, justifyContent: 'center'}}
                          title="camera"
                          onPress={pickPhoto}>
                            <Icon name="camera" color="#444444" size={80}></Icon>
                          </TouchableOpacity>
                        </View>
                        {/* <Button title="Answer" onPress={() => console.log('answer')}></Button> */}
                      </View> 
                    </View>
                    <View style={{ width: '100%' }}>
                        <Input placeholder="Input answer"></Input>
                      <Button title="Confirm"></Button>
                    </View>
                  </View>
                )
              }
            </Card>
            
            <View style={{ marginBottom: 100 }}>
              <View style={{ marginBottom: 20}}>
                <Button
                onPress={handleAddCard}
                title="Add more"></Button>
              </View>
              <View>
                <Button
                onPress={createCard}
                title="Create"></Button>
              </View>
            </View>
          </>
        )}

        </View>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  )
}