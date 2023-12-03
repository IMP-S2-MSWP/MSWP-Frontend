// PasswordFormControl.js

import React from 'react';
import {FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import {Text, View} from 'react-native';
import style from './PasswordFormControl.style';

// 'PasswordFormControl'이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 비밀번호와 관련된 입력 폼을 표시합니다.
const PasswordFormControl = props => {
  // 비밀번호의 유효성을 검사하는 정규 표현식 패턴입니다.
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 비밀번호가 유효한지 여부를 확인합니다.
  const isPasswordValid = passwordPattern.test(props.userData.password);

  return (
    <View>
      {/* 폼 컨트롤을 사용하여 입력 폼을 감싸는 부분입니다. */}
      <FormControl isInvalid={!isPasswordValid}>
        <Stack width="335" mx="5" mt="60">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>비밀번호</Text>
          </FormControl.Label>
          {/* 비밀번호 입력 필드를 표시하는 부분입니다. */}
          <Input
            size="xl"
            variant="underlined"
            type="password"
            onChangeText={props.handleInputChange('password')}
            value={props.userData.password}
            placeholder="비밀번호 입력"
            style={style.form_input_style}
          />
          {/* 도움말 텍스트를 표시하는 부분입니다. */}
          <FormControl.HelperText>
            {/* 텍스트 스타일을 'style.form_helpertext_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_helpertext_style}>
              영문, 숫자 조합으로만 가능
            </Text>
          </FormControl.HelperText>
          {/* 비밀번호가 유효하지 않은 경우 에러 메시지를 표시하는 부분입니다. */}
          {!isPasswordValid && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Password must contain at least one letter and one number.
            </FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>

      {/* 비밀번호 확인 부분입니다. */}
      <FormControl isInvalid={props.passwordsDoNotMatch}>
        <Stack width="335" mx="5" mt="10">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label mt="1" isInvalid>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>비밀번호 확인</Text>
          </FormControl.Label>
          {/* 비밀번호 확인 입력 필드를 표시하는 부분입니다. */}
          <Input
            size="xl"
            type="password"
            variant="underlined"
            onChangeText={value => props.setPasswordConfirmation(value)}
            value={props.passwordConfirmation}
            placeholder="비밀번호 재입력"
            style={style.form_input_style}
          />
          {/* 비밀번호 불일치 시 에러 메시지를 표시하는 부분입니다. */}
          {props.passwordsDoNotMatch && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Passwords do not match.
            </FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>
    </View>
  );
};

// 'PasswordFormControl' 컴포넌트를 내보냅니다.
export default PasswordFormControl;
