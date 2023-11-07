import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Flex} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
import {app} from "./db.js";
import {getFirestore, doc, onSnapshot, query,collection,Timestamp,addDoc} from "firebase/firestore"
const db = getFirestore(app)
const ChatScreen = ({ route }) => {
    const [data,setData] = useState([])
    useEffect(()=>{
      onSnapshot(collection(db,"room","abc1024","chat"),(docSnapshot)=>{
        let documents = []
        docSnapshot.forEach((document)=>{
          documents.push({
            id:document.id,
            ...document.data()
          })
        })
        setData(documents)
      })
    },[])
    const [messages, setMessages] = useState([
      { id: 1, text: 'Hello! How are you?', isMine: false },
      { id: 2, text: "I'm good, thanks! And you?", isMine: true }
    ]);
  
    const [newMessage, setNewMessage] = useState('');
  
    const sendMessage = () => {
      if (newMessage.trim().length > 0) {
        setMessages([...messages, { id: Date.now(), text: newMessage, isMine: true }]);
        setNewMessage('');
      }
    };
    
    return (
      <View>
        {data.map(item=>(
            <View key={item.id}>
              <Text>{item.text}</Text>
              </View>
        ))}
      </View>
    //     <View style={styles.container}>
    //     <View style={styles.header}>
    //       <Text style={styles.headerText}>Chat</Text>
    //       <TouchableOpacity>
    //         {/* SVG for React Native might need another library like react-native-svg */}
    //         {/* ... Your SVG goes here */}
    //         <Text style={{ display: 'none' }}>New chat</Text>
    //       </TouchableOpacity>
    //     </View>
  
    //     <ScrollView style={styles.main}>
    //   {messages.map((message) => (
    //     <View key={message.id} style={{ ...styles.chat, justifyContent: message.isMine ? 'flex-end' : 'flex-start' }}>
    //       {!message.isMine && <Image source={{ uri: '/placeholder.svg' }} style={styles.avatar} resizeMode="cover" />}
    //       <View style={message.isMine ? styles.myMessageBox : styles.messageBox}>
    //         <Text style={message.isMine ? styles.myMessageText : styles.messageText}>{message.text}</Text>
    //       </View>
    //       {message.isMine && <Image source={{ uri: '/placeholder.svg' }} style={styles.avatar} resizeMode="cover" />}
    //     </View>
    //   ))}
    // </ScrollView>
  
    // <View style={styles.footer}>
    //   <TextInput
    //     value={newMessage}
    //     onChangeText={setNewMessage}
    //     style={styles.input}
    //     placeholder="Type a message"
    //   />
    //   <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
    //     <Text style={styles.sendButtonText}>보내기</Text>
    //   </TouchableOpacity>
    // </View>
    //   </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'linear-gradient(to right, #D291BC, #F6B2D0, #FF6B6B)', // Note: React Native doesn't support linear gradients out of the box. You may need a library like 'react-native-linear-gradient'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FFFFFF',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    main: {
      flex: 1,
      padding: 10,
    },
    chat: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    messageBox: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 8,
      maxWidth: '70%',
    },
    myMessageBox: {
      backgroundColor: '#FFC1D7',
      padding: 10,
      borderRadius: 8,
      maxWidth: '70%',
    },
    messageText: {
      fontSize: 16,
      color: '#000',
    },
    myMessageText: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    footer: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#FFFFFF',
    },
    input: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      marginRight: 10,
    },
    sendButton: {
        padding: 10,
        backgroundColor: '#FF6B6B',
        borderRadius: 8,
      },
      sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
  });
export default ChatScreen;