import {API_URL} from '../env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Box, HStack, Pressable} from 'native-base';
import React, {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import WennectTitle from '../components/WennectTitle/WennectTitle';
import styles from '../components/Style/BeaconRegist/GCBeaconRegistStyle';

/**
 * 그룹 채팅 생성 화면
 * @component
 * @param {object} route - React Navigation route object
 * @param {object} route.params - Parameters passed to this screen
 * @param {string} route.params.uuid - Beacon UUID
 * @param {string} route.params.beaconname - Beacon name
 * @param {string} route.params.beaconType - Beacon type (광고형: '3', 채팅형: '2')
 * @returns {JSX.Element} 그룹 채팅 생성 화면 JSX 컴포넌트
 */
const GroupChat = ({route}) => {
  const {uuid, beaconname, beaconType} = route.params;
  const uid = 'test';
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(
    'https://i.ytimg.com/vi/TqBXWlVKXrs/maxresdefault.jpg',
  );
  const [adText, setAdText] = useState('');

  /**
   * 앨범에서 사진 선택 처리 함수
   * @function
   * @returns {void}
   */
  const handleChoosePhoto = () => {
    // 이미지 선택 로직 (예: ImagePicker 라이브러리 사용)
    setImageUri(
      'https://blog.kakaocdn.net/dn/badX3j/btq1dzBajoB/oNCqkBMAGjZyXuVXgw5jn0/img.webp',
    );
  };

  /**
   * 채팅방 생성 및 업로드 처리 함수
   * @function
   * @returns {void}
   */
  const createChat = () => {
    axios
      .post(API_URL + '/api/beacon/create', {
        uuid: uuid,
        id: uid,
        state: beaconType,
        message: adText,
        image: imageUri,
        beaconname: beaconname,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.sc === '200') {
          console.log('성공함');
        } else {
          console.log('실패');
        }
      })
      .catch(error => {
        console.log(error);
      });
    navigation.navigate('마이페이지');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView style={styles.container}>
        <HStack>
          <WennectTitle />
        </HStack>
        <Text style={styles.text1}>그룹채팅 생성</Text>
        <Box
          bg="#ffffff"
          p="5"
          borderRightWidth="6"
          rounded="23"
          w="320"
          alignSelf="center"
          borderLeftWidth="6"
          borderColor="#2679ff">
          <Text style={styles.text2}>{beaconname}</Text>
        </Box>
        <Pressable
          p="2"
          m="4"
          rounded="20"
          alignSelf="center"
          backgroundColor="#2679ff"
          onPress={handleChoosePhoto}>
          <Text style={{color: '#ffffff'}}>앨범에서 사진 선택</Text>
        </Pressable>

        {imageUri && (
          <Image source={{uri: imageUri}} style={styles.bannerImage} />
        )}

        <View style={styles.formContainer}>
          <Text>
            {uuid}, {beaconname}, {beaconType}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="채팅방소개글"
            value={adText}
            onChangeText={setAdText}
            maxLength={30} // 여기에서 최대 길이를 30으로 설정
          />
          <Button title="채팅방 생성" onPress={createChat} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupChat;
