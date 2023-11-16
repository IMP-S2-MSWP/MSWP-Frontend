import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, FormControl, WarningOutlineIcon, Stack, Radio,Pressable,Icon,MaterialIcons} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import style from "../../components/Style/Signup/style"

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

  return (
    <View>
      <FormControl >
        <Stack width= "335" mx="5" mt ='60'>
          <FormControl.Label><Text style={style.form_title_style}>이름</Text></FormControl.Label>
          <Input size="xl" variant ='underlined' onChangeText={handleInputChange('name')} value={userData.name} placeholder="이름 입력" style={style.form_input_style} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>

          <FormControl.Label mt ='10'><Text style={style.form_title_style}>성별</Text></FormControl.Label>
          <Radio.Group name="myRadioGroup" accessibilityLabel="gender" value={userData.gender} onChange={handleInputChange('gender')}>
            <Radio value="man" my={1}>
            <Text style={{...style.form_input_style,color: userData.gender=='man' ? "black": "#868686"}}> 남성</Text>
            </Radio>
            <Radio value="woman" my={1}>
            <Text style={{...style.form_input_style,color: userData.gender=='woman' ? "black": "#868686"}}> 여성</Text>
            </Radio>
          </Radio.Group>

          {/* 생년월일 입력 */}
          <FormControl.Label  mt ='10'><Text style={style.form_title_style}>생년월일</Text></FormControl.Label>
          <View style = {{borderBottomWidth:1, borderBottomColor:"#D4D4D4"}}>
           <Pressable onPress={showDatePicker}>
           <Text style={{...style.form_input_style,
                          marginBottom:8,
                          color: dob? "black": "#868686"}}>
                            {dob ? dob : "생년월일 선택"}
                            </Text>
    
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