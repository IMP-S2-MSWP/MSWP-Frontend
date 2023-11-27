// NickNameFormControl.js

import React from 'react';
import {FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import {Text, View} from 'react-native';
import style from './NickNameFormControl.style';
// 'NickNameFormControl'이라는 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 'userData'와 'handleInputChange'를 props로 받습니다.
const NickNameFormControl = props => {
  return (
    // 뷰 컴포넌트를 반환합니다.
    <View pointerEvents="box-none">
      {/* 폼 컨트롤을 사용하여 입력 폼을 감싸는 부분입니다. */}
      <FormControl>
        {/* 스택을 사용하여 레이아웃을 구성합니다. */}
        <Stack width="335" mx="5" mt="60">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>닉네임</Text>
          </FormControl.Label>
          {/* 입력 필드를 표시하는 부분입니다. */}
          <Input
            size="xl"
            variant="underlined"
            onChangeText={props.handleInputChange('nickname')}
            value={props.userData.nickname}
            placeholder="닉네임 입력"
            style={style.form_input_style}
          />
          {/* 도움말 텍스트를 표시하는 부분입니다. */}
          <FormControl.HelperText>
            {/* 텍스트 스타일을 'style.form_helpertext_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_helpertext_style}>
              한글, 영문, 숫자 조합 10자리{' '}
            </Text>
          </FormControl.HelperText>
          {/* 오류 메시지를 표시하는 부분입니다. */}
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </View>
  );
};

// 'NickNameFormControl' 컴포넌트를 내보냅니다.
export default NickNameFormControl;
