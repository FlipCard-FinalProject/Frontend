// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your appa!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider} from 'react-redux'
import store from './src/store'
import Appbar from './src/components/Appbar'
import Header from './src/components/Header'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Account from './src/screens/Account'
import Edit from './src/screens/Edit'
import Create from './src/screens/Create'
import Flip from './src/screens/Flip'
import * as firebase from 'firebase'
import apiKeysFirebase from './src/store/actions/apiKeysFirebase';

const Stack = createStackNavigator()

export default function App() {
  if (!firebase.apps.length) { firebase.initializeApp(apiKeysFirebase.FirebaseConfig)}
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
              <Stack.Screen name="Register" component={Register}></Stack.Screen>
              <Stack.Screen name="Account" component={Account}></Stack.Screen>
              <Stack.Screen name="Edit" component={Edit}></Stack.Screen>
              <Stack.Screen name="Create" component={Create}></Stack.Screen>
              <Stack.Screen name="Flip" component={Flip}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}