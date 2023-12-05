import React from 'react';
import {Pressable, Animated} from 'react-native';

/**
 * 애니메이션 관련 상태와 핸들러를 제공하는 커스텀 훅입니다.
 * 이미지와 텍스트 입력 필드의 크기를 애니메이션으로 조절하는 로직을 포함합니다.
 *
 * @returns {object} 애니메이션 상태와 핸들러를 포함한 객체.
 * {
 *   imageSize: 이미지의 크기를 조절하는 Animated.Value 객체,
 *   inputHeight: 텍스트 입력 필드의 높이를 조절하는 Animated.Value 객체,
 *   handleFocus: 텍스트 입력 필드에 포커스가 있을 때 호출되는 함수,
 *   handleBlur: 텍스트 입력 필드에서 포커스가 사라질 때 호출되는 함수
 * }
 */
const ImagePickerComponent = ({
  handleChoosePhoto,
  fileSource,
  imageSize,
  styles,
}) => {
  return (
    <Pressable
      p="1"
      mt="5"
      rounded="20"
      alignSelf="center"
      onPress={() => handleChoosePhoto()}>
      <Animated.Image
        source={{uri: fileSource + '?cache=' + Math.random()}}
        style={[styles.bannerImage, {height: imageSize, width: imageSize}]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default ImagePickerComponent;
