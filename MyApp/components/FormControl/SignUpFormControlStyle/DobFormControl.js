/**
 * DobFormControl.js
 *
 * @module DobFormControl
 */

import React, {useState} from 'react';
import {FormControl, Pressable, WarningOutlineIcon, Stack} from 'native-base';
import {Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import style from './NameGenderDobFormControl.style';

/**
 * 생년월일을 입력받는 폼 컨트롤을 나타내는 함수형 컴포넌트입니다.
 *
 * @param {object} props - 컴포넌트 프로퍼티.
 * @param {function} props.handleInputChange - 입력 변경을 처리하는 콜백 함수.
 *
 * @returns {JSX.Element} DobFormControl 컴포넌트.
 */
const DobFormControl = props => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState('');

  /**
   * DatePicker 모달을 표시합니다.
   */
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  /**
   * DatePicker 모달을 숨깁니다.
   */
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  /**
   * DatePicker에서 날짜가 선택되면 호출되는 콜백 함수입니다.
   * 선택된 날짜를 ISO 형식으로 변환하여 상태를 업데이트하고, DatePicker 모달을 숨깁니다.
   * 부모 컴포넌트에서 전달받은 생년월일 상태를 업데이트하는 함수를 호출합니다.
   *
   * @param {Date} selectedDate - 선택된 날짜.
   */
  const handleConfirm = selectedDate => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDob(formattedDate);
    hideDatePicker();
    props.handleInputChange('dob')(formattedDate);
  };

  return (
    <View>
      <FormControl>
        <Stack width="335" mx="5" mt="10">
          <FormControl.Label>
            <Text style={style.form_title_style}>생년월일</Text>
          </FormControl.Label>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#D4D4D4'}}>
            <Pressable onPress={showDatePicker}>
              <Text
                style={{
                  ...style.form_input_style,
                  marginBottom: 8,
                  color: dob ? 'black' : '#868686',
                }}>
                {dob ? dob : '생년월일 선택'}
              </Text>
            </Pressable>
          </View>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>

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

export default DobFormControl;
