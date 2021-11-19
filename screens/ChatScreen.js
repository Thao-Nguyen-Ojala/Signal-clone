import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore';
import { auth, db } from '../firebase';

import { Avatar } from 'react-native-elements';
import { Header } from '@react-navigation/stack';

const ChatScreen = ({ navigation, route }) => {
  const { params } = route
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${params.chatName}`,
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar rounded source={require('../assets/icon-blue.png')}/>
          <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>{params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={navigation.goBack}
        >
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 10
          }}
        >
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white'/>
          </TouchableOpacity>
        </View>
        
      )
    })
  }, [navigation, messages])

  const sendMsg = () => {
    Keyboard.dismiss()

    addDoc(collection(db, 'chats', params.id, 'messages'),{
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('')
  }

  useLayoutEffect(()  => {
    const docRef = query(collection(db, 'chats', params.id, 'messages'), orderBy('timestamp', 'asc'))
    const unsubscribe = onSnapshot(docRef, (snapshot) => (
      setMessages (
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    ))
    return unsubscribe
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <StatusBar style='light'/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop: 15}}>
              {messages.map(({id, data}) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar 
                      size={30}
                      position='absolute'
                      rounded
                      //WEB
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5
                      }}
                      bottom={-15}
                      right={-5}
                      source={{ uri: messages[0].data.photoURL
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                     <Avatar 
                      size={30}
                      position='absolute'
                      rounded
                      //WEB
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        left: -5
                      }}
                      bottom={-15}
                      left={-5}
                      source={{ uri: data.photoURL}}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder='Type your message'
                style={styles.textInput}
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMsg}
              />
              <TouchableOpacity onPress={sendMsg} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color='#2B68E8'/>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback >
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative'
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E4',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative'
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white'
  }
})
