import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';
const BeaconListScreen = props => {
  //const uid = route.params.uid
  const uid = 'test';
  const [selectedTab, setSelectedTab] = useState('groupChat'); // 기본 탭 설정
  const [chatList, setChatList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(''); // New state for search keyword

  useEffect(() => {
    // API 요청을 위한 함수
    const fetchChatList = async () => {
      try {
        let stateValue;
        if (selectedTab === 'groupChat') {
          stateValue = '2';
        } else if (selectedTab === 'event') {
          stateValue = '3';
        }

        const response = await axios.post(
          'http://192.168.0.17:8080/api/room/list',
          {
            id: 'test',
            state: stateValue,
          },
        );

        if (response.data != null) {
          setChatList(response.data);
        } else {
          console.log('방없음');
        }
      } catch (error) {
        console.error(error);
        // 에러 처리 로직 작성
      }
    };

    fetchChatList();
  }, [selectedTab]);

  const handleSearch = () => {
    console.log('Search for:', searchKeyword);
    // Implement your search logic here
  };
  const navigation = useNavigation();

  const renderChatItem = ({item}) => (
    <Pressable
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {chatid: item.number, uid: uid})
      }>
      <View style={styles.avatar} />
      <Text style={styles.chatName}>{item.number} 비콘</Text>
    </Pressable>
  );
  const renderChatItem2 = ({item}) => (
    <Pressable
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('EventBeacon', {chatid: item.number, uid: uid})
      }>
      <View style={styles.avatar} />
      <Text style={styles.chatName}>{item.number} 비콘</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <Pressable
          p="2"
          borderWidth="1"
          borderRadius="10"
          onPress={handleSearch}>
          <Text>검색</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          p="2"
          w="20"
          borderWidth="1"
          alignItems="center"
          borderRadius="10"
          onPress={() => setSelectedTab('groupChat')}>
          <Text>비콘</Text>
        </Pressable>
        <Pressable
          p="2"
          w="20"
          alignItems="center"
          borderWidth="1"
          borderRadius="10"
          onPress={() => setSelectedTab('event')}>
          <Text>이벤트</Text>
        </Pressable>
      </View>
      {selectedTab === 'groupChat' && (
        <>
          <Text>그룹채팅</Text>
          <FlatList
            data={chatList}
            renderItem={renderChatItem}
            keyExtractor={item => item.number}
          />
        </>
      )}

      {selectedTab === 'event' && (
        <>
          <Text>이벤트</Text>
          <FlatList
            data={chatList}
            renderItem={renderChatItem2}
            keyExtractor={item => item.number}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
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
    backgroundColor: '#FF6B6B',
    marginRight: 15,
  },
  chatName: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1, // Takes up remaining space
    marginRight: 10, // Space between input and button
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 8,
  },
});

export default BeaconListScreen;