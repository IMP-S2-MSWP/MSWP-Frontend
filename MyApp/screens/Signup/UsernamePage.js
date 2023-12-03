// UsernamePage.js

// React에서 필요한 컴포넌트를 불러옵니다.
import React from 'react';
import {View} from 'react-native';

// UsernameFormControl 컴포넌트를 불러옵니다.
import UsernameFormControl from '../../components/FormControl/SignUpFormControl/UsernameFormControl';

/**
 * 아이디 입력 페이지를 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 입력된 정보를 포함합니다.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} UsernamePage 컴포넌트.
 */
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
