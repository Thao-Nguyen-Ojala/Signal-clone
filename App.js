import { AddChatScreen, ChatScreen, HomeScreen, LoginScreen, RegisterScreen } from './screens';
import { LogBox, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED'},
  headerTitleStyle: { color: 'white'},
  headerTintColor: 'white',
  headerTitleAlign: 'center'
}

export default function App() {

  useEffect(() => {
    /*LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage", 
      "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info."
    ]);*/
    LogBox.ignoreAllLogs()
  }, [])
  
  return (
    <NavigationContainer >
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={globalScreenOptions} 
      >
        <Stack.Screen name='AddChat' component={AddChatScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
