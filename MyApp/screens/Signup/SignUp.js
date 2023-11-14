// SignUp.js
import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import NameGenderDOBpage from './NameGenderDobPage';
import UserNamepage from './UsernamePage';
import Passwordpage from './PasswordPage';
import NickNamepage from './NickNamePage';
import Completepage from './Completepage';
import {Button} from 'native-base';
import style from '../../components/Style/Signup/style';
import axios from 'axios';
import {API_URL} from '@env';

const SignUp = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    dob: '',
    username: '',
    password: '',
    nickname: '',
  });
  const [passwordsDoNotMatch, setpasswordsDoNotMatch] = useState(false);
  const handleInputChange = name => text => {
    setUserData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };
  const handleGenderChange = nextValue => {
    setUserData(prevData => ({
      ...prevData,
      gender: nextValue,
    }));
  };

  const canGoNext = () => {
    switch (pageIndex) {
      case 0:
        return userData.name && userData.gender && userData.dob;
      case 1:
        return userData.username;
      case 2:
        return userData.password;
      case 3:
        return userData.nickname;
    }
  };

  const handleNextClick = async () => {
    if (pageIndex === 1) {
      if ('400' == (await checkUsernameAvailability(userData.username))) {
        alert('중복된 아이디입니다.');
        return;
      }
    } else if (pageIndex === 2 && userData.password !== passwordConfirmation) {
      // 추가된 부분
      setpasswordsDoNotMatch(true);
      alert('Passwords do not match.');
      return;
    } else if (pageIndex === 3) {
      if ('400' == (await handleRegister())) {
        alert('회원가입에 실패하였습니다.');
        return;
      }
    }

    setPageIndex(prevPageIndex => prevPageIndex + 1);
    pagerRef.current.setPage(pageIndex + 1);
  };

  async function checkUsernameAvailability(username) {
    try {
      // '/api/register/validation' 엔드포인트로 POST 요청을 보냄
      const response = await axios.post(API_URL + '/api/register/validation', {
        id: username, // 중복 확인을 위한 사용자 아이디
      });
      console.log(response.data);
      // 서버 응답 처리
      if (response.data) {
        console.log('Username is available.');
      } else {
        console.log('Username is already taken.');
      }
      console.log(response.data.sc);
      return response.data.sc;
    } catch (error) {
      // 에러 발생 시 처리
      console.error('An error occurred while checking the username:', error);
    }
  }

  const handleRegister = async () => {
    try {
      // 서버에 회원가입 요청을 보냄
      const response = await axios.post(API_URL + '/api/register', {
        id: userData.username,
        password: userData.password,
        name: userData.name,
        nickname: userData.nickname,
        birth: userData.dob,
        gender: userData.gender == 'man' ? 'M' : 'W',
      });
      console.log(response.data);

      // 회원가입 요청 성공
      if (response.data.sc === '200') {
        // 회원가입 성공 후 로직 구현 (예: 로그인 화면으로 이동)
      } else {
        // 서버에서 정의된 오류 처리
        alert('Registration Failed', response.data.message);
      }
      console.log(response.data.sc);
      return response.data.sc;
    } catch (error) {
      // 네트워크 오류, 서버 오류 등을 처리
      console.error('An error occurred while checking the username:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <PagerView
        ref={pagerRef}
        style={{flex: 1}}
        initialPage={0}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        <NameGenderDOBpage
          key="1"
          handleInputChange={handleInputChange}
          userData={userData}
        />
        <UserNamepage
          key="2"
          handleInputChange={handleInputChange}
          userData={userData}
        />
        <Passwordpage
          key="3"
          handleInputChange={handleInputChange}
          userData={userData}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          passwordsDoNotMatch={passwordsDoNotMatch}
        />
        <NickNamepage
          key="4"
          handleInputChange={handleInputChange}
          userData={userData}
        />
        <Completepage key="5" />
      </PagerView>
      {true && (
        <Button
          title="next"
          onPress={() => {
            handleNextClick();
          }}
          style={style.button_style}>
          <Text style={style.invalidName}>다음</Text>
        </Button>
      )}
    </View>
  );
};

export default SignUp;
