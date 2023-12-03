// UsernameFormControl.js

// React 및 NativeBase에서 필요한 컴포넌트를 불러옵니다.
import React from 'react';
import {FormControl, Input, WarningOutlineIcon, Stack} from 'native-base';
import {Text, View} from 'react-native';

// 스타일 파일을 불러옵니다.
import style from './PasswordFormControl.style';

// 'UsernameFormControl' 함수형 컴포넌트를 정의합니다.
const UsernameFormControl = props => {
  return (
    // 뷰 컴포넌트를 렌더링합니다.
    <View>
      {/* NativeBase의 FormControl을 사용하여 입력 폼을 구성합니다. */}
      <FormControl zIndex={1}>
        {/* Stack을 사용하여 입력 폼의 스타일을 설정합니다. */}
        <Stack width="335" mx="5" mt="60">
          {/* FormControl.Label을 사용하여 입력 필드의 레이블을 정의합니다. */}
          <FormControl.Label>
            <Text style={style.form_title_style}>아이디</Text>
          </FormControl.Label>
          {/* Input 컴포넌트를 사용하여 실제 입력이 가능한 폼을 생성합니다. */}
          <Input
            size="xl"
            variant="underlined"
            onChangeText={props.handleInputChange('username')}
            value={props.userData.username}
            placeholder="아이디 입력"
            style={style.form_input_style}
          />
          {/* FormControl.HelperText를 사용하여 보조 텍스트를 표시합니다. */}
          <FormControl.HelperText>
            <Text style={style.form_helpertext_style}>
              영문, 숫자 조합 2~10자리
            </Text>
          </FormControl.HelperText>
          {/* FormControl.ErrorMessage를 사용하여 에러 메시지를 표시합니다. */}
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </View>
  );
};

// 'UsernameFormControl' 컴포넌트를 내보냅니다.
export default UsernameFormControl;
