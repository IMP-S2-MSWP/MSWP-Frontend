import React from 'react';
import {FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import {Text, View} from 'react-native';
import style from '../SignUpFormControlStyle/PasswordFormControl.style';

/**
 * 비밀번호와 관련된 입력 폼을 표시하는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 비밀번호 정보를 포함합니다.
 * @param {string} props.userData.password - 현재 입력된 비밀번호 값.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 * @param {boolean} props.passwordsDoNotMatch - 비밀번호 확인이 일치하지 않는지 여부.
 * @param {string} props.passwordConfirmation - 비밀번호 확인 값.
 * @param {function} props.setPasswordConfirmation - 비밀번호 확인 값을 설정하는 함수.
 *
 * @returns {JSX.Element} PasswordFormControl 컴포넌트.
 */
const PasswordFormControl = props => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const isPasswordValid = passwordPattern.test(props.userData.password);

  return (
    <View>
      <FormControl isInvalid={!isPasswordValid}>
        <Stack width="335" mx="5" mt="60">
          <FormControl.Label>
            <Text style={style.form_title_style}>비밀번호</Text>
          </FormControl.Label>
          <Input
            size="xl"
            variant="underlined"
            type="password"
            onChangeText={props.handleInputChange('password')}
            value={props.userData.password}
            placeholder="비밀번호 입력"
            style={style.form_input_style}
          />
          <FormControl.HelperText>
            <Text style={style.form_helpertext_style}>
              영문, 숫자 조합으로만 가능
            </Text>
          </FormControl.HelperText>
          {!isPasswordValid && (
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Password must contain at least one letter and one number.
            </FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>

      <FormControl isInvalid={props.passwordsDoNotMatch}>
        <Stack width="335" mx="5" mt="10">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label mt="1" isInvalid>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>비밀번호 확인</Text>
          </FormControl.Label>
          <Input
            size="xl"
            type="password"
            variant="underlined"
            onChangeText={value => props.setPasswordConfirmation(value)}
            value={props.passwordConfirmation}
            placeholder="비밀번호 재입력"
            style={style.form_input_style}
          />
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
