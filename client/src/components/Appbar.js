import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MyComponent = ({navigation}) => (
 <Appbar style={styles.bottom}>
   <Appbar.Action
   style={styles.icon}
     icon="home"
     onPress={() => navigation.navigate('Home')}
    />
    <Appbar.Action
    style={styles.icon}
    icon="magnify"
    onPress={() => console.log('Pressed search')} />
    <Appbar.Action
    style={styles.icon}
    icon="layers-plus"
    onPress={() => navigation.navigate('Create')} />
    <Appbar.Action
      icon="account"
      onPress={() => navigation.navigate('Account')}
    />
  </Appbar>
 );

export default MyComponent

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#444444',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    marginRight: 50
  }
});