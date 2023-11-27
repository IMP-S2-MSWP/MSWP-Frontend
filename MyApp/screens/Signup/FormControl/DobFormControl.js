// DobFormControl.js

import React, {useState} from 'react';
import {FormControl, Pressable, WarningOutlineIcon, Stack} from 'native-base';
import {Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import style from './NameGenderDobFormControl.style';

// 'DobFormControl'이라는 함수형 컴포넌트를 정의합니다.
const DobFormControl = props => {
  // 생년월일을 선택하는 DatePicker 모달의 가시성 상태를 관리하는 상태입니다.
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // 선택된 생년월일을 저장하는 상태입니다.
  const [dob, setDob] = useState('');

  // DatePicker 모달을 표시하는 함수입니다.
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // DatePicker 모달을 숨기는 함수입니다.
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // DatePicker에서 날짜가 선택되면 호출되는 콜백 함수입니다.
  const handleConfirm = selectedDate => {
    // 선택된 날짜를 ISO 형식으로 변환하여 저장합니다.
    const formattedDate = selectedDate.toISOString().split('T')[0];
    // 생년월일 상태를 업데이트합니다.
    setDob(formattedDate);
    // DatePicker 모달을 숨깁니다.
    hideDatePicker();
    // 부모 컴포넌트에서 전달받은 생년월일 상태를 업데이트하는 함수를 호출합니다.
    props.handleInputChange('dob')(formattedDate);
  };

  return (
    <View>
      {/* 폼 컨트롤을 사용하여 입력 폼을 감싸는 부분입니다. */}
      <FormControl>
        <Stack width="335" mx="5" mt="10">
          {/* 레이블을 표시하는 부분입니다. */}
          <FormControl.Label>
            {/* 텍스트 스타일을 'style.form_title_style'에서 가져온 스타일로 적용합니다. */}
            <Text style={style.form_title_style}>생년월일</Text>
          </FormControl.Label>
          {/* 생년월일을 선택하는 Pressable을 표시하는 부분입니다. */}
          <View style={{borderBottomWidth: 1, borderBottomColor: '#D4D4D4'}}>
            <Pressable onPress={showDatePicker}>
              {/* 선택된 생년월일이 있으면 검은색, 없으면 회색으로 표시합니다. */}
              <Text
                style={{
                  ...style.form_input_style,
                  marginBottom: 8,
                  color: dob ? 'black' : '#868686',
                }}>
                {/* 선택된 생년월일이 있으면 선택된 날짜를, 없으면 '생년월일 선택'을 표시합니다. */}
                {dob ? dob : '생년월일 선택'}
              </Text>
            </Pressable>
          </View>
          {/* 생년월일 입력이 필요한 경우 에러 메시지를 표시하는 부분입니다. */}
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>

          {/* DatePicker 모달을 표시하는 부분입니다. */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </Stack>
      </FormControl>
    </View>
  );
};

// 'DobFormControl' 컴포넌트를 내보냅니다.
export default DobFormControl;
