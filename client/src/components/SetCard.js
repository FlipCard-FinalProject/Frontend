import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = ({navigation}) => (
  <Card style={styles.card}
  onPress={() => navigation.navigate('Flip')}>
    <Card.Content>
      <Title style={{ fontSize: 20 }}>Animals name</Title>
      <Title style={{ fontSize: 15, fontStyle: 'italic'}}>Category: Animal</Title>
      <Title style={styles.author}>Dzaky</Title>
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
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
    elevation: 5
  },
  author: {
    marginBottom: 0,
    display: 'flex',
    alignSelf: 'flex-end'
  }
});