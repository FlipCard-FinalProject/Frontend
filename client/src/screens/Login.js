import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { login, sendError } from '../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    console.log(access_token, 'from useeffect');
    if(access_token) getData()
    if(access_token) navigation.navigate('Home')
    
  }, [errors, access_token])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token')
      console.log(value, '<< access_token')
      if(value) {
        // console.log(value, 'ini value')
        console.log('success login')

        navigation.navigate('Home')
      }
    } catch(e) {
      // error reading value
    }
  }

  const userlogin = () => {
    console.log('tekan tombol login')
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