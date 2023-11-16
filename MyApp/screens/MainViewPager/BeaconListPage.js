// BeaconListPage.js

<<<<<<< HEAD
import React, {useRef, useState, useEffect} from 'react';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> MOB-34--
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {
  Button,
  Checkbox,
  Input,
  Pressable,
  Box,
  HStack,
  VStack,
  Badge,
  Spacer,
  Flex,
  Switch,
  Image,
  Center,
<<<<<<< HEAD
  ZStack,
} from 'native-base';
import LottieView from 'lottie-react-native';

const BeaconListPage = props => {
  const [numUsers, setNumUsers] = useState(13); // Declare numUsers and setNumUsers
  const [users, setUsers] = useState([]); // Initialize users as empty array

  useEffect(() => {
    const newUsers = Array.from({length: numUsers}, (_, i) => ({
      id: i + 1,
      name: `이상용 ${i + 1}`,
      image: `https://i.namu.wiki/i/Mb4LnlothTX0IkiEhY_flFD_yzmVHYVQxPhC6lqww0AnJfe8JePGSgAUpS09rPLZPr6rrc_8-yKHCtRsN8u9-A.webp`,
      filled: false, // Add filled state for each user
    }));
    setUsers(newUsers);
  }, [numUsers]); // Re-run effect when numUser changes

  const navigation = useNavigation();
  const lottieRefs = useRef({});
  const toggleFill = id => {
    setUsers(
      users.map(user => {
        if (user.id === id) {
          const newUser = {...user, filled: !user.filled};
          // 애니메이션 상태에 따라 LottieView 제어
          if (newUser.filled) {
            lottieRefs.current[id].play();
          } else {
            lottieRefs.current[id].reset();
          }
          return newUser;
        }
        return user;
      }),
    );
  };

=======
} from 'native-base';
import axios from 'axios';
const BeaconListPage = props => {
  const [numUsers, setNumUsers] = useState(13); // Declare numUsers and setNumUsers
  const [users, setUsers] = useState([]); // Initialize users as empty array
  const uid = 'test';
  useEffect(() => {
    const newUsers = Array.from({length: numUsers}, (_, i) => ({
      id: i + 1,
      name: `이상용 ${i + 1}`,
      image: `https://i.namu.wiki/i/Mb4LnlothTX0IkiEhY_flFD_yzmVHYVQxPhC6lqww0AnJfe8JePGSgAUpS09rPLZPr6rrc_8-yKHCtRsN8u9-A.webp`,
      filled: false, // Add filled state for each user
      state: '2',
      uuid: '이벤트비콘 테스트해봄',
    }));
    setUsers(newUsers);
  }, [numUsers]); // Re-run effect when numUser changes

  const navigation = useNavigation();

  const toggleFill = id => {
    setUsers(
      users.map(user =>
        user.id === id ? {...user, filled: !user.filled} : user,
      ),
    );
  };

  const eventHandler = async (uuid, state) => {
    const res = await axios.post('http://192.168.0.17:8080/api/beacon/join', {
      id: uid,
      state: state,
      uuid: uuid,
    });
    console.log(res.data);
    if (state == 2) {
      navigation.navigate('채팅', {
        screen: 'Chat',
        params: {uid: 'test', chatid: res.data.number},
      });
    } else {
      console.log('광고인듯');
    }
  };

>>>>>>> MOB-34--
  return (
    <View>
      <Text style={{marginLeft: 10, padding: 7, fontSize: 16}}>
        근처 비콘 수 : {users.length}
      </Text>
      <ScrollView>
        {users.map(user => (
          <Pressable
            key={user.id}
            p="1"
            marginBottom={1}
            borderWidth="0"
            onPress={() => {
<<<<<<< HEAD
              navigation.navigate('Chat', {
                name: user.name,
              });
            }}>
            <HStack
              space={3}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={3} alignItems="center" marginLeft={4} flex={1}>
                <Image
                  style={{borderRadius: 14}}
                  source={{uri: user.image}}
                  alt={user.name}
                  boxSize={10}
                />
                <VStack>
                  <Text style={{fontSize: 16}}>{user.name}</Text>
                  <Text>hi</Text>
                </VStack>
              </HStack>
              <Pressable key={user.id} onPress={() => toggleFill(user.id)}>
                <LottieView
                  ref={el => (lottieRefs.current[user.id] = el)} // 참조 할당
                  style={{height: 50, width: 50}}
                  source={require('../../components/Lottie/source/heartpicker')}
                  loop={false}
                  autoPlay={false}
                />
=======
              eventHandler(user.uuid, user.state);
            }}>
            <HStack space={3} alignItems="center" marginLeft={4}>
              <Image
                style={{borderRadius: 14}}
                source={{uri: user.image}}
                alt={user.name}
                boxSize={10}
              />
              <VStack>
                <Text style={{fontSize: 16}}>{user.name}</Text>
                <Text>hi</Text>
                {/* Replace with actual heart icon */}
                {/*<Button title={user.filled ? '❤️' : '♡'} onPress={() => toggleFill(user.id)} />*/}
              </VStack>
              <Spacer />
              <Pressable
                p="2"
                borderWidth="1"
                w="9"
                h="9"
                mr="3"
                onPress={() => toggleFill(user.id)}>
                <Text>{user.filled ? '❤️' : ' ♡'}</Text>
>>>>>>> MOB-34--
              </Pressable>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default BeaconListPage;
