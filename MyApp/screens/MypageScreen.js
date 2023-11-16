import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  Button,
  Checkbox,
  Input,
  useTheme,
  Pressable,
  Box,
  HStack,
  Badge,
  Spacer,
  Image,
  Flex,
  VStack,
  Modal,
} from 'native-base';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import axios from 'axios';

const Screen1 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>비콘 1의 상세 정보</Text>
    </View>
  );
};

const Screen2 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>비콘 2의 상세 정보</Text>
    </View>
  );
};

const Screen3 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>비콘 3의 상세 정보</Text>
    </View>
  );
};

const Screen4 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>비콘 4의 상세 정보</Text>
    </View>
  );
};

export {Screen1, Screen2, Screen3, Screen4};

const MypageScreen = props => {
  const [name, setName] = useState('카리나');
  const [introduce, setIntroduce] = useState('나는 이상용이 좋아');
  const [age, setAge] = useState('24');
  const [dob, setDob] = useState('00.04.28');
  const [isEditable, setIsEditable] = useState(false);
  const navigation = useNavigation();
  const [isBeaconModalVisible, setIsBeaconModalVisible] = useState(false);
  const uid = 'test';
  const [beacons, setBeacons] = useState([]);
  const dummyBeacons = [
    {
      id: '1',
      name: '비콘 1',
      detail: '세부정보 1',
      beaconType: '광고',
      screen: 'Screen1',
    },
    // ... 추가적인 더미 데이터
  ];
  useEffect(() => {
    axios
      .post('http://192.168.0.17:8080/api/beacon/mybeacon', {id: uid})
      .then(response => {
        setBeacons(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [isBeaconModalVisible]);
  const renderBeaconItem = ({item}) => (
    <Pressable
      //onPress={() => navigation.navigate(item.screen)}
      borderBottomWidth="1"
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2">
      <Box
        borderBottomWidth="1"
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2">
        <HStack space={3} justifyContent="space-between">
          <VStack>
            <Text _dark={{color: 'warmGray.50'}} color="coolGray.800" bold>
              {item.beaconname} 타입 :{' '}
              {item.state === '2'
                ? '그룹채팅'
                : item.state === '3'
                ? '이벤트'
                : ''}
            </Text>
            <Text color="coolGray.600">{item.message}</Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
      }}>
      <Image
        source={{
          uri: 'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg',
        }}
        alt="Alternate Text"
        borderRadius="150"
        w="140"
        h="140"
        mt="81"
      />
      <HStack alignItems="center">
        <VStack>
          <TextInput
            style={{fontWeight: 'bold', fontSize: 20, marginTop: 17}}
            value={name}
            onChangeText={setName}
            editable={isEditable}
          />
        </VStack>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK2vvhR8lML6uk1lXn7cgBrZXjwC7JA_Ildw&usqp=CAU',
          }}
          alt="Alternate Text"
          style={{width: 20, height: 20, marginTop: 18, marginLeft: 7}}
        />
      </HStack>
      <TextInput
        value={introduce}
        onChangeText={setIntroduce}
        editable={isEditable}
      />

      <Pressable
        p="2"
        borderWidth="1"
        onPress={() => setIsEditable(!isEditable)}>
        <Text>개인정보 수정하기</Text>
      </Pressable>
      <HStack p="12" rounded="lg" w="370" h="110">
        <Pressable
          style={{
            borderWidth: 1,
            borderRadius: 150,
            width: 50,
            height: 50,
            backgroundColor: 'grey',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setIsBeaconModalVisible(true)}>
          <Text>비콘</Text>
        </Pressable>

        <Spacer />
        <Pressable
          style={{
            borderWidth: 1,
            borderRadius: 150,
            width: 70,
            height: 70,
            backgroundColor: 'pink',
          }}
          onPress={() => {
            console.log('hello2');
          }}></Pressable>
        <Spacer />

        <Pressable
          style={{
            borderWidth: 1,
            borderRadius: 150,
            width: 50,
            height: 50,
            marginBottom: 5,
            backgroundColor: 'grey',
          }}
          onPress={() => {
            console.log('hello2');
            setIsEditable(!isEditable);
          }}>
          <Text>설정</Text>
        </Pressable>
      </HStack>
      <Modal
        isOpen={isBeaconModalVisible}
        onClose={() => setIsBeaconModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>비콘 리스트</Modal.Header>
          <FlatList
            data={beacons}
            renderItem={renderBeaconItem}
            keyExtractor={item => item.id}
          />
          <Modal.Footer>
            <Button
              onPress={() => {
                /* 비콘 등록 로직 */
                navigation.navigate('비콘등록');
              }}>
              비콘 등록
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};
export default MypageScreen;
