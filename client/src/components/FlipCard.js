import * as React from 'react';
import { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit semper mattis. Mauris eu fermentum sem. Integer pulvinar dignissim tincidunt. Nulla semper lacus ligula, vel volutpat odio tincidunt eu. Ut elementum lectus non malesuada elementum. Pellentesque mollis erat a velit lacinia, et suscipit mi fringilla.'
export default function Flipcard ({navigation, card, willRight, willLeft}) {
  const [playbackInstance, setPlaybackInstance] = React.useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(false);
  const [isFlip, setIsFlip] = React.useState(true);

  const handlePlaying = () => {
    if(currentlyPlaying) return false
    else return true
  }

  useEffect(() => {
    (async () => {
      if (currentlyPlaying) {
        try {
          const playbackInstances = new Audio.Sound();
          const source = {
            uri: card.hint,
          };

          const status = {
            shouldPlay: currentlyPlaying,
            volume: 1.0,
          };
          await playbackInstances.loadAsync(source, status, false);
          setPlaybackInstance(playbackInstances);
        } catch (e) {
          console.log(e);
        }
      } else {
        setIsFlip(true)
        currentlyPlaying
          ? await playbackInstance.playAsync()
          : await playbackInstance.pauseAsync();
        // await playbackInstance.pauseAsync()
      }
    })();
  }, [currentlyPlaying]);

  return (
    <View style={styles.container}>
      <FlipCard 
        style={styles.card}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={isFlip}
        onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
      >

        {/* FACE SIDE */}

        <View style={styles.face}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>

              {
                willRight && (
                  <View style={styles.rightText}>
                    <Text
                    style={{
                      fontSize: 30,
                      color: 'green'
                    }}>Done</Text>
                  </View>
                )
              }
              {
                willLeft && (
                  <View style={styles.leftText}>
                    <Text
                    style={{
                      fontSize: 30,
                      color: 'red'
                    }}>Repeat</Text>
                  </View>
                )
              }
              {/* AUDIO */}
              {card.type === 'sound' && (
                          <View>
                            <TouchableOpacity
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                height: hp("20"),
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              title="camera"
                              onPress={() => (
                                setIsFlip(false),
                                currentlyPlaying === false
                                  ? setCurrentlyPlaying(true)
                                  : (
                                    setCurrentlyPlaying(false)
                                  )
                              )
                              }
                              onTouchEnd={() => {
                                setIsFlip(true)
                              }}
                            >
                              <Icon
                                name={
                                  currentlyPlaying === false
                                    ? "play-outline"
                                    : "stop"
                                }
                                size={hp("15")}
                              />
                              <Text style={{fontWeight: 'bold', marginTop: hp("1")}}>Press the button to play</Text> 
                            </TouchableOpacity>
                          </View>
                        )}
              {/* AUDIO */}
              {
                card.type === 'text' && (
                  <View>
                    <Paragraph
                    style={styles.title}>{card.hint}</Paragraph>
                  </View>
                )
              }

              {
                card.type === 'image' && (
                  <View style={{}}>
                    <Card.Cover resizeMode="contain" source={{ uri: `${card.hint}` }} />
                  </View>
                )
              }

            </Card.Content>
          </Card>
        </View>

        {/* Back Side */}

        <View style={styles.back}>
          <Card
          style={styles.card}>
            <Card.Content style={styles.cardContent}>
              {
                willRight && (
                  <View style={styles.rightText}>
                    <Text
                    style={{
                      fontSize: 30,
                      color: 'green'
                    }}>Done</Text>
                  </View>
                )
              }
              {
                willLeft && (
                  <View style={styles.leftText}>
                    <Text
                    style={{
                      fontSize: 30,
                      color: 'red'
                    }}>Repeat</Text>
                  </View>
                )
              }
              <Paragraph
              style={styles.title}>{card.answer}</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            <Card.Actions>
              {/* <Button>Cancel</Button>
              <Button>Ok</Button> */}
            </Card.Actions>
          </Card>
        </View>
      </FlipCard>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    width: wp("80%"),
    height: hp("65%"),
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  cardContent: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  rightText: {
    position: 'absolute',
    top: '50%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    left: 40,
  },
  leftText: {
    position: 'absolute',
    top: '50%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    right: 40,
  },
});

// import * as React from 'react';
// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import FlipCard from 'react-native-flip-card'

// const windowHeight = Dimensions.get('window').height
// const windowWidth = Dimensions.get('window').width
// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
// const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit semper mattis. Mauris eu fermentum sem. Integer pulvinar dignissim tincidunt. Nulla semper lacus ligula, vel volutpat odio tincidunt eu. Ut elementum lectus non malesuada elementum. Pellentesque mollis erat a velit lacinia, et suscipit mi fringilla.'
// const Flipcard = ({navigation, card, willRight, willLeft}) => (
//   <View style={styles.container}>
//     <Card
//     style={styles.card}>
//       <Card.Content style={styles.cardContent}>
//         {
//           willRight && (
//             <View style={styles.rightText}>
//               <Text
//               style={{
//                 fontSize: 30,
//                 color: 'green'
//               }}>Done</Text>
//             </View>
//           )
//         }
//         {
//           willLeft && (
//             <View style={styles.leftText}>
//               <Text
//               style={{
//                 fontSize: 30,
//                 color: 'red'
//               }}>Repeat</Text>
//             </View>
//           )
//         }
//         <Paragraph
//         style={styles.title}>{card.hint}</Paragraph>
//       </Card.Content>
//       {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
//       <Card.Actions>
//         {/* <Button>Cancel</Button>
//         <Button>Ok</Button> */}
//       </Card.Actions>
//     </Card>
//   </View>
// );

// export default Flipcard;

// const styles = StyleSheet.create({
//   container: {
//     height: windowHeight,
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   card: {
//     display: 'flex',
//     minHeight: 150,
//     width: 250,
//     height: 350,
//     marginBottom: 5,
//     marginTop: 5,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignSelf: 'center',
//     alignItems: 'center',
//     elevation: 20,
//   },
//   cardContent: {
//     display: 'flex',
//     alignContent: 'center',
//     justifyContent: 'center',
//     paddingTop: 0
//   },
//   title: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignContent: 'center',
//     textAlign: 'center',
//   },
//   rightText: {
//     position: 'absolute',
//     top: '50%',
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     left: 40,
//   },
//   leftText: {
//     position: 'absolute',
//     top: '50%',
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     right: 40,
//   },
// });