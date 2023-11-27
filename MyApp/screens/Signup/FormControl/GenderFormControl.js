// GenderFormControl.js

import {FormControl, Radio, Stack} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import style from './NameGenderDobFormControl.style';

// 'GenderFormControl'이라는 함수형 컴포넌트를 정의합니다.
const GenderFormControl = props => {
  return (
    <View>
      {/* 폼 컨트롤을 사용하여 입력 폼을 감싸는 부분입니다. */}
      <FormControl>
        <Stack width="335" mx="5" mt="10">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>성별</Text>
          </FormControl.Label>
          {/* 성별을 선택하는 Radio.Group을 표시하는 부분입니다. */}
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="gender"
            value={props.userData.gender}
            onChange={props.handleInputChange('gender')}>
            {/* '남성'을 선택하는 Radio를 표시하는 부분입니다. */}
            <Radio value="man" my={1}>
              {/* 현재 선택된 성별이 '남성'이면 글자색을 검은색으로, 아니면 회색으로 표시합니다. */}
              <Text
                style={{
                  ...style.form_input_style,
                  color: props.userData.gender == 'man' ? 'black' : '#868686',
                }}>
                {' '}
                남성
              </Text>
            </Radio>
            {/* '여성'을 선택하는 Radio를 표시하는 부분입니다. */}
            <Radio value="woman" my={1}>
              {/* 현재 선택된 성별이 '여성'이면 글자색을 검은색으로, 아니면 회색으로 표시합니다. */}
              <Text
                style={{
                  ...style.form_input_style,
                  color: props.userData.gender == 'woman' ? 'black' : '#868686',
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

// 'GenderFormControl' 컴포넌트를 내보냅니다.
export default GenderFormControl;
