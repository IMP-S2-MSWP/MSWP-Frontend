// NameGenderDOBPage.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input,FormControl,WarningOutlineIcon,Stack,Radio} from "native-base";
//import {inputStyle} from "../../components/Style/Signup/style"
const NameGenderDOBPage = ({ userData, handleInputChange,handleGenderChange }) => {
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
        color: "#999999"
      };
      const invalidName3 = {
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
            <FormControl.Label><Text style={invalidName}>이름</Text></FormControl.Label>
            <Input size="xl" variant ='underlined' onChangeText={handleInputChange('name')} value={userData.name} placeholder="이름 입력" style={invalidName2}/>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
            <FormControl.Label mt ='10'><Text style={invalidName}>성별</Text></FormControl.Label>
            <Radio.Group name="myRadioGroup" accessibilityLabel="gender" value={userData.gender} onChange={handleInputChange('gender')}>
            <Radio value="man" my={1}>
              남성
            </Radio>
            <Radio value="woman" my={1}>
              여성
            </Radio>
            </Radio.Group>
          </Stack>
        </FormControl>
        
    </View>
  );
};

export default NameGenderDOBPage;
