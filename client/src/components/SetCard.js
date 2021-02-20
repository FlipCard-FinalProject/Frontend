import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({navigation}) => (
  <Card
  onPress={navigation.navigate('Flip')}
  style={styles.card}>
    <Card.Content>
      <Title>Animals name</Title>
      <Paragraph>Animal</Paragraph>
      <Paragraph style={styles.author}>Dzaky</Paragraph>
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
    display: 'flex',
    minHeight: 150,
    marginBottom: 5,
    marginTop: 5
  },
  author: {
    marginTop: 40
  }
});