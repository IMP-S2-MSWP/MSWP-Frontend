// React 및 NativeBase에서 필요한 컴포넌트를 불러옵니다.
import React from 'react';
import {FormControl, Input, WarningOutlineIcon, Stack} from 'native-base';
import {Text, View} from 'react-native';

import style from '../SignUpFormControlStyle/PasswordFormControl.style';

/**
 * 사용자명을 입력받는 폼 컨트롤을 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 사용자명 정보를 포함합니다.
 * @param {string} props.userData.username - 현재 입력된 사용자명 값.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} UsernameFormControl 컴포넌트.
 */
const UsernameFormControl = props => {
  return (
    <View>
      <FormControl>
        <Stack width="335" mx="5" mt="60">
          <FormControl.Label>
            <Text style={style.form_title_style}>아이디</Text>
          </FormControl.Label>
          <Input
            size="xl"
            variant="underlined"
            onChangeText={props.handleInputChange('username')}
            value={props.userData.username}
            placeholder="아이디 입력"
            style={style.form_input_style}
          />
          <FormControl.HelperText>
            <Text style={style.form_helpertext_style}>
              영문, 숫자 조합 2~10자리
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

// 'UsernameFormControl' 컴포넌트를 내보냅니다.
export default UsernameFormControl;
