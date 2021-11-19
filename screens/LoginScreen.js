import { Button, Image, Input } from 'react-native-elements'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, login } from '../firebase'

import { StatusBar } from 'expo-status-bar'
import { onAuthStateChanged } from 'firebase/auth'

const LoginScreen = ({navigation}) => {
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if(authUser) { navigation.replace('Home')}
    })
    return unsubscribe
  }, [])


  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email, password)
    } catch (error) {
      alert(error.message)
    }
    setLoading(false)       
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image 
        source={require('../assets/signal-logo.png')}
        style={{width: 200, height: 200}}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus type='email'
          value={email} 
          onChangeText={(text) => SetEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          type='password'
          value={password} 
          onChangeText={(text) => SetPassword(text)}
          onSubmitEditing={handleLogin}
        />
        <View style={{height: 100}}/>
      </View>

      <Button containerStyle={styles.button} title='Login' onPress={handleLogin}/>
      <Button containerStyle={styles.button} type='outline' onPress={() => navigation.navigate('Register')} title='Register'/>
    </KeyboardAvoidingView >
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
