import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearCards } from '../store/actions/cardAction'
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function MyComponent ({ navigation, props }) {
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(clearCards())
    navigation.navigate("Flip", { id: props.id })
  }
  return (
    <Card
      style={styles.card}
      onPress={handleClear}
    >
      <Card.Content style={styles.cardContentContainer}>
        <View style={styles.topContainer}>
          
          <Title
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 0
            }}>{props.title}</Title>

          <Title
          style={{
            color: '#fff',
            fontSize: 12,
            fontStyle: 'italic',
            marginTop: 0
            }}>Category: {props.category}</Title>

        </View>
        <View style={{ flexDirection: "row", paddingLeft: wp("4"), paddingTop: hp("2%")}}>
          <Icon name="person-circle-sharp" color="#444444" size={30}></Icon>
          <Paragraph style={styles.author}>{props.User.first_name} {props.User.last_name}</Paragraph>
        </View>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <Card.Actions>
        {/* <Button>Cancel</Button>
        <Button>Ok</Button> */}
      </Card.Actions>
    </Card>
  )
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    minHeight: hp("20%"),
    width: '100%',
    marginBottom: hp("2%"),
    marginTop: hp("1%"),
    borderRadius: 15,
    elevation: 5
  },
  cardContentContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  },
  topContainer: {
    // backgroundColor: '#583d72',
    backgroundColor: '#1a508b',
    // backgroundColor: '#9a8194',

    paddingTop: hp("1%"),
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingLeft: wp("5")
  },
  author: {
    fontSize: 12,
    display: 'flex',
    alignSelf: 'flex-end',
    paddingLeft: wp("1"),
    paddingBottom: hp("1")
  }
});
