// UserListPage.js

import React, {useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {View, Text, FlatList, ScrollView, Alert} from 'react-native';
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
import axios from 'axios';
import useBluetoothScanner from '../../components/BluetoothScanner';
// import {API_URL} from '@env';
import {API_URL} from '../../env';
import LottieView from 'lottie-react-native';
import {useUser} from '../../stores/UserContext';
// Dummy data for demonstration

const UserListPage = props => {
  const [users, setUsers] = useState([]); // Initialize users as empty array

  const {devices, startScan, scanning} = useBluetoothScanner();
  const {statues, setStatues} = useState(false);
  const [heartList, setHeartList] = useState([]);
  const [userIdList, setUserIdList] = useState([]);
  const lottieRefs = useRef({});

  const {user} = useUser();
  useEffect(() => {
    heartlist(user.id);
    // 컴포넌트 마운트 시 1회 스캔을 수행합니다.
    const initialScanTimeout = setTimeout(() => {
      startScan(5, scannedDevices => {
        // console.log('Scanning complete, devices:', scannedDevices);
      });
    }, 1000);

    const scanInterval = setInterval(() => {
      startScan(5, scannedDevices => {
        console.log('Scanning complete, devices:', scannedDevices);
      });
    }, 6000);

    return () => {
      clearTimeout(initialScanTimeout);
      clearInterval(scanInterval);
    };
  }, []);

  useEffect(() => {
    if (!scanning) {
      const userUUIDsArray = users.map(user => user.uuid);

      // 스캔된 디바이스 중에서 users 배열에 없는 UUIDs만 가진 디바이스를 필터링합니다.
      // device.advertising.serviceUUIDs가 배열이므로, 배열 내에 userUUIDs가 없는 것을 찾아야 합니다.
      // devices 배열에서 각 device의 serviceUUIDs를 추출하여 하나의 배열로 합칩니다.
      const deviceUUIDsArray = devices.flatMap(
        device => device.advertising.serviceUUIDs,
      );
      // userUUIDsArray에 없는 deviceUUIDsArray의 UUID들만 추출합니다.
      const newUUIDsToCheck = deviceUUIDsArray.filter(
        uuid => !userUUIDsArray.includes(uuid),
      );
      const delUUIDsToCheck = userUUIDsArray.filter(
        uuid => !deviceUUIDsArray.includes(uuid),
      );
      if (delUUIDsToCheck.length > 0) {
        const updatedUsers = users.filter(
          user => !delUUIDsToCheck.includes(user.uuid),
        );
        setUsers(updatedUsers); // 필터링된 사용자 목록으로 users 상태를 업데이트
      }
      console.log('878787878' + delUUIDsToCheck);

      // 필터링된 새 디바이스가 있다면, 해당 디바이스의 serviceUUIDs를 확인합니다.
      if (newUUIDsToCheck.length > 0) {
        checkNewDeviceServiceUUIDs(newUUIDsToCheck);
      }
    }
  }, [scanning]);

  useEffect(() => {
    props.setList(users.map(user => user.id));
    props.setUsers(users.map(user => user));
  }, [users]);

  // Re-run effect when devices changes

  const navigation = useNavigation();

  const toggleFill = id => {
    setUsers(
      users.map(usermap => {
        if (usermap.id === id) {
          const newUser = {...usermap, filled: !usermap.filled};
          // 애니메이션 상태에 따라 LottieView 제어
          if (newUser.filled) {
            addHeart(user.id, id);
            lottieRefs.current[id].play();
          } else {
            lottieRefs.current[id].reset();
            addHeart(user.id, id);
          }
          return newUser;
        }
        return usermap;
      }),
    );
  };
  async function checkNewDeviceServiceUUIDs(newUUIDs) {
    try {
      console.log('New service UUIDs to check:', newUUIDs);
      // Send POST request with the new UUIDs
      const response = await axios.post(API_URL + '/api/around', {
        uuidList: newUUIDs, // Only the new service UUIDs
      });
      console.log(response.data);
      // Handle the server response
      if (response.data) {
        console.log('Service UUIDs check was successful.');
        updateUsers(response.data); // Assuming updateUsers function is designed to handle the response data properly.
      } else {
        console.log('There was a problem checking the Service UUIDs.');
      }
      return response.data; // Return the data for further processing if needed
    } catch (error) {
      console.error(
        'An error occurred while checking the new service UUIDs:',
        error,
      );
      return error; // Returning error for handling it appropriately in the calling context
    }
  }
  async function addHeart(idFrom, idTo) {
    try {
      const response = await axios.post(API_URL + '/api/click', {
        idFrom: idFrom, // Only the new service UUIDs
        idTo: idTo, // Only the new service UUIDs
      });
      console.log(response.data);
      // Handle the server response
      if (response.data) {
        console.log('Service UUIDs check was successful.'); // Assuming updateUsers function is designed to handle the response data properly.
      } else {
        console.log('There was a problem checking the Service UUIDs.');
      }
      return response.data; // Return the data for further processing if needed
    } catch (error) {
      console.error(
        'An error occurred while checking the new service UUIDs:',
        error,
      );
      return error; // Returning error for handling it appropriately in the calling context
    }
  }
  async function heartlist(id) {
    try {
      const response = await axios.get(API_URL + '/api/count?id=' + id);
      console.log(response.data);
      // Handle the server response
      if (response.data) {
        console.log('Service UUIDs check was successful.');
        extractIdFrom(response.data); // Assuming updateUsers function is designed to handle the response data properly.
      } else {
        console.log('There was a problem checking the Service UUIDs.');
      }
      return response.data; // Return the data for further processing if needed
    } catch (error) {
      console.error(
        'An error occurred while checking the new service UUIDs:',
        error,
      );
      return error; // Returning error for handling it appropriately in the calling context
    }
  }

  const updateUsers = data => {
    // 필터링하여 null이 아닌 유저 객체만 추출하고 배열로 변환
    const newUsers = Object.values(data).filter(
      user => user && typeof user === 'object',
    );
    const plusUser = newUsers.map(user => {
      return {
        ...user,
        filled: heartList.includes(user.id),
      };
    });
    const updatedUser = [...users, ...plusUser];

    setUsers(updatedUser); // 추출한 유저 배열로 상태 업데이트
  };
  const extractIdFrom = data => {
    setHeartList(data.list.map(item => item.idTo));
  };
  // 예시로 device.advertising.serviceUUIDs가 다음과 같다고 가정합니다.

  // 함수를 호출하여 서비스 UUIDs를 검사합니다.

  return (
    <View>
      <Text style={{marginLeft: 10, padding: 7, fontSize: 16}}>
        근처 유저 수 : {users.filter(user => user.gender !== 'P').length}
      </Text>
      <ScrollView>
        {users
          .filter(user => user.gender !== 'P')
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
                    <Text style={{fontSize: 16}}>{user.name}</Text>
                    <Text>{user.message}</Text>
                    {/* Replace with actual heart icon */}
                    {/*<Button title={user.filled ? '❤️' : '♡'} onPress={() => toggleFill(user.id)} />*/}
                  </VStack>
                </HStack>
                <Pressable key={user.id} onPress={() => toggleFill(user.id)}>
                  <LottieView
                    ref={el => (lottieRefs.current[user.id] = el)} // 참조 할당
                    style={{height: 50, width: 50}}
                    source={require('../../components/Lottie/source/heartpicker')}
                    loop={false}
                    autoPlay={false}
                    progress={user.filled ? 1 : 0}
                  />
                </Pressable>
              </HStack>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

export default UserListPage;
