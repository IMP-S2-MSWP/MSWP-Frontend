import {useNavigation} from '@react-navigation/native';
import {Button, HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {API_URL, Image_URL} from '../env';
import {handleChoosePhoto} from '../components/Photo/PhotoPicker';
import {useBeaconShow} from '../components/Hook/Beacon/useBeacon';
import styles from '../components/Style/BeaconRegist/ADBeaconUpdateStyle';
import uploadBeaconAd from '../components/Hook/api/Beacon_API';
import ImagePickerComponent from '../components/Photo/ImagePickerComponent';
import AdvertisementTextInputComponent from '../components/Photo/AdvertisementTextInputComponent';
import useAnimationHandlers from '../components/Photo/useAnimationHandlers';
const Ad_Beacon_Update = ({route}) => {
  const {uuid, beaconname, beaconType} = route.params;
  const navigation = useNavigation();
  const {imageSize, inputHeight, handleFocus, handleBlur} =
    useAnimationHandlers();
  const {fetchBeaconData, title, fileSource, setFileSource, setTitle} =
    useBeaconShow();
  useEffect(() => {
    fetchBeaconData(uuid);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <ScrollView style={styles.container}>
        <HStack>
          <Text style={styles.screenTitle}>광고 생성</Text>
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
              uploadBeaconAd(API_URL, uuid, title, fileSource, navigation)
            }
            style={styles.button_style}>
            <Text style={styles.invalidName}>업로드</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ad_Beacon_Update;
