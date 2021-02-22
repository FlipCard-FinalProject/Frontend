import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MyComponent = ({ navigation, props }) => (
  <Card style={styles.card} onPress={() => navigation.navigate("Flip")}>
    <Card.Content>
      <Title>{props.category}</Title>
      <Paragraph>{props.title}</Paragraph>
      <Paragraph style={styles.author}>
        {props.User.first_name} {props.User.last_name}
      </Paragraph>
    </Card.Content>
    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
    <Card.Actions>
      {/* <Button>Cancel</Button>
      <Button>Ok</Button> */}
    </Card.Actions>
  </Card>
);

export default MyComponent;

const styles = StyleSheet.create({
  card: {
    display: "flex",
    minHeight: 150,
    marginBottom: 5,
    marginTop: 5,
  },
  author: {
    marginTop: 40,
  },
});
