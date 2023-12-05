// useAnimationHandlers.js
import {useRef} from 'react';
import {Animated} from 'react-native';

/**
 * 사용자가 이미지를 선택할 수 있는 컴포넌트입니다.
 * 이미지 선택을 위한 버튼과 선택된 이미지를 보여주는 Animated.Image를 포함합니다.
 *
 * @param {function} handleChoosePhoto - 이미지 선택을 처리하는 함수.
 * @param {string} fileSource - 선택된 이미지의 URI.
 * @param {object} imageSize - 이미지 크기를 조절하는 Animated.Value 객체.
 * @param {object} styles - 컴포넌트에 적용된 스타일.
 */
const useAnimationHandlers = () => {
  const imageSize = useRef(new Animated.Value(400)).current;
  const inputHeight = useRef(new Animated.Value(80)).current;

  const handleFocus = () => {
    Animated.timing(imageSize, {
      toValue: 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(inputHeight, {
      toValue: 120,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(imageSize, {
      toValue: 400,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(inputHeight, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return {imageSize, inputHeight, handleFocus, handleBlur};
};

export default useAnimationHandlers;
