import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {Pressable, HStack, Spacer} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL, Image_URL} from '../env';
import {Box} from 'native-base';
import {useUser} from '../stores/UserContext';

const ChatListScreen = props => {
  //const uid = route.params.uid
  const {user} = useUser();
  const uid = user.id;
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    axios
      .post(API_URL + '/api/room/list', {id: uid, state: '1'})

      .then(response => {
        if (response.data != null) {
          console.log(response.data);
          setChatList(response.data);
        } else {
          console.log('방없음');
        }
      })
      .catch(error => {
        console.log(error);
        // 에러 처리 로직 작성
      });
  }, []);

  const navigation = useNavigation();

  const renderChatItem = ({item}) => (
    <Pressable
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {
          number: item.number,
          rname: item.rname,
        })
      }>
      <Image
        source={{
          uri: Image_URL + '/user/' + item.id + '.jpg',
        }}
        style={styles.avatar}
      />
      <Text style={styles.chatName}>{item.rname}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HStack>
        <Text
          style={{
            fontWeight: 'bold',
            margin: 14,
            fontSize: 20,
            alignSelf: 'flex-start',
            color: '#2679ff',
          }}>
          Wennect
        </Text>
      </HStack>
      <Box bg="#2679ff" p="2">
        <Text style={{color: 'white', fontSize: 17}}>채팅</Text>
      </Box>

      <FlatList
        data={chatList}
        renderItem={renderChatItem}
        keyExtractor={item => item.number}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  chatName: {
    fontSize: 16,
  },
});

export default ChatListScreen;
