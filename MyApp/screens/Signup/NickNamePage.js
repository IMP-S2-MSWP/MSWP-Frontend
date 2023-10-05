// NicknamePage.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input,FormControl,WarningOutlineIcon,Stack} from "native-base";
import style from "../../components/Style/Signup/style"
//import {inputStyle} from "../../components/Style/Signup/style"
const NicknamePage = ({ userData, handleInputChange }) => {
  return (
    <View>
       <FormControl >
          <Stack width= "335" mx="5" mt ='60'>
            <FormControl.Label><Text style={style.form_title_style}>닉네임</Text></FormControl.Label>
            <Input size="xl" variant ='underlined' 
            onChangeText={handleInputChange('nickname')} value={userData.nickname} 
            placeholder="아이디 입력"  
            style={style.form_input_style}/>
            <FormControl.HelperText>
            <Text style={style.form_helpertext_style}>한글, 영문, 숫자 조합 10자리 </Text>
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
    </View>
  );
};

export default NicknamePage;
