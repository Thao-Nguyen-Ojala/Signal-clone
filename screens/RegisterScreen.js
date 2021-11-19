import { Button, Input, Text } from 'react-native-elements'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'
import { signUp } from '../firebase'
import { updateProfile } from '@firebase/auth'

const RegisterScreen = ({navigation}) => {
  const [name, setName] =  useState('')
  const [email, setEmail] =  useState('')
  const [password, SetPassword] =  useState('')
  const [imgUrl, setImgUrl] =  useState('')
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const handleSignup = async () => {
    setLoading(true)     
    try {
      await signUp(email, password)
        .then((authUser) => {
          updateProfile(authUser.user,{
            displayName: name,
            photoURL: imgUrl || 'https://via.placeholder.com/150',
          })
        })
    } catch (error) {
      alert(error.message)
    }
    setLoading(false)        
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
        <Text h3 style={{marginBottom: 50}}>
          Create new account
        </Text>

        <View style={styles.inputContainer}>
          <Input
            placeholder='Full Name'
            autofocus type='text'
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder='Email'
            autofocus type='text'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder='Password'
            autofocus type='password'
            secureTextEntry value={password}
            onChangeText={(text) => SetPassword(text)}
          />
          <Input
            placeholder='Profile Image URL (optional)'
            autofocus
            type='text'
            value={imgUrl}
            onChangeText={(text) => setImgUrl(text)}
            onSubmitEditing={handleSignup}
          />
        </View>

        <Button
          containerStyle={styles.button}
          onPress={handleSignup}
          title='Register'
          raised
          disable= {loading}
        />
        <View style={{height: 10}} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
