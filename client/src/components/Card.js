import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Card = ({ navigation, card }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{card.hint}</Text>
      <Text>{card.answer}</Text>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }} />
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#444444',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    marginRight: 50
  }
});