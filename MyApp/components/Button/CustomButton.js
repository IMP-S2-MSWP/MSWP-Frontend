import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2679ff', // 버튼 배경색
    padding: 10, // 패딩
    borderRadius: 8, // 모서리 둥글기
    width: 335,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position :"absolute",
    bottom:140,
    left:20
  },
  buttonText: {
    color: '#ffffff', // 텍스트 색상
    fontSize: 16, // 텍스트 크기
    alignItems : 'center',
    fontFamily:'BMJUA_ttf',
    letterSpacing : 0.42
  },
});

export default CustomButton;
