import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
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
import {API_URL, Image_URL} from './../env';

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
          const type = user.id === document.data().name;
          documents.push({
            id: document.id,
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
      await addDoc(collection(db, 'room', route.params.number, 'chat'), {
        name: user.nickname,
        text: newMessage,
        date: Timestamp.now(),
      });
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
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
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }
            onLayout={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }
            style={{flex: 1}}
            contentContainerStyle={styles.messagesContainer}>
            {data.map(message => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.isMine
                    ? styles.myMessageContainer
                    : styles.theirMessageContainer,
                ]}>
                {!message.isMine && (
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: Image_URL + '/user/' + message.name + '.jpg',
                    }}
                    alt={message.name}
                  />
                )}
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
              </View>
            ))}
          </ScrollView>

          {/* Message input */}
          <View style={styles.footer}>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              style={styles.input}
              placeholder="Type a message"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{marginBottom: 20}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#2679ff',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 0.5,
    paddingHorizontal: 15,
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#2679ff',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2679ff',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
