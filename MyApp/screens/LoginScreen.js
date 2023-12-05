import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Platform, Text, View} from 'react-native';
import LoginButton from '../components/Button/Login/LoginButton';

import axios from 'axios';
import LoginFormControl from '../components/Button/Login/LoginFormControl';

import {useUser} from '../stores/UserContext';
import {API_URL, PUSH_URL} from '../env';
import fcm from '@react-native-firebase/messaging';
/**
 * 로그인 화면을 표시하는 스크린입니다.
 * @returns 로그인 화면을 표시합니다.
 */

const LoginScreen = () => {
  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });
  const navigation = useNavigation();

  /**
   * 넘겨준 값을 userData 에 넣어주는 함수입니다.
   * @param {} name
   */
  const handleInputChange = name => text => {
    setUserData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };

  const {user, setUser} = useUser();
  const handleLogin = async () => {
    let fcmToken = '';
    if (Platform.OS === 'android') {
      console.log('ios');
      fcmToken = await fcm().getToken();
    } else {
      console.log('ios');
      fcmToken = 'sample';
    }

    axios
      .post(API_URL + '/api/login', userData)
      .then(response => {
        if (response.data != null) {
          console.log(response.data);
          // setUser를 사용하여 전역 상태를 업데이트합니다.
          setUser({
            id: response.data.id,
            name: response.data.name,
            nickname: response.data.nickname,
            birth: response.data.birth,
            gender: response.data.gender,
            uuid: response.data.uuid,
            image: response.data.image,
            message: response.data.message,
          });

          axios.post(PUSH_URL + '/fcm/updatefcm', {
            id: response.data.id,
            token: fcmToken,
          });
          navigation.navigate('Main');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('로그인 오류가 발생했습니다.');
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <LoginFormControl
          label="아이디"
          value={userData.username}
          onChangeText={handleInputChange('id')}
          placeholder="아이디 입력"
        />

        {/* Use the LoginFormControl component for the 'password' input */}
        <LoginFormControl
          label="비밀번호"
          value={userData.password}
          onChangeText={handleInputChange('password')}
          placeholder="비밀번호 입력"
        />
        <Text>{API_URL}</Text>
      </View>
      <LoginButton handleLogin={handleLogin} />
    </View>
  );
};
export default LoginScreen;
