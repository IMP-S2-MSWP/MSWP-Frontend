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
  Modal,
} from 'native-base';
/// 스타일 임포트
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {API_URL, Image_URL} from '@env';
import {useUser} from '../../stores/UserContext';
import {insertUserInfo} from '../../components/firebase/roomService';
const BeaconListPage = props => {
  const [users, setUsers] = useState([]); // Initialize users as empty array
  const {user} = useUser();
  const [title, setTitle] = useState('');
  const [fileSource, setFileSource] = useState(null);
  const [isBeaconModalVisible, setIsBeaconModalVisible] = useState(false);

  const navigation = useNavigation();

  const eventHandler = async (uuid, state, beaconname) => {
    const response = await axios.post(API_URL + '/api/beacon/join', {
      id: user.id,
      state: state,
      uuid: uuid,
    });
    console.log(response.data);

    if (state == 2) {
      if (response.data.sc == 201) {
        insertUserInfo(response.data.number, [user.id], [user.nickname]);
        navigation.navigate('채팅', {
          screen: 'Chat',
          params: {rname: beaconname, number: response.data.number},
        });
      } else if (response.data.sc == 200) {
        navigation.navigate('채팅', {
          screen: 'Chat',
          params: {rname: beaconname, number: response.data.number},
        });
      } else {
        console.log('비콘 join 에러');
      }
    } else if (state == 3) {
      if (response.data.sc == 201 || response.data.sc == 200) {
        console.log('광고인듯');
        axios
          .post(API_URL + '/api/beacon/show', {uuid: uuid})
          .then(response => {
            if (response.data != null) {
              console.log(response.data);
              setTitle(response.data.title);
              setFileSource(response.data.advertisementImage);
              setIsBeaconModalVisible(true);
            } else {
              console.log('error');
            }
          })
          .catch(error => {
            console.log(error);
            // 에러 처리 로직 작성
          });
      } else {
        console.log('비콘 join 에러');
      }
    } else {
      //광고 로직 추가 필요
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
              onPress={() =>
                eventHandler(user.uuid, user.state, user.beaconname)
              }>
              <HStack
                space={3}
                alignItems="center"
                justifyContent="space-between">
                <HStack space={3} alignItems="center" marginLeft={4} flex={1}>
                  <Image
                    style={{borderRadius: 14}}
                    source={{uri: Image_URL + '/beacon/' + user.image}}
                    alt={'x'}
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
      <Modal
        isOpen={isBeaconModalVisible}
        onClose={() => setIsBeaconModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>광고</Modal.Header>
          <Modal.Body>
            {fileSource !== null ? (
              <Image
                source={{
                  uri:
                    Image_URL +
                    '/advertisement/' +
                    fileSource +
                    '?cache=' +
                    Math.random(),
                }}
                alt={'x'}
                resizeMode="contain"
                height={400}
              />
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Text>{title}</Text>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default BeaconListPage;
