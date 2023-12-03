import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  Checkbox,
  Input,
  useTheme,
  Pressable,
  Box,
  HStack,
  Badge,
  Spacer,
  Flex,
  Switch,
  Center,
  VStack,
} from 'native-base';
import {API_URL} from '@env';

const GroupChat = ({route}) => {
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView style={styles.container}>
        <HStack>
          <Text
            style={{
              fontWeight: 'bold',
              margin: 14,
              fontSize: 20,
              alignSelf: 'flex-start',
              color: '#2679ff',
            }}>
            Wennect
          </Text>
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
        {/*기능구현 완료되면 사진 넣어야됨*/}
        {/* {fileSource ? (
          <Image source={{uri: fileSource}} style={styles.bannerImage} />
        ) : (
          <Image
            source={{
              uri: 'https://www.genittiottici.com/wp-content/uploads/2018/11/blog-ph-1.jpg', // 기본 이미지 URL
            }}
            style={styles.bannerImage}
          />
        )} */}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    width: 250,
    height: 250,
    borderRadius: 400,
    alignSelf: 'center',
    borderWidth: 1,
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
    width: 320,
    borderRightWidth: 6,
    borderLeftWidth: 6,
    borderColor: '#2679ff',
    borderRadius: 20,
  },
  text1: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 40,
    marginBottom: 14,
    color: '#2679ff',
  },
  text2: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    margin: 10,
    color: '#2679ff',
  },
});

export default GroupChat;
