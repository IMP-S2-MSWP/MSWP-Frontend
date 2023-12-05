import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUser} from '../stores/UserContext';
import {API_URL, Image_URL} from '../env';
import axios from 'axios';
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  Pressable,
  Spacer,
  VStack,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import MyPageInput from '../components/Input/MyPageInput';
import styles from '../components/Style/MyProfile/ProfileStyle';
import WennectTitle from '../components/WennectTitle/WennectTitle';
/**
 * 마이페이지 화면 컴포넌트입니다.
 * @param {object} props - 프롭스 객체.
 * @returns {JSX.Element} MypageScreen 컴포넌트.
 */
const MypageScreen = props => {
  const {user, setUser} = useUser();
  const [name, setName] = useState('카리나');
  const [introduce, setIntroduce] = useState(user.message);
  const [age, setAge] = useState('24');
  const [dob, setDob] = useState('00.04.28');
  const [isEditable, setIsEditable] = useState(false);
  const navigation = useNavigation();
  const [isBeaconModalVisible, setIsBeaconModalVisible] = useState(false);
  const [beacons, setBeacons] = useState([]);
  const [fileSource, setFileSource] = useState(
    Image_URL + '/user/' + user.image,
  );
  const [fileType, setFileType] = useState('');
  const [fileData, setFileData] = useState('');

  useEffect(() => {
    axios
      .post(API_URL + '/api/beacon/mybeacon', {creator: user.id})
      .then(response => {
        setBeacons(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [isBeaconModalVisible]);

  const handleEditable = () => {
    axios
      .post(API_URL + '/api/message', {
        id: user.id,
        message: introduce,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.sc == '200') {
          console.log('업데이트 성공');
        } else {
          console.log('업데이트 실패');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChoosePhoto = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
    };
    // 이미지 선택 로직 (예: ImagePicker 라이브러리 사용)
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else {
        console.log(response.assets[0].uri);
        var photo = {
          uri: response.assets[0].uri,
          type: 'multipart/form-data',
          name: `image.jpg`,
        };
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('file', photo);
        axios
          .post(API_URL + '/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
          })
          .then(response => {
            console.log(response.data);
            if (response.data.sc == '200') {
              console.log('만드는데 성공함');
              setFileSource(photo.uri);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const renderBeaconItem = ({item}) => {
    const uuid = item.uuid;
    const beaconname = item.beaconname;
    const beaconType = item.state;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('광고수정', {uuid, beaconname, beaconType})
        }
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
              <Image
                style={{borderRadius: 14}}
                source={{
                  uri:
                    Image_URL +
                    '/beacon/' +
                    item.image +
                    '?cache=' +
                    Math.random(),
                }}
                alt={'x'}
                boxSize={10}
              />
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
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <HStack>
        <WennectTitle />
      </HStack>
      <Text style={styles.profileText}>Profile</Text>
      <Box style={styles.circleBox}>
        <View style={styles.makeCenter}>
          <Pressable onPress={handleChoosePhoto}>
            <Image
              source={{
                uri: fileSource + '?cache=' + Math.random(),
              }}
              alt="Alternate Text"
              borderRadius="150"
              w="140"
              h="140"
              mt="81"
            />
          </Pressable>

          <HStack alignItems="center">
            <MyPageInput value={user.name} onChangeText={setName} />
            <MyPageInput value={age} onChangeText={setAge} />
          </HStack>
          <MyPageInput
            value={introduce}
            onChangeText={setIntroduce}
            isEditable={isEditable}
            customStyle={{fontSize: 14, marginTop: 0}} // 일부 스타일 변경
          />

          <HStack p="9" rounded="lg" w="370" h="110">
            <VStack>
              <Pressable
                style={styles.IconStyle}
                onPress={() => setIsBeaconModalVisible(true)}>
                <Ionicons name="bluetooth" size={30} color="white" />
              </Pressable>
              <Text style={{alignSelf: 'center', color: '#808588'}}>비콘</Text>
            </VStack>
            <Spacer />
            <Pressable
              style={styles.heartStyle}
              onPress={() => {
                navigation.navigate('좋아요');
              }}>
              <Ionicons name="heart" size={90} color="#DE3163" />
            </Pressable>

            <Spacer />
            <VStack>
              <Pressable
                style={styles.IconStyle}
                onPress={() => {
                  console.log('change profile');
                  isEditable ? handleEditable() : null;
                  setIsEditable(!isEditable);
                }}>
                <Ionicons name="settings" size={30} color="white" />
              </Pressable>
              <Text style={styles.settingStyle}>설정 </Text>
            </VStack>
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
      </Box>
    </SafeAreaView>
  );
};

export default MypageScreen;
