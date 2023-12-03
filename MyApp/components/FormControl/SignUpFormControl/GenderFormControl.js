/**
 * GenderFormControl.js
 *
 * @module GenderFormControl
 */

import {FormControl, Radio, Stack} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import style from '../SignUpFormControlStyle/NameGenderDobFormControl.style';

/**
 * 성별을 입력받는 폼 컨트롤을 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {object} props.userData - 성별 정보를 포함한 사용자 데이터 객체.
 * @param {string} props.userData.gender - 선택된 성별 ('man' 또는 'woman').
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} GenderFormControl 컴포넌트.
 */
const GenderFormControl = props => {
  return (
    <View>
      <FormControl>
        <Stack width="335" mx="5" mt="10">
          <FormControl.Label>
            <Text style={style.form_title_style}>성별</Text>
          </FormControl.Label>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="gender"
            value={props.userData.gender}
            onChange={props.handleInputChange('gender')}>
            <Radio value="man" my={1}>
              <Text
                style={{
                  ...style.form_input_style,
                  color: props.userData.gender === 'man' ? 'black' : '#868686',
                }}>
                {' '}
                남성
              </Text>
            </Radio>
            <Radio value="woman" my={1}>
              <Text
                style={{
                  ...style.form_input_style,
                  color:
                    props.userData.gender === 'woman' ? 'black' : '#868686',
                }}>
                {' '}
                여성
              </Text>
            </Radio>
          </Radio.Group>
        </Stack>
      </FormControl>
    </View>
  );
};

// GenderFormControl 컴포넌트를 내보냅니다.
export default GenderFormControl;
