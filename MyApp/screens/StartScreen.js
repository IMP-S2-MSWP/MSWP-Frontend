import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import Mainstyle from '../components/Style/Mainstyle';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import PermissionUtil, {
  APP_PERMISSION_CODE,
} from '../components/permission/PermissionUtil';
import axios from 'axios';
import {API_URL} from '../env';

const StartScreen = props => {
  useEffect(() => {
    PermissionUtil.cmmReqPermis([...APP_PERMISSION_CODE.bluetooth]);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://3.37.127.142:8080/api/like/count?id=test`,
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchData();
  }, []);
  const navigation = useNavigation(); // 네비게이션 객체를 가져옵니다.
  return (
    <View style={Mainstyle.container}>
      <LottieView
        style={{marginTop: 0, height: '80%', width: '80%'}}
        source={require('../components/Lottie/source/start.json')}
        autoPlay
        loop
      />
      <CustomButton
        title="시작하기"
        onPress={() => navigation.navigate('SignUp')}></CustomButton>
      <Text
        style={Mainstyle.bottomText}
        onPress={() => navigation.navigate('Login')}>
        이미 계정이 있나요? 로그인
      </Text>
    </View>
  );
};
export default StartScreen;
