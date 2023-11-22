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
} from 'native-base';
/// 스타일 임포트
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {API_URL} from '../../env';

const BeaconListPage = props => {
  const [users, setUsers] = useState([]); // Initialize users as empty array
  const uid = 'test';

  const navigation = useNavigation();

  const eventHandler = async (uuid, state) => {
    const res = await axios.post(API_URL + '/api/beacon/join', {
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

  return (
    <View>
      <Text style={{marginLeft: 10, padding: 7, fontSize: 16}}>
        근처 비콘 수 : {props.users.filter(user => user.gender == 'P').length}
      </Text>
      <ScrollView>
        {props.users
          .filter(user => user.gender == 'P')
          .map(user => (
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
                    source={{uri: API_URL + '/images/' + user.image}}
                    alt={user.name}
                    boxSize={10}
                  />
                  <VStack>
                    <Text style={{fontSize: 16}}>{user.beaconname}</Text>
                    <Text>{user.message}</Text>
                    {/* Replace with actual heart icon */}
                    {/*<Button title={user.filled ? '❤️' : '♡'} onPress={() => toggleFill(user.id)} />*/}
                  </VStack>
                </HStack>
              </HStack>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

export default BeaconListPage;
