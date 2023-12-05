import React from 'react';
import {TextInput} from 'react-native';

/**
 * 커스텀 입력 필드 컴포넌트
 * @param {string} value - 현재 입력 값
 * @param {Function} onChangeText - 입력 값이 변경될 때 호출되는 콜백 함수
 * @param {boolean} isEditable - 입력 필드의 편집 가능 여부
 * @param {Object} customStyle - 외부에서 전달되는 커스텀 스타일 객체
 */
const MyPageInput = ({value, onChangeText, isEditable, customStyle}) => {
  return (
    <TextInput
      style={{
        color: isEditable ? '#808588' : 'black',
        borderBottomWidth: isEditable ? 0.2 : 0,
        caretHidden: false,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 17,
        ...customStyle,
      }}
      value={value}
      onChangeText={onChangeText}
      editable={isEditable}
    />
  );
};

export default MyPageInput;
