import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {goBack} from '@react-navigation/stack'

const Header = ({navigation}) => {
  const _goBack = () => {
    navigation.goBack()
  };

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction
      onPress={_goBack}/>
      <Appbar.Content title="Home"/>
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#444444',
  },
});

export default Header;