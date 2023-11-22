import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../env';

const groupChat = ({route}) => {
  const {uuid, beaconname, beaconType} = route.params;
  const uid = 'test';
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(
    'https://i.ytimg.com/vi/TqBXWlVKXrs/maxresdefault.jpg',
  );
  const [adText, setAdText] = useState('');

  const handleChoosePhoto = () => {
    // 이미지 선택 로직 (예: ImagePicker 라이브러리 사용)
    setImageUri(
      'https://blog.kakaocdn.net/dn/badX3j/btq1dzBajoB/oNCqkBMAGjZyXuVXgw5jn0/img.webp',
    );
  };

  const createChat = () => {
    // 업로드 로직 구현
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
        if (response.data.sc == '200') {
          console.log('만드는데 성공함');
        } else {
          console.log('너 이미 그 기기 등록함 ');
        }
      })
      .catch(error => {
        console.log(error);
      });
    navigation.navigate('마이페이지');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text1}>그룹채팅 생성</Text>
      <Text style={styles.text2}>채팅방 이름 : {beaconname}</Text>
      {imageUri && (
        <Image source={{uri: imageUri}} style={styles.bannerImage} />
      )}
      <View style={styles.formContainer}>
        <Text>
          {uuid}, {beaconname}, {beaconType}
        </Text>
        <Button title="사진 선택" onPress={handleChoosePhoto} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 300,
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 80,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  text1: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 40,
  },
  text2: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    margin: 10,
  },
});

export default groupChat;
