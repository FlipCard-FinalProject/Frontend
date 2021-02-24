import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import SetCard from "../components/SetCard";
import { fetchingSetCards } from "../store/actions/setCardAction";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker'
import { Card } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../helpers/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Home({ navigation }) {
  const { setCards, isUpdate, loading, errors } = useSelector(
    (state) => state.setCard
  );
  const [setCardsFiltered, setSetCardsFiltered] = useState(setCards);
  const dispatch = useDispatch();
  const [access, setAccess] = useState();
  const [category, setCategory] = useState('');
  const route = useRoute();

  useEffect(() => {
    dispatch(fetchingSetCards());
    // console.log(category);
    if (category !== '') {
      let filtered = setCards.filter(setCard => setCard.category === category)
      setSetCardsFiltered(filtered)      
    } else {
      setSetCardsFiltered(setCards);
    }
  }, [category]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("access_token");
        if (value !== null) {
          setAccess(value);
        } else {
          navigation.navigate("Login");
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
    if (access) {
      dispatch(fetchingSetCards());
    }
  }, [access]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView >
        <View style={styles.container}>
          <View style={{ alignSelf: 'center', width: '95%' }}>
              <Card style={{ marginTop: hp("2%"), marginBottom: hp("2%"), elevation: 5 }}>
                <View>
                <Picker
                  selectedValue={category}
                  style={{ width: wp("80%"), alignSelf: 'center' }}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                  }>
                  <Picker.Item label="Choose a category" enabled/>
                  <Picker.Item label="All" value='' />
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
                </View>
              </Card>
            {category === '' ? setCards.map((set) => {
              // console.log(set);
              return (
                <SetCard navigation={navigation} props={set} key={set.id}></SetCard>
              );
            }) : setCardsFiltered.map((set) => {
              // console.log(set);
              return (
                <SetCard navigation={navigation} props={set} key={set.id}></SetCard>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: "column",
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    justifyContent: 'center'
  },
});
