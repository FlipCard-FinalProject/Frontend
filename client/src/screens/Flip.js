import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import Flipcard from "../components/FlipCard";

import { StyleSheet, View, Dimensions, Modal, Text, Image } from "react-native";
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
// import data from "../data/data.json";
import Swipes from "../components/Swipes";
import { useDispatch, useSelector } from "react-redux";
import { fetchingCardBySetCardId } from "../store/actions/cardAction";
import { getAccess } from "../helpers/AsyncStorage";

export default function Flip({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  const access_token = useSelector((state) => state.user.access_token);
  const data = useSelector((state) => state.card.cards);
  const isLoading = useSelector((state) => state.card.loading);
  const [cards, setCards] = useState(data);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    console.log(modalVisible);
    setModalVisible(true)
  }, [])

  useEffect(() => {
    setCards(data)
  }, [data])

  useEffect(() => {
    if (id) {
      dispatch(fetchingCardBySetCardId(id, access_token));
    }
  },[id]);

  useEffect(() => {
    console.log(cards.length, ": cards length");
    console.log(currentIndex, ": cards index");
  },[cards.length]);

  useEffect(() => {
    console.log(currentIndex, ": cards index");
  },[currentIndex]);

  function handleSwipeRight(index, no) {
    console.log("right");
    nextCardStayIndex(currentIndex)
    cards.splice(currentIndex, 1)
    setCards([...cards])
    // nextCard();
  }
  function handleSwipeLeft() {
    console.log("left");
    nextCard();
  }
  const handleCloseModal = () => {
    console.log(modalVisible)
    setModalVisible(!modalVisible)
  }
  function nextCard() {
    const nextIndex = cards.length - 1 === currentIndex ? 0 : currentIndex + 1;
    console.log(nextIndex, '<<< next index')
    setCurrentIndex(nextIndex);
  }
  function nextCardStayIndex(index) {
    if (currentIndex === cards.length-1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(index)
    }
    // setCurrentIndex(index);
  }

  if (isLoading) {
    return (
        // <View style={[styles.container, { backgroundColor: '#191F26' }]}>
        <>
        <Header navigation={navigation}></Header>
        <View style={styles.container}>
  
            <Text>loading bos</Text> 
        </View>
      <Appbar navigation={navigation}></Appbar>
    </>
    )
}
  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>

        <View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.modalTextTitle}>How to Use Flipcard: </Text>
                <Text style={styles.modalText}>Swipe Left to review the card later and Swipe Right when you're finished</Text>

                <View onPress={handleCloseModal}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}>
                        <Text
                        onPress={handleCloseModal}
                        style={styles.textStyle}>OK !</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.swipes}>
          {cards.length >= 1 &&
            cards.map(
              (u, i) =>
                currentIndex === i && (
                  <Swipes
                    key={i}
                    no={i}
                    currentIndex={currentIndex}
                    cards={cards}
                    card={cards[currentIndex]}
                    handleSwipeRight={(index, no) => handleSwipeRight(index, no)}
                    handleSwipeLeft={handleSwipeLeft}
                    navigation={navigation}
                  ></Swipes>
                )
            )}
            {cards.length === 0 && (<Text>kosong</Text>)}
        </View>
      </View>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    minHeight: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  swipes: {
    backgroundColor: "#fff",
    width: windowWidth,
    paddingBottom: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    height: 40,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 100,
  },
  modalTextTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});