// PasswordPage.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input,FormControl,WarningOutlineIcon,Stack} from "native-base";
//import {inputStyle} from "../../components/Style/Signup/style"
const PasswordPage = ({ userData, handleInputChange }) => {
    const invalidName = {
        height: 27,
        fontFamily: "LeferiBaseType",
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.47,
        textAlign: "left",
        color: "#868686"
      };
      const invalidName2 = {
        fontFamily: "LeferiBaseType",
        fontWeight: "bold",
        fontStyle: "normal",
        fontSize: 16,
        letterSpacing: 0.47,
        textAlign: "left",
      };
      const invalidName3 = {
        width: 161,
        height: 21,
        fontFamily: "LeferiBaseType",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.36,
        textAlign: "left",
        color: "#868686"
      };
  return (
    <View>
       <FormControl >
          <Stack width= "335" mx="5" mt ='101'>
            <FormControl.Label><Text style={invalidName}>비밀번호</Text></FormControl.Label>
            <Input size="xl" variant ='underlined' type ="password" onChangeText={handleInputChange('password')} value={userData.password} placeholder="비밀번호 입력" style={invalidName2}/>
            <FormControl.HelperText>
            <Text style={invalidName3}>영문, 숫자 조합 2~10자리</Text>
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
            <FormControl.Label mt='10'><Text style={invalidName}>비밀번호 확인</Text></FormControl.Label>
            <Input size="xl" type ="password" variant ='underlined' onChangeText={handleInputChange('password')} value={userData.password} placeholder="비밀번호 입력" style={invalidName2}/>

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
    </View>
  );
};

export default PasswordPage;
