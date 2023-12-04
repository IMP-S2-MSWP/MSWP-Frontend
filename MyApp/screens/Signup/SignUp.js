// SignUp.js

// axios 및 React, useRef, useState를 가져옵니다.
import axios from 'axios';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import PagerView from 'react-native-pager-view';
import SignUpButton from '../../components/Button/SignUp/SignUpButton';

import CompletePage from './Completepage';
import NameGenderDOBPage from './NameGenderDobPage';
import NickNamePage from './NickNamePage';
import PasswordPage from './PasswordPage';
import UserNamePage from './UsernamePage';
// import { API_URL } from '@env';
import {API_URL} from '../../env';
import fcm from '@react-native-firebase/messaging';

/**
 * 회원가입을 처리하는 함수형 컴포넌트입니다.
 *
 * @returns {JSX.Element} SignUp 컴포넌트.
 */
const SignUp = () => {
  // 페이지 인덱스와 리프 객체를 상태로 관리합니다.
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef(null);

  // 비밀번호 확인을 위한 상태를 관리합니다.
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // 사용자 정보를 저장하기 위한 상태를 초기화합니다.
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    dob: '',
    username: '',
    password: '',
    nickname: '',
  });
  const [duplicates, setDuplicates] = useState(false);

  // 비밀번호 일치 여부를 확인하는 상태를 관리합니다.
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  // 입력 값이 변경될 때 실행되는 함수를 정의합니다.
  const handleInputChange = name => text => {
    setUserData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };

  // 성별이 변경될 때 실행되는 함수를 정의합니다.
  const handleGenderChange = nextValue => {
    setUserData(prevData => ({
      ...prevData,
      gender: nextValue,
    }));
  };

  // 다음 페이지로 이동 가능 여부를 확인하는 함수를 정의합니다.
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

  // 다음 버튼을 클릭했을 때 실행되는 함수를 정의합니다.
  const handleNextClick = async () => {
    if (!canGoNext()) {
      alert('Please fill out all fields.');
      return;
    }
    if (pageIndex === 1) {
      const checkId = await checkUsernameAvailability(userData.username);

      if ('400' == checkId) {
        alert('중복된 아이디입니다.');
        return;
      } else if ('200' == checkId) {
        setDuplicates(true);
      } else {
        alert('아이디 중복체크에 오류가 생겼습니다.');
      }
    } else if (pageIndex === 2 && userData.password !== passwordConfirmation) {
      setPasswordsDoNotMatch(true);
      alert('Passwords do not match.');
      return;
    } else if (pageIndex === 3) {
      if ('400' == (await handleRegister())) {
        alert('회원가입에 실패하였습니다.');
        return;
      }
    }

    // 다음 페이지로 이동합니다.
    setPageIndex(prevPageIndex => prevPageIndex + 1);
    pagerRef.current.setPage(pageIndex + 1);
  };

  // 서버에서 사용자 아이디 중복을 확인하는 함수를 정의합니다.
  async function checkUsernameAvailability(username) {
    try {
      const response = await axios.post(API_URL + '/api/register/validation', {
        id: username,
      });
      console.log(response.data);
      return response.data.sc;
    } catch (error) {
      console.error('An error occurred while checking the username:', error);
    }
  }

  // 서버에 회원가입을 요청하는 함수를 정의합니다.
  const handleRegister = async () => {
    try {
      const fcmToken = await fcm().getToken();
      const response = await axios.post(API_URL + '/api/register', {
        id: userData.username,
        password: userData.password,
        name: userData.name,
        nickname: userData.nickname,
        birth: userData.dob,
        gender: userData.gender == 'man' ? 'M' : 'W',
        fcm: fcmToken,
      });

      if (response.data.sc === '200') {
        // 회원가입 성공 후 로직을 구현합니다. (예: 로그인 화면으로 이동)
      } else {
        alert('Registration Failed', response.data.message);
      }
      console.log(response.data.sc);
      return response.data.sc;
    } catch (error) {
      console.error('An error occurred while checking the username:', error);
    }
  };

  // JSX를 반환합니다.
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* 페이지마다 다른 컴포넌트를 표시합니다. */}
      <PagerView
        ref={pagerRef}
        scrollEnabled={false}
        style={{
          width: '90%',
          height: '90%',
          justifyContent: 'center',
        }}
        initialPage={0}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        <NameGenderDOBPage
          key="1"
          handleInputChange={handleInputChange}
          userData={userData}
        />
        <UserNamePage
          key="2"
          handleInputChange={handleInputChange}
          userData={userData}
        />
        <PasswordPage
          key="3"
          handleInputChange={handleInputChange}
          userData={userData}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          passwordsDoNotMatch={passwordsDoNotMatch}
        />
        <NickNamePage
          key="4"
          handleInputChange={handleInputChange}
          userData={userData}
        />
        <CompletePage key="5" />
      </PagerView>

      {/* 마지막 페이지가 아니면 회원가입 버튼을 표시합니다. */}
      {pageIndex !== 4 && <SignUpButton handleNextClick={handleNextClick} />}
    </View>
  );
};

// 'SignUp' 컴포넌트를 내보냅니다.
export default SignUp;
