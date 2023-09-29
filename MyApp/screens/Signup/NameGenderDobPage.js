import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, FormControl, WarningOutlineIcon, Stack, Radio,Pressable,Icon,MaterialIcons} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NameGenderDOBPage = ({ userData, handleInputChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob,setDob] = useState("");
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDob(formattedDate); 
    hideDatePicker();
    handleInputChange('dob')(formattedDate); // 생년월일 상태 업데이트
  };
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
  const invalidName1 = {
    fontFamily: "LeferiBaseType",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.47,
    textAlign: "left",
    color: "#868686",
  };
  const invalidName2 = {
    fontFamily: "LeferiBaseType",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 16,
    letterSpacing: 0.47,
    textAlign: "left",
  };
  const invalidName4 = {
    fontFamily: "LeferiBaseType",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.47,
    textAlign: "left",
    color: "#868686",
    marginBottom: 8
  };
  return (
    <View>
      <FormControl >
        <Stack width= "335" mx="5" mt ='60'>
          <FormControl.Label><Text style={invalidName}>이름</Text></FormControl.Label>
          <Input size="xl" variant ='underlined' onChangeText={handleInputChange('name')} value={userData.name} placeholder="이름 입력" style={invalidName2}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>

          <FormControl.Label mt ='10'>성별</FormControl.Label>
          <Radio.Group name="myRadioGroup" accessibilityLabel="gender" value={userData.gender} onChange={handleInputChange('gender')}>
            <Radio value="man" my={1}>
            <Text style={invalidName1}> 남성</Text>
            </Radio>
            <Radio value="woman" my={1}>
            <Text style={invalidName1}> 여성</Text>
            </Radio>
          </Radio.Group>

          {/* 생년월일 입력 */}
          <FormControl.Label  mt ='10'><Text style={invalidName}>생년월일</Text></FormControl.Label>
          <View style = {{borderBottomWidth:1, borderBottomColor:"#D4D4D4"}}>
           <Pressable onPress={showDatePicker}>
           <Text style={invalidName4}>{dob ? dob : "생년월일 선택"}</Text>
    
          </Pressable>
          </View>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>
         
            
          

           {/* DatePicker 모달 */}
           <DateTimePickerModal
             isVisible={isDatePickerVisible}
             mode='date'
             onConfirm={handleConfirm}
             onCancel={() => setDatePickerVisibility(false)}
           />
        </Stack>
      </FormControl>  
    </View>
 );
};

export default NameGenderDOBPage;