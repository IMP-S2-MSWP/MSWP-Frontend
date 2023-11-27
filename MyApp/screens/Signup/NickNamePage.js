// NicknamePage.js
import {FormControl, Input, Stack, WarningOutlineIcon} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import style from '../../components/Style/Signup/style';
import NickNameFormControl from './FormControl/NickNameFormControl';
//import {inputStyle} from "../../components/Style/Signup/style"
const NicknamePage = ({userData, handleInputChange}) => {
  return (
    <View pointerEvents="box-none">
      <NickNameFormControl
        handleInputChange={handleInputChange}
        userData={userData}
      />
    </View>
  );
};

export default NicknamePage;
