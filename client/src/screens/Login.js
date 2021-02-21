import * as React from 'react';
import { useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { login, sendError } from '../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

const MyComponent = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('')
  const dispatch = useDispatch()
  const { errors, access_token } = useSelector((state) => state.user)

  useEffect(() => {
    if (errors.length > 0) {
      alert(errors);
      dispatch(sendError([]))
    }
    if (access_token) {
      navigation.navigate('Home')
    }
  }, [errors, access_token])

  const userlogin = () => {
    let payload = {
      email,
      password,
    };
    dispatch(login(payload));
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 100
          }}>
            <Image 
            source={require('../../assets/Flipcard.png')}></Image>
          </View>
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
          <View style={{marginBottom: 20}}>
            <Button
            onPress={userlogin}
              title="Login"></Button>
          </View>
            <Button
              color="#444444"
              style={{
                marginBottom: 20
              }}
              onPress={() => navigation.navigate('Register')}
              title="Register"></Button>
        </View>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
});