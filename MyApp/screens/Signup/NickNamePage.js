// NicknamePage.js

import React from 'react';
import {View} from 'react-native';
import NickNameFormControl from './FormControl/NickNameFormControl';

/**
 * 닉네임 입력 페이지를 표시하는 페이지입니다.
 * @param {userData, handleInputChange} param0
 * @returns
 */
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
