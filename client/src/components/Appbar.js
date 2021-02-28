import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyComponent = ({navigation}) => (
<Appbar style={styles.bottom}>
  <Appbar.Action
    style={styles.icon}
    icon="home"
    onPress={() => navigation.navigate('Home')}
    />
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
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: wp("8%"),
    paddingRight: wp("8%"),
    elevation: 10
  },
  icon: {
    marginRight: 50
  }
});