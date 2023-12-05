import React from 'react';
import {View, TextInput, Animated} from 'react-native';

/**
 * 광고 문구를 입력받는 컴포넌트입니다.
 * 사용자가 광고에 표시할 텍스트를 입력할 수 있는 TextInput을 포함합니다.
 * 입력 필드에 포커스가 있거나 없을 때의 애니메이션도 처리합니다.
 *
 * @param {string} title - 현재 입력 필드에 표시되는 텍스트.
 * @param {function} setTitle - 입력 필드의 텍스트를 업데이트하는 함수.
 * @param {object} inputHeight - 입력 필드의 높이를 조절하는 Animated.Value 객체.
 * @param {function} handleFocus - 입력 필드에 포커스가 있을 때 실행되는 함수.
 * @param {function} handleBlur - 입력 필드에서 포커스가 사라질 때 실행되는 함수.
 * @param {object} styles - 컴포넌트에 적용된 스타일.
 */
const AdvertisementTextInputComponent = ({
  title,
  setTitle,
  inputHeight,
  handleFocus,
  handleBlur,
  styles,
}) => {
  return (
    <View style={styles.formContainer}>
      <Animated.View style={[styles.input, {height: inputHeight}]}>
        <TextInput
          placeholder="광고 문구 입력"
          value={title}
          onChangeText={setTitle}
          maxLength={30}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
};

export default AdvertisementTextInputComponent;
