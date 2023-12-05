// LoginFormControl.js

import React from 'react';
import {Text} from 'react-native';
import {FormControl, Input, Stack} from 'native-base';

// 'LoginFormControl.Style' 파일에서 스타일 객체를 가져옵니다.
import style from './LoginFormControl.Style';

// 'LoginFormControl'이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 'props'를 인자로 받습니다.
const LoginFormControl = props => {
  return (
    // 'FormControl'을 사용하여 입력 폼을 감싸는 부분입니다.
    <FormControl>
      {/* 'Stack'을 사용하여 레이아웃을 구성합니다. */}
      <Stack width="335" mx="5" mt="30">
        {/* 레이블을 표시하는 부분입니다. */}
        <FormControl.Label>
          {/* 텍스트 스타일을 'LoginFormControl.Style'에서 가져온 스타일로 적용합니다. */}
          <Text style={style.form_title_style}>{props.label}</Text>
        </FormControl.Label>
        {/* 입력 필드를 표시하는 부분입니다. */}
        <Input
          size="xl"
          variant="underlined"
          type={props.type}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          style={style.form_input_style}
        />
      </Stack>
    </FormControl>
  );
};

// 'LoginFormControl' 컴포넌트를 내보냅니다.
export default LoginFormControl;
