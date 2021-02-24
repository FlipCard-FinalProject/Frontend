import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import Flipcard from './FlipCard'
import { SafeAreaView } from 'react-navigation'

export default function Swipes({cards, currentIndex, handleSwipeRight, handleSwipeLeft, no}) {
  const [willRight, setWillRight] = useState(false)
  const [willLeft, setWillLeft] = useState(false)
  const renderLeftActions = () => {
    return (
      <RectButton style={styles.container}>
        <Flipcard card={cards[currentIndex]}></Flipcard>
      </RectButton>
    )
  }
  const renderRightActions = () => {
    return (
      <RectButton style={styles.container}>
        <Flipcard card={cards[currentIndex]}></Flipcard>
      </RectButton>
    )
  }
  return (
    <View>
    <Swipeable
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        setWillRight(false)
        handleSwipeRight()
      }}
      onSwipeableRightOpen={() => {
        setWillLeft(false)
        handleSwipeLeft()
      }}
      onSwipeableLeftWillOpen={() => setWillRight(true)}
      onSwipeableRightWillOpen={() => setWillLeft(true)}>
      <Flipcard
      card={cards[currentIndex]}
      willRight={willRight}
      willLeft={willLeft}/>
    </Swipeable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})