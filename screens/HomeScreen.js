import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { auth, db, logout } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';

const HomeScreen = ({navigation}) => {
  const [chats, setChats] = useState([])

  useEffect(() => { 
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => (
      setChats(snapshot.docs.map( doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))

    return unsubscribe
  } , [])

  const handleLogout = () => {
     logout().then(() => {
        navigation.replace('Login')
      })
  }

  const handleEnterChat = (id, chatName) => {
    navigation.navigate('Chat', {id, chatName})
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff'},
      headerTitleStyle: { color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{maginLeft: 20}}>
          <TouchableOpacity activeOpacity={0.5} onPress={handleLogout}>
            <Avatar size={40} rounded source={{ uri: auth?.currentUser?.photoURL}}/>
          </TouchableOpacity>
          
        </View>
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
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='black'/>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name='pencil' size={24} color='black'/>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])
  
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data: {chatName}}) => (
          <CustomListItem key={id} id={id} chatName={chatName} handleEnterChat={handleEnterChat} />
        ))}
        
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})
