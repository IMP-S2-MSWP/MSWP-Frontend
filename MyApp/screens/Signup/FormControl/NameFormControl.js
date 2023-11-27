// NameFormControl.js

import React from 'react';
import {FormControl, Input, WarningOutlineIcon, Stack} from 'native-base';
import {Text, View} from 'react-native';
import style from './NameGenderDobFormControl.style';

// 'NameFormControl'이라는 함수형 컴포넌트를 정의합니다.
const NameFormControl = props => {
  return (
    <View>
      {/* 폼 컨트롤을 사용하여 입력 폼을 감싸는 부분입니다. */}
      <FormControl>
        <Stack width="335" mx="5" mt="60">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>이름</Text>
          </FormControl.Label>
          {/* 이름을 입력받는 Input을 표시하는 부분입니다. */}
          <Input
            size="xl"
            variant="underlined"
            onChangeText={props.handleInputChange('name')}
            value={props.userData.name}
            placeholder="이름 입력"
            style={style.form_input_style}
          />
          {/* 이름 입력 에러 메시지를 표시하는 부분입니다. */}
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
