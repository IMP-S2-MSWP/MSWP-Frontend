// 리액트에서 필요한 모듈을 가져옵니다.
import React from 'react';
import {Text, KeyboardAvoidingView} from 'react-native';
import {Button} from 'native-base';

// 'SignUpButton.style' 파일에서 스타일 객체를 가져옵니다.
import style from './SignUpButton.style';

// 'SignUpButton'이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 'props'를 인자로 받습니다.
const SignUpButton = props => {
  // 'KeyboardAvoidingView' 컴포넌트를 사용하여 가상 키보드가 나타날 때 UI를 자동으로 조정합니다.
  return (
    <KeyboardAvoidingView
      style={{alignItems: 'center'}}
      behavior={'padding'}
      keyboardVerticalOffset={60}>
      {/* 'Button' 컴포넌트를 사용하여 버튼을 생성합니다. */}
      <Button
        title="next"
        onPress={() => {
          // 전달받은 'handleNextClick' 함수를 호출합니다.
          props.handleNextClick();
        }}
        style={style.button_style}>
        {/* 버튼 내부에 있는 텍스트 컴포넌트에 스타일을 적용하고 한글로 '다음'을 표시합니다. */}
        <Text style={style.invalidName}>다음</Text>
      </Button>
    </KeyboardAvoidingView>
  );
};

// 'SignUpButton' 컴포넌트를 내보냅니다.
export default SignUpButton;
