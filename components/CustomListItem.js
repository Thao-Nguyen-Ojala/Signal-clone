import { Avatar, ListItem } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'

import { StyleSheet } from 'react-native'
import { db } from '../firebase'

const CustomListItem = ({id, chatName, handleEnterChat}) => {
  const [chatMsg, setChatMsg] = useState([])

  useEffect(() => {
    const docRef = query(collection(db, 'chats', id,'messages'), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(docRef, (snapshot) => (
      setChatMsg (
        snapshot.docs.map(doc => doc.data())
      )
    ))

    return unsubscribe
  },[])

  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={()=> handleEnterChat(id, chatName)}
    >
      <Avatar
        rounded
        size={60}
        source={chatMsg?.[0]?.photoURL ? {uri: chatMsg?.[0]?.photoURL} : require('../assets/icon-blue.png')}
        icon={{name: 'user', type: 'font-awesome'}}
       
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800'}}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {chatMsg?.[0]?.displayName}: {chatMsg?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
