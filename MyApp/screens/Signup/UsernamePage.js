// UsernamePage.js

// React에서 필요한 컴포넌트를 불러옵니다.
import React from 'react';
import {View} from 'react-native';

// UsernameFormControl 컴포넌트를 불러옵니다.
import UsernameFormControl from './FormControl/UsernameFormControl';

// 'UsernamePage' 함수형 컴포넌트를 정의합니다.
const UsernamePage = ({userData, handleInputChange}) => {
  return (
    // 뷰 컴포넌트를 렌더링합니다.
    <View pointerEvents="box-none">
      {/* UsernameFormControl 컴포넌트를 사용하여 아이디 입력 페이지를 구성합니다. */}
      <UsernameFormControl
        userData={userData}
        handleInputChange={handleInputChange}
      />
    </View>
  );
};

// 'UsernamePage' 컴포넌트를 내보냅니다.
export default UsernamePage;
