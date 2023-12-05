import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Button, HStack, Pressable} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,

  View,

} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {API_URL, Image_URL} from '../env';
import {useUser} from '../stores/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Pressable, HStack, Button} from 'native-base';

const Ad_Beacon_Update = ({route}) => {
  const {uuid, beaconname, beaconType} = route.params;

  const {user} = useUser();
  const navigation = useNavigation();
  const [fileSource, setFileSource] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileData, setFileData] = useState('');
  const [title, setTitle] = useState('');
  const [imageSize, setImageSize] = useState(new Animated.Value(400));
  const [inputHeight, setInputHeight] = useState(new Animated.Value(80));

  useEffect(() => {
    axios
      .post(API_URL + '/api/beacon/show', {uuid: uuid})
      .then(response => {
        if (response.data != null) {
          console.log(response.data);
          setTitle(response.data.title);
          setFileSource(
            Image_URL + '/advertisement/' + response.data.advertisementImage,
          );
        } else {
          console.log('error');
        }
      })
      .catch(error => {
        console.log(error);
        // 에러 처리 로직 작성
      });
  }, []);

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
    const formData = new FormData();
    // 이미지 파일 추가 (여기서는 URL에서 파일을 가져옵니다)
    // 실제 사용 시에는 File 객체 또는 Blob 객체를 사용해야 합니다.
    formData.append('uuid', uuid);
    formData.append('title', title);
    var photo = {
      uri: fileSource,
      type: 'multipart/form-data',
      name: `image.jpg`,
    };
    formData.append('file', photo); // 두 번째 인자는 Blob, 세 번째 인자는 파일명
    console.log(formData);
    // 업로드 로직 구현
    axios
      .post(API_URL + '/api/beacon/advertisement', formData, {
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
    navigation.navigate('마이페이지');
  };
  const handleFocus = () => {
    // Animate image
    Animated.timing(imageSize, {
      toValue: 200, // New size
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animate TextInput
    Animated.timing(inputHeight, {
      toValue: 120, // New height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = () => {
    // Animate image back to original size
    Animated.timing(imageSize, {
      toValue: 400, // Original size
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animate TextInput back to original height
    Animated.timing(inputHeight, {
      toValue: 80, // Original height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <ScrollView style={styles.container}>
        <HStack>
          <Text style={styles.screenTitle}>광고 생성</Text>
        </HStack>
        <View style={styles.header}>
          <Text style={styles.headerText}>{beaconname}</Text>
        </View>
        <Pressable
          p="1"
          mt="5"
          rounded="20"
          alignSelf="center"
          onPress={handleChoosePhoto}>
          <Animated.Image
            source={{uri: fileSource}}
            style={[styles.bannerImage, {height: imageSize, width: imageSize}]}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.formContainer}>
          <Animated.View style={[styles.input, {height: inputHeight}]}>
            <TextInput
              placeholder="광고 문구 입력"
              value={title}
              onChangeText={setTitle}
              maxLength={30}
              onFocus={handleFocus}
              onBlur={handleBlur} // Add this line
            />
          </Animated.View>
          <Button onPress={handleUpload} style={styles.button_style}>
            <Text style={styles.invalidName}>업로드</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ad_Beacon_Update;
