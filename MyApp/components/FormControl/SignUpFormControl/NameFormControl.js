import React from 'react';
import {FormControl, Input, WarningOutlineIcon, Stack} from 'native-base';
import {Text, View} from 'react-native';
import style from '../SignUpFormControlStyle/NameGenderDobFormControl.style';

/**
 * 이름을 입력받는 폼 컨트롤을 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 사용자 데이터 객체, 이름 정보를 포함합니다.
 * @param {string} props.userData.name - 현재 입력된 이름 값.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} NameFormControl 컴포넌트.
 */
const NameFormControl = props => {
  return (
    <View>
      <FormControl>
        <Stack width="335" mx="5" mt="60">
          <FormControl.Label>
            <Text style={style.form_title_style}>이름</Text>
          </FormControl.Label>
          <Input
            size="xl"
            variant="underlined"
            onChangeText={props.handleInputChange('name')}
            value={props.userData.name}
            placeholder="이름 입력"
            style={style.form_input_style}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </View>
  );
};

// 'NameFormControl' 컴포넌트를 내보냅니다.
export default NameFormControl;
