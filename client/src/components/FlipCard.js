import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import FlipCard from "react-native-flip-card";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit semper mattis. Mauris eu fermentum sem. Integer pulvinar dignissim tincidunt. Nulla semper lacus ligula, vel volutpat odio tincidunt eu. Ut elementum lectus non malesuada elementum. Pellentesque mollis erat a velit lacinia, et suscipit mi fringilla.";
const Flipcard = ({ navigation, card, isImage, willRight, willLeft }) => (
  <View style={styles.container}>
    <FlipCard
      style={styles.card}
      friction={6}
      perspective={1000}
      flipHorizontal={true}
      flipVertical={false}
      flip={false}
      clickable={true}
      onFlipEnd={(isFlipEnd) => {
        console.log("isFlipEnd", isFlipEnd);
      }}
    >
      {/* FACE SIDE */}

      <View style={styles.face}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {willRight && (
              <View style={styles.rightText}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "green",
                  }}
                >
                  Done
                </Text>
              </View>
            )}
            {willLeft && (
              <View style={styles.leftText}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "red",
                  }}
                >
                  Repeat
                </Text>
              </View>
            )}
          </Card.Content>
          {isImage ? (
            <Card.Cover source={{ uri: `${card.hint}` }} />
          ) : (
            <Paragraph style={styles.title}>{card.hint}</Paragraph>
          )}
        </Card>
      </View>

      {/* Back Side */}

      <View style={styles.back}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {willRight && (
              <View style={styles.rightText}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "green",
                  }}
                >
                  Done
                </Text>
              </View>
            )}
            {willLeft && (
              <View style={styles.leftText}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "red",
                  }}
                >
                  Repeat
                </Text>
              </View>
            )}
            <Paragraph style={styles.title}>{card.answer}</Paragraph>
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
);

export default Flipcard;

const styles = StyleSheet.create({
  container: {
    height: 390,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    minHeight: 150,
    width: 250,
    height: 350,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    elevation: 10,
  },
  cardContent: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  rightText: {
    position: "absolute",
    top: "50%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    left: 40,
  },
  leftText: {
    position: "absolute",
    top: "50%",
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
