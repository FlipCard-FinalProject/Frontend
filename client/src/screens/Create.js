import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import CardList from "../components/CardList";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Input } from "react-native-elements";
import Loading from "../helpers/Loading";
import Modal from "../helpers/ModalError";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ImageBackground
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  insertCard,
  sendError,
  fetchingCardBySetCardId,
  clearForm,
} from "../store/actions/cardAction";
import { insertSetCard } from "../store/actions/setCardAction";
import { clearCards } from "../store/actions/cardAction";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import { Card, Title } from "react-native-paper";
import { useRoute } from '@react-navigation/native'
const { width, height } = Dimensions.get('window')
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Create({ navigation }) {
  const [setCardId, setSetCardId] = React.useState("");
  const [creating, setCreating] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [card, setCard] = React.useState({
    hint: "",
    answer: "",
    type: "",
  });
  const [image, setImage] = useState("");
  const [titleInput, setTitleInput] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [sound, setSound] = React.useState("");
  const [recording, setRecording] = React.useState();
  const [playbackInstance, setPlaybackInstance] = React.useState(null);

  const [currentlyRecording, setCurrentlyRecording] = React.useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(false);
  const [inputType, setInputType] = React.useState("text");
  const [formType, setFormType] = React.useState("hint");
  const dispatch = useDispatch();
  const route = useRoute();

  const { newVal } = useSelector((state) => state.setCard);
  const { cards, loading, errors } = useSelector((state) => state.card);
  const { access_token } = useSelector((state) => state.user);

  useEffect(() => {
    if (errors.length !== 0) {
      console.log(errors.length, "masuk");
      setModalVisible(true);
      // dispatch(sendError([]));
    }
  }, [errors]);

  // ******************** MEDIA ********************
  useEffect(() => {
    if (newVal.id !== undefined) {
      setSetCardId(newVal.id);
    }
  }, [newVal.id]);

  function createCard() {
    let payload = {
      hint: card.hint,
      answer: card.answer,
      type: "text",
    };
    if (image !== "" && card.type === "image") {
      payload = {
        hint: image,
        answer: card.answer,
        type: "image",
      };
    } else if (sound !== "" && card.type === "audio") {
      payload = {
        hint: sound,
        answer: card.answer,
        type: "sound",
      };
    } else {
      payload = {
        hint: card.hint,
        answer: card.answer,
        type: "text",
      };
    }
    dispatch(insertCard(setCardId, payload));
    setCard({
      hint: "",
      answer: "",
      type: "",
    });
    setImage("")
    setSound("")
  }

  function createSetCard() {
    let payload = {
      title: titleInput,
      category,
    };
    dispatch(insertSetCard(payload));
    setCreating(true);
    dispatch(clearCards());
  }

  function saveSetCard() {
    dispatch(clearForm());
    setSetCardId("");
    setTitleInput("");
    setCategory("");
    setCreating(false);
    navigation.navigate("Home");
  }
  useEffect(() => {}, [playbackInstance]);

  useEffect(() => {
    (async () => {
      //   let urlSound = sound
      if (currentlyPlaying) {
        // try {
        //   SoundPlayer.playUrl(sound !== '' ? sound : 'https://example.com/music.mp3')
        // } catch (e) {
        //   console.log(`cannot play the sound file`, e)
        // }
        // if (sound !== '') {
        //    urlSound = 'https://example.com/music.mp3'
        // } else {
        //    urlSound = sound
        // }
        // console.log('Loading Sound');
        // const { sound } = await Audio.Sound.createAsync(
        //   require(urlSound)
        // );
        // setSound(sound);

        // console.log('Playing Sound');
        // await sound.playAsync();
        // new Player(sound).play();
        // console.log('Loading Sound');
        // const soundPlay = new Audio.Sound();
        // try {
        //   await soundPlay.loadAsync(require(sound));
        //   await soundPlay.playAsync();
        //   // Your sound is playing!
        // } catch (error) {
        // An error occurred!
        // }
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [pickImage]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, [pickPhoto]);

  const pickImage = async () => {
    // console.log("here");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4]
    });
    // console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4]
    });
    // console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChange = (e, input) => {
    console.log(e);
    let value = e;
    let { name } = input;
    const inputValue = { ...card, [name]: value };
    setCard(inputValue);
  };

  // ******************** AUDIO ********************

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
      setCurrentlyRecording(true); // Recording status
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setSound(uri);
    console.log("Recording stopped and stored at", uri);
    setCurrentlyRecording(false); // Recording status
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
      case "image":
        setSound("");
        setCard({ ...card, type: "image" });
        console.log(type, "and", card.type);
        break;
      case "audio":
        setImage("");
        setCard({ ...card, type: "audio" });
        console.log(type, "and", card.type);

        break;
      default:
        setImage("");
        setSound("");
        setCard({ ...card, type: "text" });
        console.log(type, "and", card.type);

        break;
    }
    setInputType(type);
  };
  const handleChangeFormType = (type) => {
    setFormType(type);
  };

  useEffect(() => {
    console.log(`input type: ${inputType}`);
  }, [inputType]);
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Header navigation={navigation}></Header>
      <ImageBackground source={require("../../assets/mainbackground.png")} style={styles.image}>
      <ScrollView
        style={{ display: "flex", flexDirection: "column" }}>
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={hp("50")}>
        <View style={styles.container}>
        <Modal isError={isModalVisible} errors={errors} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: hp("4"),
              marginBottom: hp("2"),
              textAlign: "center",
              color: "#444444",
            }}
          >
            Add new Flipcard
          </Text>
          {creating === false ? (
            <>
                <View style={{ marginTop: 0, marginBottom: hp("3")}}>
                  <TextInput
                  style={styles.textInput}
                  placeholder="Set Title"
                  onChangeText={(text) => setTitleInput(text)}/>
                </View>

              <Card style={{ marginBottom: hp("3"), elevation: 5, paddingLeft: wp("3") }}>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                  }
                >
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
              </Card>
            </>
          ) : (
            <Card
              style={{
                marginTop: hp("3"),
                marginBottom: hp("3"),
                display: "flex",
                flexDirection: "column",
                paddingLeft: wp("1"),
                paddingBottom: hp("1"),
                paddingTop: hp("1"),
                backgroundColor: '#e1e1e1'
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: wp("3"),
                  marginRight: wp("3"),
                  alignContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#444444" }}
                >
                  {titleInput}
                </Text>
                <Text style={{ fontSize: 15, fontStyle: "italic", paddingTop: hp("0.5") }}>
                  {category}
                </Text>
              </View>
            </Card>
          )}
          {setCardId === "" && titleInput !== "" && category !== "" && (
            <View
            style={styles.button}>
            <Button onPress={createSetCard} title="Create Set Card"></Button>
          </View>
          )}
          {setCardId !== "" && (
            <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: hp("2")
                  }}
                >
                  <View style={{ width: "33%" }}>
                    <Button
                      title="Text"
                      onPress={() => handleChangeInputType("text")}
                    ></Button>
                  </View>
                  <View style={{ width: "33%" }}>
                    <Button
                      title="Audio"
                      onPress={() => handleChangeInputType("audio")}
                    ></Button>
                  </View>
                  <View style={{ width: "33%" }}>
                    <Button
                      title="Images"
                      onPress={() => handleChangeInputType("image")}
                    ></Button>
                  </View>
                </View>

                {/* ==================== TEXT INPUT ==================== */}

                {inputType === "text" && (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{}}>
                      <View style={{marginTop: hp("3"), marginBottom: hp("1.5")}}>
                        <TextInput
                        style={styles.textInput}
                          name="hint"
                          placeholder="Input Hint"
                          onChangeText={(e) => onChange(e, { name: "hint" })}
                          value={card.hint}
                        />
                      </View>
                      <View style={{marginTop: hp("1.5"), marginBottom: hp("3")}}>
                        <TextInput
                        style={styles.textInput}
                          placeholder="Input Answer"
                          name="answer"
                          value={card.answer}
                          onChangeText={(e) => onChange(e, { name: "answer" })}
                        />
                      </View>
                      <View>
                        {/* <Button title="Confirm"></Button> */}
                        {cards.length === 0 && (
                          <Button onPress={createCard} title="Add" />
                        )}
                        {cards.length !== 0 && (
                          <View>
                            <Button onPress={createCard} title="Add more" />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                )}

                {/* ==================== AUDIO INPUT ==================== */}

                {inputType === "audio" && (
              <>
                  <View
                  style={{
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
                          onPress={recording ? stopRecording : startRecording}
                        >
                          <Icon
                            name={
                              currentlyRecording === false
                                ? "mic-outline"
                                : "mic"
                            }
                            size={hp("8")}
                          />
                        </TouchableOpacity>
                        </Card>
                      </View>
                      
                      <View style={{ flexDirection: "column", width: "45%" }}>
                        <View style={{ flexDirection: "row" }}></View>
                        {sound ? (
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
                                title="camera"
                                onPress={() =>
                                  currentlyPlaying === false
                                    ? setCurrentlyPlaying(true)
                                    : setCurrentlyPlaying(false)
                                }
                              >
                                <Icon
                                  name={
                                    currentlyPlaying === false
                                      ? "play-outline"
                                      : "stop"
                                  }
                                  size={hp("8")}
                                />
                              </TouchableOpacity>
                            </View>
                          </Card>
                        ) : (
                          <>
                          <Card style={{ elevation: 5}}>
                            <View>
                              <TouchableOpacity
                              disabled={true}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  height: hp("20"),
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                title="play"
                              >
                                <Icon
                                  name={"play-outline"}
                                  color="grey"
                                  size={hp("8")}
                                />
                              </TouchableOpacity>
                            </View>
                          </Card>
                          </>
                        )}
                      </View>
                    </View>

                    <Text
                    style={{
                      fontSize: 18,
                      marginTop: hp("3"),
                      marginLeft: wp("1"),
                      fontWeight: "bold",
                      color: "#444444",
                      textAlign: "left",
                    }}>Answer</Text>

                    <View style={{marginTop: hp("3"), marginBottom: hp("4")}}>
                      <TextInput
                      style={styles.textInput}
                        placeholder="Set Answer"
                        name="answer"
                        value={card.answer}
                        onChangeText={(e) => onChange(e, { name: "answer" })}
                      />
                    </View>
                    <View style={{}}>
                      {cards.length === 0 && (
                        <Button onPress={createCard} title="Add" />
                      )}
                      {cards.length !== 0 && (
                        <View>
                          <Button
                            onPress={createCard}
                            color="salmon"
                            title="Add more"
                          />
                        </View>
                      )}
                    </View>
                  </View>
              </>
                )}

                {/* ==================== IMAGE INPUT ==================== */}

                {inputType === "image" && (
                  <View
                    style={{
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
                    <View style={{ flexDirection: "row" }}>
                      <View
                      style={{
                        width: "50%",
                        justifyContent: "space-between",
                      }}>
                        <Card.Cover
                        style={{}}
                        source={{
                          uri:
                            image !== ""
                              ? image
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAj4zfeooDr7pe7KOtwInyl0_0Z-KxiDSNMg&usqp=CAU",
                        }}/></View>

                      <View style={{ flexDirection: "column", width: "50%" }}>
                        <View style={{}}>
                          <TouchableOpacity
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: hp("16"),
                              justifyContent: "center",
                            }}
                            title="add"
                            onPress={pickImage}
                          >
                            <Icon name="image" color="#444444" size={hp("15")}></Icon>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: hp("16"),
                              justifyContent: "center",
                            }}
                            title="camera"
                            onPress={pickPhoto}
                          >
                            <Icon
                              name="camera"
                              color="#444444"
                              size={hp("15")}
                            ></Icon>
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

                    <View style={{ width: "100%" }}>
                      <View style={{ marginBottom: hp("4")}}>
                        <TextInput
                        style={styles.textInput}
                          placeholder="Set Answer"
                          name="answer"
                          value={card.answer}
                          onChangeText={(e) => onChange(e, { name: "answer" })}
                        />
                      </View>
                      {cards.length === 0 && (
                        <Button onPress={createCard} title="Add" />
                      )}
                      {cards.length !== 0 && (
                        <View>
                          <Button onPress={createCard} title="Add more" />
                        </View>
                      )}
                    </View>
                  </View>
                )}
                <Card style={{margin: hp("4"), paddingLeft: hp("2"), paddingRight: hp("2"), elevation: 10}}>
                {cards.length !== 0 ? (
                  <ScrollView
                    style={{ maxHeight: hp("50"), backgroundColor: "#fff" }}
                  >
                    {cards.length > 0 &&
                      cards.map((card, i) => {
                        return (
                          <>
                          <CardList
                            card={card}
                            id={i + 1}
                            key={card.id}
                            navigation={navigation}/>
                          </>
                        );
                      })}
                  </ScrollView>
                ) : (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: wp("30"), height: hp("30")}} source={require("../../assets/empty.png")}></Image>
                  </View>
                )}
                </Card>
              <View style={{ marginBottom: hp("16"), marginTop: hp("3") }}>
                <Button
                  onPress={saveSetCard}
                  color="salmon"
                  title="Create"
                ></Button>
              </View>
            </>
          )}
        </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      </ImageBackground>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: hp("90%"),
    flexDirection: "column",
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    justifyContent: 'center',
    paddingBottom: hp("15")
  },
  textInput: {
    height: hp("7"),
    borderColor: 'grey',
    borderRadius: 5,
    paddingLeft: wp("5"),
    paddingRight: wp("5"),
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