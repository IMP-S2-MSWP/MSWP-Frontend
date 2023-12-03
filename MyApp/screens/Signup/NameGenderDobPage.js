import React, {useState} from 'react';
import {View} from 'react-native';
import DobFormControl from '../../components/FormControl/SignUpFormControlStyle/DobFormControl';
import GenderFormControl from '../../components/FormControl/SignUpFormControl/GenderFormControl';
import NameFormControl from '../../components/FormControl/SignUpFormControl/NameFormControl';

/**
 * 이름, 성별, 생년월일을 입력받는 페이지를 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 입력된 정보를 포함합니다.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} NameGenderDOBPage 컴포넌트.
 */
const NameGenderDOBPage = ({userData, handleInputChange}) => {
  return (
    <View>
      {/* 이름 입력 폼을 표시하는 'NameFormControl' 컴포넌트입니다. */}
      <NameFormControl
        userData={userData}
        handleInputChange={handleInputChange}
      />
      {/* 성별 입력 폼을 표시하는 'GenderFormControl' 컴포넌트입니다. */}
      <GenderFormControl
        userData={userData}
        handleInputChange={handleInputChange}
      />
      {/* 생년월일 입력 폼을 표시하는 'DobFormControl' 컴포넌트입니다. */}
      <DobFormControl handleInputChange={handleInputChange} />
    </View>
  );
};

// 'NameGenderDOBPage' 컴포넌트를 내보냅니다.
export default NameGenderDOBPage;
