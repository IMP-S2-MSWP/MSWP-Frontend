import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {
  Button,
  Checkbox,
  Input,
  useTheme,
  Pressable,
  Box,
  HStack,
  Badge,
  Spacer,
  Flex,
} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {app} from './db.js';
import {
  getFirestore,
  doc,
  onSnapshot,
  query,
  collection,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import {useUser} from '../stores/UserContext';
const db = getFirestore(app);
const ChatScreen = ({route}) => {
  const {user} = useUser();
  const uid = user.id;
  const [newMessage, setNewMessage] = useState('');
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation(); // <-- 여기에 추가
  const rname = route.params.rname;
  useEffect(() => {
    console.log(route.params.number);
    onSnapshot(
      collection(db, 'room', route.params.number, 'chat'),
      docSnapshot => {
        let documents = [];
        docSnapshot.forEach(document => {
          const type = uid == document.data().name ? true : false;
          documents.push({
            id: document.id,
            ...document.data(),
            isMine: type,
          });
        });
        documents = documents.sort((a, b) => a.date - b.date);
        setData(documents);
      },
    );
    // onSnapshot(
    //   collection(db, 'room', route.params.number, 'user'),
    //   docSnapshot => {
    //     console.log('유저내역');
    //     let documents = [];
    //     docSnapshot.forEach(document => {
    //       const type = uid == document.data().name ? true : false;
    //       documents.push({
    //         id: document.id,
    //         ...document.data(),
    //         isMine: type,
    //       });
    //     });
    //     setUser(documents);
    //   },
    // );
  }, []);
  const sendMessage = async () => {
    // if (newMessage.trim().length > 0) {
    //   setMessages([...messages, { id: Date.now(), text: newMessage, isMine: true }]);
    //   setNewMessage('');
    // }
    if (newMessage.length > 0) {
      await addDoc(collection(db, 'room', route.params.number, 'chat'), {
        name: uid,
        text: newMessage,
        date: Timestamp.now(),
      });
      setNewMessage('');
    } else {
      Alert.alert('보낼 메세지 입력 하시요');
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.header}>
        <HStack>
          <Pressable
            onPress={() => {
              console.log('hello');
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back-outline" color="white" size={30} />
          </Pressable>

          <Spacer />
          <Text style={styles.headerText}>{rname}님과의 채팅</Text>
        </HStack>
      </View>

      <ScrollView style={styles.main}>
        {data.map(message => (
          <View
            key={message.id}
            style={{
              ...styles.chat,
              justifyContent: message.isMine ? 'flex-end' : 'flex-start',
            }}>
            {!message.isMine && (
              <Image
                source={{uri: '/placeholder.svg'}}
                style={styles.avatar}
                resizeMode="cover"
              />
            )}
            <View
              style={message.isMine ? styles.myMessageBox : styles.messageBox}>
              <Text
                style={
                  message.isMine ? styles.myMessageText : styles.messageText
                }>
                {message.text}
              </Text>
            </View>
            {message.isMine && (
              <Image
                source={{uri: '/placeholder.svg'}}
                style={styles.avatar}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
        {users.map(message => (
          <View
            key={message.id}
            style={{
              ...styles.chat,
              justifyContent: message.isMine ? 'flex-end' : 'flex-start',
            }}>
            {!message.isMine && (
              <Image
                source={{uri: '/placeholder.svg'}}
                style={styles.avatar}
                resizeMode="cover"
              />
            )}
            <View
              style={message.isMine ? styles.myMessageBox : styles.messageBox}>
              <Text
                style={
                  message.isMine ? styles.myMessageText : styles.messageText
                }>
                {message.name}
              </Text>
            </View>
            {message.isMine && (
              <Image
                source={{uri: '/placeholder.svg'}}
                style={styles.avatar}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>보내기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Note: React Native doesn't support linear gradients out of the box. You may need a library like 'react-native-linear-gradient'
  },
  header: {
    padding: 5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    width: '100%',
    height: 40,
    backgroundColor: '#2679ff',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: '#2679ff',
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
    borderColor: '#2679ff',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#2679ff',
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
export default ChatScreen;
