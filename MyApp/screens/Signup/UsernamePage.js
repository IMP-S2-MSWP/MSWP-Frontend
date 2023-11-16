// UsernamePage.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input,FormControl,WarningOutlineIcon,Stack} from "native-base";
import style from "../../components/Style/Signup/style"
//import {inputStyle} from "../../components/Style/Signup/style"
const UsernamePage = ({ userData, handleInputChange }) => {
     
  return (
    <View pointerEvents="box-none">
       <FormControl >
          <Stack width= "335" mx="5" mt ='60'>
            <FormControl.Label><Text style={style.form_title_style}>아이디</Text></FormControl.Label>
            <Input size="xl" variant ='underlined' onChangeText={handleInputChange('username')} value={userData.username} placeholder="아이디 입력" style={style.form_input_style} />
            <FormControl.HelperText>
            <Text style={style.form_helpertext_style}>영문, 숫자 조합 2~10자리</Text>
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
    </View>
  );
};

export default UsernamePage;
