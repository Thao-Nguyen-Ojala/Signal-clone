import { Button, Icon, Input } from 'react-native-elements';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { addDoc, collection } from "firebase/firestore";

import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
  const [input, setInput] = useState('')
  useLayoutEffect (() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats'
    })
  }, [navigation])

  const createChat = async () => {
    try {
      await addDoc(collection(db, 'chats'), {
        chatName: input
      })
      .then (() => {
        navigation.goBack()
      })
    } catch (error) {
      alert(error)
    }
  }  
   
  return (
    <View style={styles.container}>
      <Input 
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black'/>
        }
      />
      <Button disabled={!input} title='Create new chat' onPress={createChat}/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%'
  }
})
