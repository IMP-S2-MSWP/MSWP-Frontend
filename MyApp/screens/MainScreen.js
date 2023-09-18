import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,useTheme} from "native-base"
const MainScreen = (props) => {
  const theme = useTheme()
  const [user, setUser] = useState([]);


  const handlePressIn = () => {
    props.navigation.navigate('오늘');
  };
  const handlePressIn2 = () => {
    props.navigation.navigate('예정');
  };
  const handlePressIn3 = () => {
    props.navigation.navigate('전체');
  };
  const handlePressIn4 = () => {
    props.navigation.navigate('완료됨');
  };

  return (
    <View style={styles.center}>
      <View>
        <CustomButton
          handlePressIn={handlePressIn}
          icon="calendar"
          color="#0080ff"
          name="마이페이지"
        />
        <CustomButton
          handlePressIn={handlePressIn2}
          icon="server"
          color="#f34336"
          name="주변기기찾기"
        />
        <CustomButton
          handlePressIn={handlePressIn3}
          icon="inbox"
          color="#7f7f7f"
          name="주변비콘찾기"
        />
        <CustomButton
          handlePressIn={handlePressIn4}
          icon="check"
          color="#7f8385"
          name="생각중"
        />
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#000000',
  },
});

export default MainScreen;