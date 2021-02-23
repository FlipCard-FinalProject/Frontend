import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import Flipcard from "../components/FlipCard";
import { StyleSheet, View, Dimensions, Modal, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  const [cards, setCards] = useState(data);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    setCards(data)
  }, [data])

  useEffect(() => {
    if (id) {
      dispatch(fetchingCardBySetCardId(id, access_token));
    }
  },[id]);

  function handleSwipeRight() {
    console.log("right");
    nextCard();
  }
  function handleSwipeLeft() {
    console.log("left");
    nextCard();
  }
  function nextCard() {
    const nextIndex = cards.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }
  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>

        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <Text>
              1123124125235423523423423513111
            </Text>
          </Modal>
        </View>

        <View style={styles.swipes}>
          {cards.length > 1 &&
            cards.map(
              (u, i) =>
                currentIndex === i && (
                  <Swipes
                    key={i}
                    currentIndex={currentIndex}
                    cards={cards}
                    card={cards[currentIndex]}
                    handleSwipeRight={handleSwipeRight}
                    handleSwipeLeft={handleSwipeLeft}
                    navigation={navigation}
                  ></Swipes>
                )
            )}
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
});