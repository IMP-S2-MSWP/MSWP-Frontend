import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import LoginButton from '../components/Button/Login/LoginButton';

import axios from 'axios';
import LoginFormControl from '../components/Button/Login/LoginFormControl';

import {useUser} from '../stores/UserContext';
// import {API_URL} from './env';
import {API_URL} from '../env';

const LoginScreen = () => {
  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleInputChange = name => text => {
    setUserData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };
  const {user, setUser} = useUser();
  const handleLogin = () => {
    console.log(API_URL + '/api/login');
    setUser({
      id: 'test',
      name: 'test',
      nickname: 'test',
      birth: 'test',
      gender: 'test',
      uuid: '123e4567-e89b-12d3-a456-426655440000',
      image: 'test',
      message: 'test',
    });
    navigation.navigate('Main');
    // axios
    //   .post(API_URL + '/api/login', userData)
    //   .then(response => {
    //     if (response.data != null) {
    //       console.log(response.data);
    //       // setUser를 사용하여 전역 상태를 업데이트합니다.
    //       setUser({
    //         id: response.data.id,
    //         name: response.data.name,
    //         nickname: response.data.nickname,
    //         birth: response.data.birth,
    //         gender: response.data.gender,
    //         uuid: response.data.uuid,
    //         image: response.data.image,
    //         message: response.data.message,
    //       });
    //     } else {
    //       alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     alert('로그인 오류가 발생했습니다.');
    //   });
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
