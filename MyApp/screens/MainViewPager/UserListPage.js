// UserListPage.js

import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import useBluetoothScanner from '../../components/BluetoothScanner';
// Dummy data for demonstration

const UserListPage = props => {
  const [numUsers, setNumUsers] = useState(13); // Declare numUsers and setNumUsers
  const [users, setUsers] = useState([]); // Initialize users as empty array
  const {devices, startScan, scanning} = useBluetoothScanner();
  const {statues, setStatues} = useState(false);
  useEffect(() => {
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
      console.log('devices', devices);
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

  // Re-run effect when devices changes

  const navigation = useNavigation();

  const toggleFill = id => {
    setUsers(
      users.map(user =>
        user.id === id ? {...user, filled: !user.filled} : user,
      ),
    );
  };
  async function checkNewDeviceServiceUUIDs(newUUIDs) {
    try {
      console.log('New service UUIDs to check:', newUUIDs);
      // Send POST request with the new UUIDs
      const response = await axios.post('http://192.168.0.16:8080/api/around', {
        uuidList: newUUIDs, // Only the new service UUIDs
      });
      // const response = {
      //   data: {
      //     1: {
      //       birth: '2000-02-14',
      //       gender: 'M',
      //       id: 'test',
      //       image: 'test.jpg',
      //       message: 'test 계정입니다',
      //       name: '이승민',
      //       nickname: 'test',
      //       uuid: 'bc21688d-1378-4f10-b49f-ab4e5dbb7936',
      //     },
      //     2: {
      //       birth: '2000-02-14',
      //       gender: 'M',
      //       id: 'test2',
      //       image: 'test2.jpg',
      //       message: 'test 계정입니다',
      //       name: '고주원',
      //       nickname: 'test',
      //       uuid: 'bc21688d-1378-4f10-b49f-ab4e5dbb7937',
      //     },
      //     sc: 200,
      //   },
      // };
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

  const updateUsers = data => {
    // 필터링하여 null이 아닌 유저 객체만 추출하고 배열로 변환
    const newUsers = Object.values(data).filter(
      user => user && typeof user === 'object',
    );
    const updatedUser = [...users, ...newUsers];

    setUsers(updatedUser); // 추출한 유저 배열로 상태 업데이트
  };

  // 예시로 device.advertising.serviceUUIDs가 다음과 같다고 가정합니다.

  // 함수를 호출하여 서비스 UUIDs를 검사합니다.

  return (
    <View>
      <Text style={{marginLeft: 10, padding: 7, fontSize: 16}}>
        근처 유저 수 : {users.length}
      </Text>
      {/* <ScrollView>
        {devices.map((device, index) => (
          <Text key={index}>
            name: {device.advertising.serviceUUIDs} id : {device.id}
          </Text>
        ))}
      </ScrollView> */}

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
            <HStack space={3} alignItems="center" marginLeft={4}>
              {/* <Image
                style={{borderRadius: 14}}
                source={{uri: user.image}}
                alt={user.name}
                boxSize={10}
              /> */}
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
              </Pressable>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default UserListPage;
