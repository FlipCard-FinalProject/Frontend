import React, { useState, useEffect } from 'react';
import Appbar from '../components/Appbar'
import Header from '../components/Header'
import CardList from '../components/CardList'
// import { Input } from 'react-native-elements';
import { Button, StyleSheet, Text, View, Image, Dimensions, TextInput, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { insertCard, fetchingCardBySetCardId, clearForm, updateCard, deleteCard } from "../store/actions/cardAction";
import { insertSetCard, updateSetCard, deleteSetCard } from "../store/actions/setCardAction";
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons'
import { Card, Title } from 'react-native-paper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../helpers/Loading";
import Modal from "../helpers/ModalError";
const { width, height } = Dimensions.get('window')

export default function Edit({ navigation, route }) {
  const [playbackInstance, setPlaybackInstance] = React.useState(null);
  const { cards, errors } = useSelector((state) => state.card)
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  console.log(route.params);
  // console.log(cards, 'awalll ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
  const { id, setCardDetail } = route.params;
  const [setCardId, setSetCardId] = React.useState(id);
  const [creating, setCreating] = React.useState(false)
  const [titleInput, setTitleInput] = React.useState(setCardDetail.title);
  const [category, setCategory] = React.useState(setCardDetail.category);
  // waktu di kirim kesini kita harus punya detail setcard dan isi setcard , how ?
  // solusi 1 - fetch card by setcard id untuk list populate
  //        2 - gimana cara dapat title dan category ? 
  //        3 - props kah ? 
  const [card, setCard] = React.useState({
    hint: '',
    answer: '',
    type: ''
  });
  const [image, setImage] = useState('');
  const [sound, setSound] = React.useState('');
  const [recording, setRecording] = React.useState();
  const [currentlyRecording, setCurrentlyRecording] = React.useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(false)
  const [inputType, setInputType] = React.useState('text')
  const [formType, setFormType] = React.useState('hint')
  const { newVal, loading } = useSelector((state) => state.setCard)
  const [listCards, setListCards] = React.useState(cards)
  const [activeIdForm, setActiveIdForm] = React.useState(null)
  useEffect(() => {
    (async () => {
      if (currentlyPlaying) {
        try {
          const playbackInstances = new Audio.Sound();
          const source = {
            uri: sound,
          };

          const status = {
            shouldPlay: currentlyPlaying,
            volume: 1.0,
          };
          await playbackInstances.loadAsync(source, status, false);
          setPlaybackInstance(playbackInstances);
        } catch (e) {
          console.log(e);
        }
      } else {
        currentlyPlaying
          ? await playbackInstance.playAsync()
          : await playbackInstance.pauseAsync();
        // await playbackInstance.pauseAsync()
      }
    })();
  }, [currentlyPlaying]);


  
  if (loading) {
    return (
      <Loading />
    );
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
  

  useEffect(() => {
    setListCards(cards)
  }, [cards, activeIdForm])

  useEffect(() => {
    dispatch(fetchingCardBySetCardId(id))
  }, [])

  useEffect(() => {
    if (newVal.id !== undefined) {
      setSetCardId(newVal.id)
    }
  }, [newVal.id])
  // ******************** MEDIA ********************
  const getName = (name) => {
    let stringName = name.split("/");
    let output = stringName[stringName.length - 1];
    return output.slice(0, 7) + '...'
  }

  // console.log(cards, 'akhir ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');


// ================================================

  function handleCreateCard() {
    let payload = {
      hint: card.hint,
      answer: card.answer,
      type: 'text',
    };
    if (image !== '' && card.type === 'image') {
      payload = {
        hint: image,
        answer: card.answer,
        type: 'image',
      };
    }
    else if (sound !== '' && card.type === 'audio' || card.type === 'sound') {
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
    dispatch(insertCard(id, payload));
    setCard({
      hint: '',
      answer: '',
      type: ''
    })
  }

  function handleUpdateCard() {
    console.log(card.type);
    let payload = {
      hint: card.hint,
      answer: card.answer,
      type: 'text',
    };
    if (image !== '' && card.type === 'image') {
      payload = {
        hint: image,
        answer: card.answer,
        type: 'image',
      };
    }
    else if (sound !== '' && card.type === 'audio'|| card.type === 'sound') {
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
    console.log(activeIdForm, payload, id);
    dispatch(updateCard(activeIdForm, payload, id));
    setCard({
      hint: '',
      answer: '',
      type: ''
    })
    setActiveIdForm(null)
  }

  function handleUpdateSetCard() {
    let payload = {
      title: titleInput,
      category
    }
    dispatch(updateSetCard(id, payload));
    navigation.navigate('Home')
  }

  function handleDeleteSetCard() {
    dispatch(deleteSetCard(id));
    navigation.navigate('Home')
  }

  function handleDeleteCard(cardId) {
    dispatch(deleteCard(cardId, id));
  }
  
  function saveSetCard() {
    dispatch(clearForm())
    setSetCardId('')
    setTitleInput('')
    setCategory('')
    setCreating(false)
    navigation.navigate('Home')
  }


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
    setSound(uri)
    console.log('Recording stopped and stored at', uri);
    setCurrentlyRecording(false) // Recording status
  }
  // baru
  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //       console.log('Unloading Sound');
  //       sound.unloadAsync();
  //     }
  //     : undefined;
  // }, [sound]);

  // ******************** ETC ********************

  const handleChangeInputType = (type) => {
    switch (type) {
      case 'image':
        setSound('')
        setCard({ ...card, type: 'image' })
        break
      case 'audio':
        setImage('')
        setCard({ ...card, type: 'audio' })
        break
      default:
        setImage('')
        setSound('')
        setCard({ ...card, type: 'text' })
        break;
    }
    setInputType(type)
  }

  const handleChangeFormType = (type) => {
    setFormType(type)
  }

  const setThisIntoForm = (cardId) => {
    setActiveIdForm(cardId)
    console.log(cardId);
    console.log('ini function call');
    if (listCards.length > 0) {
      let filteredCard = listCards.filter(card => card.id === cardId)
      setCard({
        hint: filteredCard[0].hint,
        answer: filteredCard[0].answer,
        type: filteredCard[0].type
      })
      if (filteredCard[0].type === 'image') {
        setImage(filteredCard[0].hint)
      }
      if (filteredCard[0].type === 'sound') {
        setSound(filteredCard[0].hint)
      }
      setInputType(filteredCard[0].type)
      if (filteredCard[0].type === 'sound') {
        setInputType('audio')
      }
    }
    console.log(cardId, 'ini function call');
  }

  useEffect(() => {
    console.log(`input type: ${inputType}`);
  }, [inputType])

  // baru
  // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', cards);

  useEffect(() => {
    if (errors.length > 0) {
      setModalVisible(true);
      console.log(errors);
      // dispatch(sendError([]));
    }
  }, [errors]);

  return (
    <>
      <Header navigation={navigation}></Header>
      <ImageBackground source={require("../../assets/mainbackground.png")} style={styles.image}>
      <ScrollView style={{ display: 'flex', flexDirection: 'column', marginBottom: 100 }}>
        <View style={styles.container}>
        <Modal isError={isModalVisible} errors={errors} />
        <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: hp("4"),
              marginBottom: hp("2"),
              textAlign: "center",
              color: "#fff",
            }}
          >
            Edit Flipcard
          </Text>

              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TextInput
                style={styles.textInput}
                  placeholder='Set Title'
                  value={titleInput}
                  onChangeText={text => setTitleInput(text)} />
              </View>

            <Card style={{ marginBottom: hp("3"), elevation: 5, paddingLeft: wp("3"), marginTop: hp("1.5") }}>
              <Picker
                selectedValue={category}
                value={category}
                onValueChange={(itemValue, itemIndex) =>
                  setCategory(itemValue)
                }>
                {/* <Picker.Item label="Choose a category" {category === 'movie' ? enabled : ''} /> */}
                <Picker.Item label="Movie" value="movie" />
                <Picker.Item label="Electronic" value="electronic" />
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
            </Card>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}>
                    <View style={{ width: '33%' }}>
                      <Button
                        title="Text"
                        onPress={() => handleChangeInputType('text')}></Button>
                    </View>
                    <View style={{ width: '33%' }}>
                      <Button
                        title="Audio"
                        onPress={() => handleChangeInputType('audio')}></Button>
                    </View>
                    <View style={{ width: '33%' }}>
                      <Button
                        title="Images"
                        onPress={() => handleChangeInputType('image')}></Button>
                    </View>
                  </View>

                  {/* ==================== TEXT INPUT ==================== */}
                  {
                    inputType === 'text' && (
                      <View style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', paddingTop: 30 }}>
                        <View style={{marginBottom: hp("4")}}>
                          <View style={{marginBottom: hp("1.5")}}>
                            <TextInput
                              style={styles.textInput}
                              name="hint"
                              placeholder="Input Hint"
                              onChangeText={e => onChange(e, { name: "hint" })}
                              value={card.hint}
                            />
                          </View>
                          
                          <View style={{marginTop: hp("1.5")}}>
                            <TextInput
                              style={styles.textInput}
                              placeholder="Input Answer"
                              name="answer"
                              value={card.answer}
                              onChangeText={e => onChange(e, { name: "answer" })} />
                          </View>
                          {/* <View>
                            <Button title="Confirm"></Button>
                          </View> */}
                        </View>
                      </View>
                    )
                  }

                  {
                    inputType === 'audio' && (
                      <View style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        marginTop: hp("3"),
                      }}>

                      <Text
                      style={{
                        fontSize: 18,
                        marginBottom: hp("3"),
                        marginLeft: wp("1"),
                        fontWeight: "bold",
                        color: "#444444",
                        textAlign: "left",
                      }}>Hint</Text>

                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                          <View style={{ width: "45%" }}>
                            <Card style={{elevation: 5}}>
                            <TouchableOpacity
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                height: hp("20"),
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              title="add"
                              onPress={recording ? stopRecording : startRecording}>
                              <Icon name={currentlyRecording === false ? "mic-outline" : "mic"} size={40} />
                            </TouchableOpacity>
                            </Card>
                          </View>

                          <View style={{ flexDirection: 'column', width: '45%' }}>
                            <View style={{ flexDirection: 'row' }}></View>
                            <Card style={{elevation: 5}}>
                              <View>
                                <TouchableOpacity
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    height: hp("20"),
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  title="mic"
                                  onPress={() => currentlyPlaying === false ? setCurrentlyPlaying(true) : setCurrentlyPlaying(false)}
                                  >
                                  <Icon name={currentlyPlaying === false ? "play-outline" : "stop"} size={hp("8")} />
                                </TouchableOpacity>
                              </View>
                            </Card>
                          </View>
                      </View>
                        <View style={{ marginTop: hp("3"), marginBottom: hp("3")}}>
                          <TextInput
                          style={styles.textInput}
                            placeholder="Input Answer"
                            name="answer"
                            value={card.answer}
                            onChangeText={e => onChange(e, { name: "answer" })} />
                        </View>
                      </View>
                    )
                  }

                  {
                    inputType === 'image' && (
                    <View style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      marginTop: hp("3"),
                    }}>

                    <Text
                    style={{
                      fontSize: 18,
                      marginBottom: hp("3"),
                      marginLeft: wp("1"),
                      fontWeight: "bold",
                      color: "#444444",
                      textAlign: "left",
                    }}>Hint</Text>

                    <Card style={{elevation: 5}}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{
                          width: "50%",
                          justifyContent: "space-between",
                          }}>
                            <Card.Cover style={{}} source={{ uri: image !== '' ? image : `https://nayturr.com/wp-content/uploads/2020/09/linear-equation-sep032020-min-e1599143556912.jpg` }} /></View>
                          
                          <View style={{ flexDirection: 'column', width: '50%' }}>
                            <View style={{}}>
                              <TouchableOpacity
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  height: hp("16"),
                                  justifyContent: "center",
                                }}
                                title="add"
                                onPress={pickImage}>
                                <Icon name="image" color="#444444" size={hp("15")}></Icon>
                              </TouchableOpacity>
                            </View>
                            <View>
                              <TouchableOpacity
                                style={{ display: 'flex', flexDirection: 'row', height: hp("16"), justifyContent: 'center' }}
                                title="camera"
                                onPress={pickPhoto}>
                                <Icon name="camera" color="#444444" size={80}></Icon>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Card>

                      <Text
                      style={{
                        fontSize: 18,
                        marginTop: hp("3"),
                        marginBottom: hp("3"),
                        marginLeft: wp("1"),
                        fontWeight: "bold",
                        color: "#444444",
                        textAlign: "left",
                      }}>Answer</Text>

                        <View style={{ width: '100%' }}>
                          <View style={{ marginBottom: hp("4")}}>
                            <TextInput
                              style={styles.textInput}
                              placeholder="Input Answer"
                              name="answer"
                              value={card.answer}
                              onChangeText={e => onChange(e, { name: "answer" })} />
                          </View>
                        </View>
                      </View>
                    )
                  }
            {activeIdForm !== null && (
              <Button
                onPress={handleUpdateCard}
                title="Update Card"
              />
            )}
            {activeIdForm === null && (
              <Button onPress={handleCreateCard} title="Add Card" />
            )}
            {
              cards.length === 0 ? (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: wp("30"), height: hp("30")}} source={require("../../assets/empty.png")}></Image>
                  </View>
              ) : (
                <Card style={{margin: hp("4"), paddingLeft: hp("2"), paddingRight: hp("2"), elevation: 10}}>
                    <ScrollView style={{ maxHeight: hp("50"), backgroundColor: '#fff', paddingTop: 10 }}>
                      {cards.length > 0 && (
                        cards.map((element, i) => {
                          return (
                            <View style={{width: "100%", flexDirection: 'column', marginBottom: hp("3")}}>
                              <CardList card={element} id={i + 1} key={element.id} navigation={navigation} />
                              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <View style={{width: "45%"}}>
                                  <Button onPress={() => setThisIntoForm(element.id)} color='grey' title="Edit Card"></Button>
                                </View>
                                <View style={{width: "45%"}}>
                                  <Button onPress={() => handleDeleteCard(element.id)} color='#ef4f4f' title="Delete Card"></Button>
                                </View>
                              </View>
                            </View>
                          )
                        })
                      )}
                    </ScrollView>
                </Card>
              )
            }

          <View style={{ marginBottom: hp("3"), marginTop: hp("3") }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.button}>
                <Button
                  color="#1fab89"
                  onPress={handleUpdateSetCard}
                  title="Update Set Card"></Button>
              </View>
              <View style={styles.button}>
                <Button
                onPress={handleDeleteSetCard}
                color= '#ef4f4f'
                title="Delete Set Card"></Button>
              </View>
            </View>
          </View>

                {/* <View style={{ marginBottom: 120, marginTop: 20 }}>
              <Button onPress={saveSetCard} color='salmon' title="Create"></Button>
            </View> */}
        </View>
      </ScrollView>
        </ImageBackground>
        <Appbar navigation={navigation}></Appbar>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: hp("100%"),
    flexDirection: "column",
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    justifyContent: 'center',
    paddingBottom: hp("10")
  },
  textInput: {
    height: hp("7"),
    borderColor: 'grey',
    borderRadius: 5,
    paddingLeft: wp("5"),
    backgroundColor: '#fff',
    elevation: 5,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: hp("5")
  },
  image: {
    width: width,
    height: height,
  },
});