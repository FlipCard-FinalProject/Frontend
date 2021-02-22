import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import SetCard from "../components/SetCard";
import { fetchingSetCards } from "../store/actions/setCardAction";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const setcard = useSelector((state) => state.setCard.setCards);
  const dispatch = useDispatch();
  const [access, setAccess] = useState();

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
      dispatch(fetchingSetCards(access));
    }
  }, [access]);

  return (
    <>
      <Header navigation={navigation}></Header>
      <ScrollView>
        {setcard.map((set) => {
          return (
            <SetCard navigation={navigation} props={set} key={set.id}></SetCard>
          );
        })}
      </ScrollView>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
