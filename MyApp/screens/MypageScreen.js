import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUser} from '../stores/UserContext';

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
import axios from 'axios';
import Svg, {Path} from 'react-native-svg';
import {API_URL, Image_URL} from './../env';

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
  const {user} = useUser();
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
      .post('http://192.168.0.3:8080/api/beacon/mybeacon', {creator: user.id})
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <HStack>
        <Text
          style={{
            color: isEditable ? 'grey' : 'black', // 버튼을 눌렀을 때 색상 변경
            fontWeight: 'bold',

            margin: 14,
            marginBottom: 34,
            fontSize: 20,
            alignSelf: 'flex-start',
            color: '#2679ff',
          }}>
          Wennect
        </Text>
      </HStack>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          color: '#2679ff',
        }}>
        Profile
      </Text>
      <Box
        style={{
          borderWidth: 10,
          borderColor: '#2679ff',
          borderRadius: 300,
          height: 550,
          width: 550,
          marginTop: 2,
          alignSelf: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <Image
            source={{
              uri: Image_URL + '/user/' + user.image,
            }}
            alt="Alternate Text"
            borderRadius="150"
            w="140"
            h="140"
            mt="81"
          />

          <HStack alignItems="center">
            <TextInput
              style={{
                color: isEditable ? '#808588' : 'black', // 버튼을 눌렀을 때 색상 변경
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 17,
              }}
              value={user.name}
              onChangeText={setName}
              editable={isEditable}
            />
            <TextInput
              style={{
                color: isEditable ? '#808588' : 'black', // 버튼을 눌렀을 때 색상 변경

                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 17,
              }}
              value={age}
              onChangeText={setAge}
              editable={isEditable}
            />
          </HStack>
          <TextInput
            style={{
              color: isEditable ? '#808588' : 'black', // 버튼을 눌렀을 때 색상 변경

              fontWeight: 'bold',
              fontSize: 14,
            }}
            value={user.message}
            onChangeText={setIntroduce}
            editable={isEditable}
          />

          <HStack p="9" rounded="lg" w="370" h="110">
            <VStack>
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 150,
                  width: 50,
                  height: 50,
                  backgroundColor: '#808588',
                  borderColor: 'grey',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setIsBeaconModalVisible(true)}>
                <Ionicons name="bluetooth" size={30} color="white" />
              </Pressable>
              <Text style={{alignSelf: 'center', color: '#808588'}}>비콘</Text>
            </VStack>
            <Spacer />
            <Pressable
              style={{
                borderWidth: 0,
                borderRadius: 150,
                width: 90,
                height: 90,
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                console.log('hello2');
              }}>
              <Ionicons name="heart" size={90} color="#DE3163" />
            </Pressable>

            <Spacer />
            <VStack>
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 150,
                  borderColor: 'grey',
                  width: 50,
                  height: 50,
                  backgroundColor: '#808588',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  console.log('change profile');
                  setIsEditable(!isEditable);
                }}>
                <Ionicons name="settings" size={30} color="white" />
              </Pressable>
              <Text style={{alignSelf: 'center', color: '#808588'}}>설정 </Text>
            </VStack>
          </HStack>
          {/* <Svg height="28%" width="140%" viewBox="0 0 200 100">
            <Path
              d="M0 20 Q 95 90 200 20 L 200 120 L 0 120 Z"
              fill="#E6E6E6" // 그림자 색상
            />
            <Path
              d="M0 20 Q 95 90 200 20"
              fill="none"
              stroke="#2679ff"
              strokeWidth="5"
              transform="scale(-1, 1) translate(-200, 0)"
            />
          </Svg> */}
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
      </Box>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#2679ff',
    position: 'relative', // 절대적인 위치 사용을 위해 필요
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // 이미지가 Box에 맞게 크기 조정
    position: 'absolute', // 절대적인 위치 사용
    top: 0,
    left: 0,
  },
});
export default MypageScreen;
