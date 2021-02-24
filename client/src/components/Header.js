import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import {goBack} from '@react-navigation/stack'
import { SearchBar } from 'react-native-elements';
import { useDispatch } from "react-redux";
import { findSetCardByTitle } from "../store/actions/setCardAction";
import { useDebouncedEffect } from '../helpers/debounce'
import { useRoute } from '@react-navigation/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const [searchKey, setSearchKey] = React.useState('')
  const [searchBar, setSearchBar] = React.useState(false)
  const _goBack = () => {
    navigation.goBack()
  };

  const _handleSearch = () => setSearchBar(true);
  useDebouncedEffect(() => dispatch(findSetCardByTitle(searchKey)), 500, [searchKey])
  const handleOnSubmit = () => {
    setSearchBar(false);
    dispatch(findSetCardByTitle(searchKey))
  }
  return (
    <>
    {
      route.name !== 'Home' ? (
        <Appbar.Header style={styles.header}>
        {
          route.name !== 'Home' && (
            <Appbar.BackAction
            onPress={_goBack}/>
          )
        }
        <Appbar.Content title={route.name}/>
      </Appbar.Header>
      ) : (
        (searchBar === false ? (
          <Appbar.Header style={styles.header}>
            {
              route.name !== 'Home' && (
                <Appbar.BackAction
                onPress={_goBack}/>
              )
            }
            <Appbar.Content color="#444444" title={route.name}/>
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
          </Appbar.Header>
        ) : (
          <SearchBar
          onChangeText={text => {setSearchKey(text)}}
          onSubmitEditing={handleOnSubmit}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholder="Type Here..."
          value={searchKey}/>
        ))
        
      )
    }
    </>
  )
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingRight: wp("5%"),
    paddingLeft: wp("5%"),
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingBottom: 0,
    paddingTop: hp("5%"),
    paddingBottom: hp("0"),
    borderBottomWidth: 0
  },
  searchInputContainer: {
    backgroundColor: '#fff'
  },
  searchInput: {
    backgroundColor: 'white',
    paddingLeft: wp("5%"),
    marginLeft: 0,
    marginRight: 0,
    height: 20
  }
});

export default Header;