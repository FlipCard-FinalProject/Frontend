import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper'

const CardList = ({ navigation, card, id }) => {
  const getName = (name) => {
    let stringName = name.split("/");
    let output = stringName[stringName.length - 1];
    return output.slice(0,7) + '...'
  }

  return (
    <Card style={{ display: 'flex', width: '95%', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 10, marginBottom: 10, marginTop: 10, elevation: 5 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '80%', flexDirection: 'column' }}>
          {card.type === 'text' && <Text style={{ marginBottom: 10 }}>Hint: {card.hint}</Text>}
          {card.type === 'image' && <Text style={{ marginBottom: 10 }}>Hint: 📷 {getName(card.hint)}</Text>}
          {card.type === 'sound' && <Text style={{ marginBottom: 10 }}>Hint: 🎵 {getName(card.hint)}</Text>}
          <Text style={{ marginBottom: 10 }}>Answer: {card.answer}</Text>
        </View>
        <View style={{ width: '20%' }}>
          <Text style={{ justifyContent: 'flex-start', textAlign: 'center', fontStyle: 'italic' }}>#{id}</Text>
        </View>
      </View>
    </Card>
  )
}

export default CardList

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