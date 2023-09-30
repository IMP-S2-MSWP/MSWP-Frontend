// PasswordPage.js
import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input,FormControl,WarningOutlineIcon,Stack} from "native-base";
import style from "../../components/Style/Signup/style"

const PasswordPage = ({userData, handleInputChange,passwordConfirmation,setPasswordConfirmation,passwordsDoNotMatch}) => {
  console.log(passwordConfirmation)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 추가된 부분

  const isPasswordValid = passwordPattern.test(userData.password); 
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
          
            <Stack width= '335' mx='5' mt ='60'>
            <FormControl isInvalid={!isPasswordValid}>
              <FormControl.Label><Text style={style.form_title_style}>비밀번호</Text></FormControl.Label>
              <Input size="xl" variant ='underlined' type ="password" onChangeText={handleInputChange('password')} value={userData.password} placeholder="비밀번호 입력" style={invalidName2}/>
              <FormControl.HelperText>
                <Text style={invalidName3}>영문, 숫자 조합으로만 가능</Text>
              </FormControl.HelperText>
              {!isPasswordValid && ( /* 수정된 부분 */
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Password must contain at least one letter and one number.
            </FormControl.ErrorMessage>
        )}
              </FormControl>
   
              {/* 비밀번호 확인 */}
              <FormControl isInvalid={passwordsDoNotMatch}>
               <FormControl.Label mt='10' isInvalid ><Text style={style.form_title_style}>비밀번호 확인</Text></FormControl.Label>
               <Input 
                 size="xl" 
                 type ="password"
                 variant ='underlined'
                 onChangeText={(value)=>setPasswordConfirmation(value)}
                 value={passwordConfirmation}
                 placeholder="비밀번호 재입력"
                 style={invalidName2}
               />
   
               {/* 비밀번호 불일치 시 에러 메시지 */}
               {passwordsDoNotMatch && (
         <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
           Passwords do not match.
         </FormControl.ErrorMessage>
     )}
               </FormControl>
            </Stack>
          
        </View>);
};

export default PasswordPage;
