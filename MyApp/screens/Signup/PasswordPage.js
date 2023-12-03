// PasswordPage.js

import {Stack} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import PasswordFormControl from './FormControl/PasswordFormControl';

// 'PasswordPage' 함수형 컴포넌트를 정의합니다.
const PasswordPage = ({
  userData,
  handleInputChange,
  passwordConfirmation,
  setPasswordConfirmation,
  passwordsDoNotMatch,
}) => {
  console.log(passwordConfirmation);

  // 비밀번호 유효성 검사를 위한 정규식 패턴
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 입력된 비밀번호의 유효성을 검사합니다.
  const isPasswordValid = passwordPattern.test(userData.password);

  return (
    <View>
      {/* 'PasswordFormControl' 컴포넌트를 사용하여 비밀번호 입력 폼을 표시합니다. */}
      <PasswordFormControl
        userData={userData}
        handleInputChange={handleInputChange}
        passwordConfirmation={passwordConfirmation}
        setPasswordConfirmation={setPasswordConfirmation}
        passwordsDoNotMatch={passwordsDoNotMatch}
      />
    </View>
  );
};

// 'PasswordPage' 컴포넌트를 내보냅니다.
export default PasswordPage;
