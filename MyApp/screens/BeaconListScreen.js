import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {Pressable, HStack, Box, Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useUser} from '../stores/UserContext';
import {TextInput} from 'react-native-gesture-handler';
import {API_URL, Image_URL} from '../env';
import style from '../components/Style/Signup/style';
const BeaconListScreen = props => {
  //const uid = route.params.uid
  const {user} = useUser();
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
        console.log(user.id, stateValue);
        const response = await axios.post(API_URL + '/api/beacon/list', {
          id: user.id,
          state: stateValue,
        });

        if (response.data != null) {
          console.log(response.data);
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
        navigation.navigate('Chat', {number: item.uuid, rname: item.beaconname})
      }>
      <Image
        style={styles.avatar}
        source={{uri: Image_URL + '/beacon/' + item.image}}
        alt={'test'}
        boxSize={10}
      />
      <Text style={styles.chatName}>{item.beaconname} 비콘</Text>
    </Pressable>
  );
  const renderChatItem2 = ({item}) => (
    <Pressable
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('EventBeacon', {
          number: item.uuid,
          rname: item.beaconname,
        })
      }>
      <Image
        style={styles.avatar}
        source={{uri: Image_URL + '/beacon/' + item.image}}
        alt={'test'}
        boxSize={10}
      />
      <Text style={styles.chatName}>{item.beaconname} 비콘</Text>
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
        <Text style={{color: 'white', fontSize: 17}}>비콘</Text>
      </Box>
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
          <Text style={styles.selectText}>그룹채팅</Text>
          <FlatList
            data={chatList}
            renderItem={renderChatItem}
            keyExtractor={item => item.uuid}
          />
        </>
      )}

      {selectedTab === 'event' && (
        <>
          <Text style={styles.selectText}>이벤트</Text>
          <FlatList
            data={chatList}
            renderItem={renderChatItem2}
            keyExtractor={item => item.uuid}
          />
        </>
      )}
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
  selectText: {
    marginLeft: 20,
    fontSize: 14,
  },
});

export default BeaconListScreen;
