// UserListPage.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList,ScrollView} from 'react-native';
import {Button, Checkbox, Input,
    Pressable ,Box,HStack,VStack,Badge ,Spacer,Flex ,Switch ,Image ,Center} 
from "native-base"
import axios from 'axios';
import useBluetoothScanner from '../../components/BluetoothScanner';
// Dummy data for demonstration


const UserListPage = (props) => {
    const [numUsers, setNumUsers] = useState(13); // Declare numUsers and setNumUsers
    const [users, setUsers] = useState([]); // Initialize users as empty array
    const { devices,startScan} = useBluetoothScanner();
    useEffect(() => {
        // 스캔을 시작하는 함수를 정의합니다.
        const timeoutId = setTimeout(() => {
            startScan();
          }, 1000);
        const intervalId = setInterval(() => {
          startScan();
          setTimeout(() => {
            console.log(devices);
            checkDevicesServiceUUIDs(devices);
          }, 5000); // 20초마다 스캔을 시작합니다.
        }, 10000); // 20초를 의미하는 20000ms
    
        // 컴포넌트가 언마운트되거나 useEffect가 다시 실행되기 전에 interval을 정리합니다.
        return () => clearInterval(intervalId);
      }, []); // Re-run effect when devices changes
    // useEffect(() => {
    //     const newUsers = Array.from({ length: numUsers }, (_, i) => ({
    //         id: i + 1,
    //         name: `이상용 ${i + 1}`,
    //         image: `https://i.namu.wiki/i/Mb4LnlothTX0IkiEhY_flFD_yzmVHYVQxPhC6lqww0AnJfe8JePGSgAUpS09rPLZPr6rrc_8-yKHCtRsN8u9-A.webp`,
    //         filled: false // Add filled state for each user
    //     }));
    //     setUsers(newUsers);
    // }, [numUsers]); // Re-run effect when numUser changes

    const navigation = useNavigation();

    const toggleFill = (id) => {
      setUsers(users.map(user =>
        user.id === id ? {...user, filled: !user.filled} : user
      ));
    };
    async function checkDevicesServiceUUIDs(devices) {
        try {
          // 모든 device의 serviceUUIDs를 하나의 배열로 합칩니다.
          const allServiceUUIDs = devices.flatMap(device => device.advertising.serviceUUIDs);
      
          // '/api/around' 엔드포인트로 POST 요청을 보냄
          const response = await axios.post('http://192.168.0.16:8080/api/around', {
            uuidList: allServiceUUIDs  // 모든 서비스 UUIDs 리스트
          });
          console.log(response.data);
          
          // 서버 응답 처리
          // 응답에 대한 로직은 서버의 응답 구조에 맞춰 적절하게 수정해야 합니다.
          if (response.data) {
            console.log('Service UUIDs check was successful.');
          } else {
            console.log('There was a problem checking the Service UUIDs.');
          }
          updateUsers(response.data);
          // 응답 데이터를 함수 호출자에게 반환
          return response.data;
        } catch (error) {
          // 에러 발생 시 콘솔에 에러 로그 출력
          console.error('An error occurred while checking the device service UUIDs:', error);
          // 에러를 반환할 수도 있습니다.
          return error;
        }
      }
      const updateUsers = (data) => {
        // 필터링하여 null이 아닌 유저 객체만 추출하고 배열로 변환
        const newUsers = Object.values(data).filter(user => user && typeof user === 'object');
        
        setUsers(newUsers); // 추출한 유저 배열로 상태 업데이트
      };
      
      // 예시로 device.advertising.serviceUUIDs가 다음과 같다고 가정합니다.
      
      // 함수를 호출하여 서비스 UUIDs를 검사합니다.
      
    return (
        <View>
            <Text style={{marginLeft:10, padding:7, fontSize:16}}>근처 유저 수 : {users.length}</Text>
            <Button title="Scan devices" onPress={()=>{
        startScan(); // Start a new scan when button is pressed
       }}/>
       <Button title="asd" onPress={()=>{
        checkDevicesServiceUUIDs(devices); // Start a new scan when button is pressed
       }}/>
       
       {/* Display list of scanned devices */}
       <ScrollView>
         {devices.map((device, index) => (
           <Text key={index}>name: {device.advertising.serviceUUIDs}  id : {device.id}</Text>
         ))}
       </ScrollView>
            <ScrollView>
            {users.map(user => (
                <Pressable
                    key={user.id}
                    p="1"
                    marginBottom={1}
                    borderWidth="0"
                    onPress={()=>{
                        navigation.navigate('Chat',{
                            name: user.name,
                        });
                    }}
                >
                  <HStack space={3} alignItems="center" marginLeft={4}>
                      <Image style={{borderRadius:14}} 
                      source={{ uri: user.image }} alt={user.name} boxSize={10} />
                      <VStack>
                          <Text style={{fontSize:16}}>{user.name}</Text>
                          <Text>hi</Text>
                          {/* Replace with actual heart icon */}
                          {/*<Button title={user.filled ? '❤️' : '♡'} onPress={() => toggleFill(user.id)} />*/}
                      </VStack>
                      <Spacer />
                      <Pressable
                          p="2"
                          borderWidth="1"
                          w='9'
                          h='9'
                          mr='3'
                          onPress={() => toggleFill(user.id)}
                      >
                          <Text>{user.filled ? '❤️' : ' ♡'}</Text>
                      </Pressable>
                  </HStack>

                </Pressable>
            ))}
            
           
            </ScrollView>
        </View>
    );
}

export default UserListPage;
