import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import Flipcard from "../components/FlipCard";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
// import data from "../data/data.json";
import Swipes from "../components/Swipes";
import { useDispatch, useSelector } from "react-redux";
import { fetchingCardBySetCardId } from "../store/actions/cardAction";
import LoadingSpin from "../helpers/loading";
import { getAccess } from "../helpers/AsyncStorage";

export default function Flip({ route, navigation }) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.card.cards);
  const loading = useSelector((state) => state.card.loading);
  const [cards, setCards] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = route.params;

  useEffect(() => {
    getAccess("access_token")
      .then((token) => {
        if (id && token) {
          dispatch(fetchingCardBySetCardId(id, token));
        }
      })
      .catch(() => {
        access_token = null;
      });
  }, [id]);

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

  if (loading) {
    return <LoadingSpin />;
  }
  if (data) {
    console.log(data);
  }

  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>
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

/*
// import React from 'react';
// import Appbar from '../components/Appbar'
// import Header from '../components/Header'
// import Flipcard from '../components/FlipCard'
// import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// const windowHeight = Dimensions.get('window').height
// const windowWidth = Dimensions.get('window').width

// export default function Flip ({navigation}) {
//   return(
//     <>
//       <Header navigation={navigation}></Header>
//         <SafeAreaView style={styles.container}>
//           <Flipcard navigation={navigation}></Flipcard>
//         </SafeAreaView>
//       <Appbar navigation={navigation}></Appbar>
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: windowHeight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     paddingBottom: 120
//   }
// });*/
