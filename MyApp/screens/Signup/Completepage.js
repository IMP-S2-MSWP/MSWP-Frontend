import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Button} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import style from '../../components/Style/Signup/style';

/**
 * 회원가입 완료 페이지를 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 *
 * @returns {JSX.Element} CompletePage 컴포넌트.
 */
const CompletePage = props => {
  const navigation = useNavigation();

  // 스타일 객체 정의
  const invalidName12 = {
    height: 27,
    fontFamily: 'LeferiBaseType',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.47,
    textAlign: 'left',
    marginTop: 50,
  };
  const invalidName = {
    height: 20,
    fontFamily: 'LeferiBaseType',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.42,
    textAlign: 'center',
    color: '#ffffff',
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {/* 가입 완료 메시지 */}
      <Text style={invalidName12}>가입 완료!</Text>

      {/* Lottie 애니메이션 */}
      <LottieView
        style={{marginTop: -40, height: '70%', width: '70%'}}
        source={require('../../components/Lottie/source/Check.json')}
        autoPlay
        loop={false}
      />

      {/* 로그인 버튼 */}
      <Button
        title="next"
        style={{...style.button_style, bottom: -50, left: 0}}
        onPress={() => navigation.navigate('Login')}>
        <Text style={invalidName}>로그인 하기</Text>
      </Button>
    </View>
  );
};

export default CompletePage;
