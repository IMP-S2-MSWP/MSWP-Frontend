// 리액트와 리액트 네이티브에서 필요한 모듈들을 가져옵니다.
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'native-base';

// 'LoginButton.style' 파일에서 스타일 객체를 가져옵니다.
import style from './LoginButton.style';

// 'LoginButton'이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 'props'를 인자로 받습니다.
const LoginButton = props => {
  // 특정한 스타일과 동작을 갖는 View 컴포넌트를 반환합니다.
  return (
    <View
      style={{justifyContent: 'flex-end', alignItems: 'center'}}
      behavior={'padding'}
      keyboardVerticalOffset={90}>
      {/* 'Button' 컴포넌트를 사용하여 버튼을 생성합니다. */}
      <Button
        title="next"
        onPress={() => {
          // 전달받은 'handleLogin' 함수를 호출합니다.
          props.handleLogin();
        }}
        style={style.login_button_style}>
        {/* 버튼 내부에 있는 텍스트 컴포넌트에 스타일을 적용하고 한글로 '로그인'을 표시합니다. */}
        <Text style={style.invalidName}>로그인</Text>
      </Button>
    </View>
  );
};

// 'LoginButton' 컴포넌트를 내보냅니다.
export default LoginButton;
