// React 및 NativeBase에서 필요한 컴포넌트를 불러옵니다.
import {Stack} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import PasswordFormControl from '../../components/FormControl/SignUpFormControl/PasswordFormControl';

/**
 * 비밀번호 입력 페이지를 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 비밀번호 정보를 포함합니다.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 * @param {string} props.passwordConfirmation - 비밀번호 확인 값.
 * @param {function} props.setPasswordConfirmation - 비밀번호 확인 값을 업데이트하는 함수.
 * @param {boolean} props.passwordsDoNotMatch - 비밀번호와 확인 비밀번호가 일치하지 않는지 여부.
 *
 * @returns {JSX.Element} PasswordPage 컴포넌트.
 */
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
