import React, {useRef, useState, useEffect} from 'react';
import {View, Text, ScrollView, Alert, SafeAreaView} from 'react-native';
import {VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {Image, HStack} from 'native-base';
import {app} from '../components/firebase/db.js';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import {useUser} from '../stores/UserContext';
import {API_URL, Image_URL, PUSH_URL} from '../env';
import ChatInput from '../components/Input/ChatInput';
import axios from 'axios';
import styles from '../components/Style/Chat/ChatScreenStyle.js';
const db = getFirestore(app);

const ChatScreen = ({route}) => {
  const {user} = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [data, setData] = useState([]);
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const rname = route.params.rname;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'room', route.params.number, 'chat'),
      docSnapshot => {
        let documents = [];
        docSnapshot.forEach(document => {
          const type = user.id === document.data().id;
          documents.push({
            docid: document.id,
            ...document.data(),
            isMine: type,
          });
        });
        documents.sort((a, b) => a.date - b.date);
        console.log(documents);
        setData(documents);
      },
    );

    return () => unsubscribe();
  }, [route.params.number, user.id]);

  const sendMessage = async () => {
    if (newMessage.length > 0) {
      try {
        await addDoc(collection(db, 'room', route.params.number, 'chat'), {
          name: user.name,
          text: newMessage,
          date: Timestamp.now(),
          id: user.id,
        });
        axios.post(PUSH_URL + '/fcm/notification', {
          to: route.params.number,
          id: user.id,
          nickname: user.name,
          text: newMessage,
        });
      } catch (err) {
        console.log(err);
      }
      setNewMessage('');
    } else {
      Alert.alert('Please enter a message to send.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack>
        <Text
          style={{
            fontWeight: 'bold',
            margin: 14,
            marginBottom: 22,
            fontSize: 20,
            alignSelf: 'flex-start',
            color: '#2679ff',
          }}>
          Wennect
        </Text>
      </HStack>
      <View style={{flex: 1}}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-outline"
            color="white"
            size={30}
            onPress={navigation.goBack}
          />
          <Text style={styles.headerText}>{rname}</Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{flex: 1}}
          contentContainerStyle={styles.messagesContainer}
          automaticallyAdjustKeyboardInsets={true}>
          {data.map(message => (
            <View
              key={message.docid}
              style={[
                styles.messageContainer,
                message.isMine
                  ? styles.myMessageContainer
                  : styles.theirMessageContainer,
              ]}>
              {!message.isMine && (
                <VStack>
                  <Image
                    style={styles.userImage}
                    source={
                      {
                        uri: Image_URL + '/user/' + message.id + `.jpg`,
                      } != null
                        ? {
                            uri: Image_URL + '/user/' + message.id + `.jpg`,
                          }
                        : {uri: Image_URL + '/user/no_image.jpg'}
                    }
                    fallbackSource={{uri: Image_URL + '/user/no_image.jpg'}}
                    alt={Image_URL + '/user/no_image.jpg'}
                  />
                </VStack>
              )}
              <VStack w="100%">
                {!message.isMine ? (
                  <Text style={{color: '#000000'}}>{message.name}</Text>
                ) : null}
                <View
                  style={[
                    styles.message,
                    message.isMine ? styles.myMessage : styles.theirMessage,
                  ]}>
                  <Text
                    style={
                      message.isMine
                        ? styles.myMessageText
                        : styles.theirMessageText
                    }>
                    {message.text}
                  </Text>
                </View>
              </VStack>
            </View>
          ))}
        </ScrollView>

        {/* Message input */}

        <ChatInput
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
          placeholder="Type a message"
          returnKeyType="send"
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
        />
      </View>
      <View style={{marginBottom: 20}} />
    </SafeAreaView>
  );
};

export default ChatScreen;
