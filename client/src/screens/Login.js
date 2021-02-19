import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { Button, StyleSheet, Text, View } from 'react-native';

const MyComponent = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <View style={styles.container}>
        <View>
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
              marginBottom: 20
            }}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <View style={{marginBottom: 20}}>
            <Button
            onPress={() => navigation.navigate('Home')}
              title="Login"></Button>
          </View>
            <Button
              style={{
                marginBottom: 20
              }}
              onPress={() => navigation.navigate('Home')}
              title="Register"></Button>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
});