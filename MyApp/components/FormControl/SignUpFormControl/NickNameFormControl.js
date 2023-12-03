/**
 * NickNameFormControl.js
 *
 * @module NickNameFormControl
 */

import React from 'react';
import {FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import {Text, View} from 'react-native';
import style from '../SignUpFormControlStyle/NickNameFormControl.style';

/**
 * 사용자의 닉네임을 입력받는 폼 컨트롤을 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 닉네임 정보를 포함합니다.
 * @param {string} props.userData.nickname - 현재 입력된 닉네임 값.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} NickNameFormControl 컴포넌트.
 */
const NickNameFormControl = props => {
  return (
    <View pointerEvents="box-none">
      <FormControl>
        <Stack width="335" mx="5" mt="60">
          <FormControl.Label>
            <Text style={style.form_title_style}>닉네임</Text>
          </FormControl.Label>
          <Input
            size="xl"
            variant="underlined"
            onChangeText={props.handleInputChange('nickname')}
            value={props.userData.nickname}
            placeholder="닉네임 입력"
            style={style.form_input_style}
          />
          <FormControl.HelperText>
            <Text style={style.form_helpertext_style}>
              한글, 영문, 숫자 조합 10자리{' '}
            </Text>
          </FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </View>
  );
};

// NickNameFormControl 컴포넌트를 내보냅니다.
export default NickNameFormControl;
