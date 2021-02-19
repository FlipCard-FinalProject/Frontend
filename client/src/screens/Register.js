import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

const MyComponent = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50
          }}>
            <Image 
            source={require('../../assets/Flipcard.png')}></Image>
          </View>
          <TextInput
            style={{
              marginBottom: 20
            }}
            label="First name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={{
              marginBottom: 20
            }}
            label="Last name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            style={{
              marginBottom: 20
            }}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={{
              marginBottom: 50
            }}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <View style={{
            marginBottom: 20}}>
            <Button
            onPress={() => navigation.navigate('Login')}
              title="Register"></Button>
          </View>
          <View>
            <Button
              color="#444444"
              onPress={() => navigation.navigate('Login')}
              title="Login"></Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
});