import React, {useState} from 'react';
import {View} from 'react-native';
import DobFormControl from './FormControl/DobFormControl';
import GenderFormControl from './FormControl/GenderFormControl';
import NameFormControl from './FormControl/NameFormControl';

// 'NameGenderDOBPage' 함수형 컴포넌트를 정의합니다.
const NameGenderDOBPage = ({userData, handleInputChange}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState('');

  // DatePicker를 표시하는 함수입니다.
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // DatePicker를 숨기는 함수입니다.
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // DatePicker에서 날짜를 선택했을 때의 처리 함수입니다.
  const handleConfirm = selectedDate => {
    // 선택된 날짜를 ISO 형식으로 변환하여 상태를 업데이트합니다.
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDob(formattedDate);
    hideDatePicker();
    // 'handleInputChange' 함수를 사용하여 생년월일 상태를 업데이트합니다.
    handleInputChange('dob')(formattedDate);
  };

  return (
    <View>
      {/* 이름 입력 폼을 표시하는 'NameFormControl' 컴포넌트입니다. */}
      <NameFormControl
        userData={userData}
        handleInputChange={handleInputChange}
      />
      {/* 성별 입력 폼을 표시하는 'GenderFormControl' 컴포넌트입니다. */}
      <GenderFormControl
        userData={userData}
        handleInputChange={handleInputChange}
      />
      {/* 생년월일 입력 폼을 표시하는 'DobFormControl' 컴포넌트입니다. */}
      <DobFormControl handleInputChange={handleInputChange} />
    </View>
  );
};

// 'NameGenderDOBPage' 컴포넌트를 내보냅니다.
export default NameGenderDOBPage;
