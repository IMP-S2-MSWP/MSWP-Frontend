import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import Mainstyle from '../components/Style/Mainstyle';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import PermissionUtil, {
  APP_PERMISSION_CODE,
} from '../components/permission/PermissionUtil';
import axios from 'axios';

/**
 * 시작 화면 컴포넌트입니다.
 * @component
 * @example
 * // Usage
 * <StartScreen />
 */
const StartScreen = props => {
  useEffect(() => {
    // Bluetooth 권한 요청
    PermissionUtil.cmmReqPermis([...APP_PERMISSION_CODE.bluetooth]);
  }, []);

  const navigation = useNavigation();

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
        onPress={() => navigation.navigate('SignUp')}
      />

      <Text
        style={Mainstyle.bottomText}
        onPress={() => navigation.navigate('Login')}>
        이미 계정이 있나요? 로그인
      </Text>
    </View>
  );
};

export default StartScreen;
