// BeaconListPage.js

import React, {useRef, useState, useEffect} from 'react';
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
              </Pressable>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default BeaconListPage;
