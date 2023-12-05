import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL, Image_URL} from '../env';
import {useUser} from '../stores/UserContext';
import {Pressable, HStack, Button} from 'native-base';
import styles from '../components/Style/BeaconRegist/ADBeaconRegistStyle';
import {handleChoosePhoto} from '../components/Photo/PhotoPicker';
import ImagePickerComponent from '../components/Photo/ImagePickerComponent';
import AdvertisementTextInputComponent from '../components/Photo/AdvertisementTextInputComponent';
import useAnimationHandlers from '../components/Photo/useAnimationHandlers';
import {handleUpload} from '../components/Hook/api/UploadHandler';
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
const Ad_Beacon_Create = ({route}) => {
  const {uuid, beaconname, beaconType} = route.params;

  const {user} = useUser();
  const navigation = useNavigation();
  const [fileSource, setFileSource] = useState('');
  const [title, setTitle] = useState('');
  const {imageSize, inputHeight, handleFocus, handleBlur} =
    useAnimationHandlers();

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
            광고 생성
          </Text>
        </HStack>
        <View style={styles.header}>
          <Text style={styles.headerText}>{beaconname}</Text>
        </View>
        <ImagePickerComponent
          handleChoosePhoto={() => handleChoosePhoto(setFileSource)}
          fileSource={fileSource}
          imageSize={imageSize}
          styles={styles}
        />
        <AdvertisementTextInputComponent
          title={title}
          setTitle={setTitle}
          inputHeight={inputHeight}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          styles={styles}
        />
        <View style={styles.formContainer}>
          <Button
            onPress={() =>
              handleUpload({
                uuid,
                creatorId: user.id,
                beaconType,
                message: title,
                beaconName: beaconname,
                fileSource,
                navigation,
              })
            }
            style={styles.button_style}>
            <Text style={styles.invalidName}>업로드</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ad_Beacon_Create;
