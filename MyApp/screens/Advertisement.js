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
import {useUser} from '../stores/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
const Advertisement = ({route}) => {
  const {uuid, beaconname, beaconType} = route.params;

  const {user} = useUser();
  const navigation = useNavigation();
  const formData = new FormData();
  const [fileSource, setFileSource] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileData, setFileData] = useState('');
  const [imageUri, setImageUri] = useState(
    'https://i.ytimg.com/vi/TqBXWlVKXrs/maxresdefault.jpg',
  );
  const [adText, setAdText] = useState('');

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
        setFileSource(response.assets[0].uri);
        setFileType(response.assets[0].type);
        setFileData(response.assets[0]);
      }
    });
  };

  const handleUpload = async () => {
    const uploaderString = JSON.stringify({
      uuid: user.uuid,
      creator: user.id,
      state: beaconType,
      message: adText,
      beaconname: beaconname,
      gender: 'P',
    });

    // 이미지 파일 추가 (여기서는 URL에서 파일을 가져옵니다)
    // 실제 사용 시에는 File 객체 또는 Blob 객체를 사용해야 합니다.
    formData.append('uuid', user.uuid);
    formData.append('creator', user.id);
    formData.append('state', beaconType);
    formData.append('message', adText);
    formData.append('beaconname', beaconname);
    formData.append('gender', 'P');
    var photo = {
      uri: fileSource,
      type: 'multipart/form-data',
      name: `image.jpg`,
    };
    formData.append('file', photo); // 두 번째 인자는 Blob, 세 번째 인자는 파일명
    console.log(formData);
    // 업로드 로직 구현
    axios
      .post(API_URL + '/api/beacon/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
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
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text1}>광고 생성</Text>
      <Text style={styles.text2}>광고 이름 : {beaconname}</Text>
      {imageUri && (
        <Image source={{uri: imageUri}} style={styles.bannerImage} />
      )}
      <View style={styles.formContainer}>
        <Text>
          {uuid}, {beaconname}, {beaconType}
        </Text>
        <Button title="사진 선" onPress={handleChoosePhoto} />
        <TextInput
          style={styles.input}
          placeholder="광고 문구 입력"
          value={adText}
          onChangeText={setAdText}
          maxLength={30} // 여기에서 최대 길이를 30으로 설정
        />
        <Button title="업로드" onPress={handleUpload} />
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

export default Advertisement;
