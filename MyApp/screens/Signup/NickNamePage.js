// NicknamePage.js

import React from 'react';
import {View} from 'react-native';
import NickNameFormControl from './FormControl/NickNameFormControl';

// 'NicknamePage' 함수형 컴포넌트를 정의합니다.
const NicknamePage = ({userData, handleInputChange}) => {
  return (
    <View pointerEvents="box-none">
      {/* 'NickNameFormControl' 컴포넌트를 사용하여 닉네임 입력 폼을 표시합니다. */}
      <NickNameFormControl
        handleInputChange={handleInputChange}
        userData={userData}
      />
    </View>
  );
};

// 'NicknamePage' 컴포넌트를 내보냅니다.
export default NicknamePage;
