import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Card = ({ navigation, card }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      { card.type === 'text' && <Text>{card.hint}</Text> }
      {/* { card.type === 'image' && <Image source={{ uri: `${card.hint}` }} style={{width: 10, height: 10}}  />} */}
      <Text>{card.answer}</Text>
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