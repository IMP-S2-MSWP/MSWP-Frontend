/* 
 회원가입 입력 창 컴포넌트
 2023-09-04//고주원//초안 작성
 2023-09-05//이상용//입력 폼 생성
 2023-09-06//이상용//디자인툴 NativeBase 설치 및 적용
 2023-09-10//이상용//디자인 변경 및 폰트적용
 */
import React, { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import Registerstyle from '../styles/Registerstyle';
import { Picker } from '@react-native-picker/picker';
interface Props {
  onRegister: (id:string,password:string,username:string,nickname:string,sex:string,birthDate:String) => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [sex, setSex] = useState('');
  const [birthDateYear,setBirthDateYear]=useState("2000");
  const [birthDate,setBirthDate]=useState('');
  
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);

  const handleFocus1 = () => {
    setIsFocused1(true);
    // textInput1에 대한 추가적인 동작 수행
  };
  const handleBlur1 = () => {
    setIsFocused1(false);
    // textInput1에 대한 추가적인 동작 수행
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
    // textInput2에 대한 추가적인 동작 수행
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
    // textInput2에 대한 추가적인 동작 수행
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
    // textInput2에 대한 추가적인 동작 수행
  };
  const handleBlur3 = () => {
    setIsFocused3(false);
    // textInput2에 대한 추가적인 동작 수행
  };

  const handleFocus4 = () => {
    setIsFocused4(true);
    // textInput2에 대한 추가적인 동작 수행
  };
  const handleBlur4 = () => {
    setIsFocused4(false);
    // textInput2에 대한 추가적인 동작 수행
  };

  const handleFocus5 = () => {
    setIsFocused5(true);
    // textInput2에 대한 추가적인 동작 수행
  };
  const handleBlur5 = () => {
    setIsFocused5(false);
    // textInput2에 대한 추가적인 동작 수행
  };

  return (
    <>
      <TextInput style={[Registerstyle.input, isFocused1 && Registerstyle.inputFocused]} placeholder="ID" onChangeText={setId} value={id} onFocus={handleFocus1} onBlur={handleBlur1}/>
      <TextInput style={[Registerstyle.input, isFocused2 && Registerstyle.inputFocused]} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} onFocus={handleFocus2} onBlur={handleBlur2}/>
      <TextInput style={[Registerstyle.input, isFocused3 && Registerstyle.inputFocused]} placeholder="Username" onChangeText={setUsername} value={username} onFocus={handleFocus3} onBlur={handleBlur3} />
      <TextInput style={[Registerstyle.input, isFocused4 && Registerstyle.inputFocused]} placeholder="Nickname" onChangeText={setNickname} value={nickname} onFocus={handleFocus4} onBlur={handleBlur4}/>

      {/* 성별 선택 */}
      
        <Picker style={Registerstyle.picker} selectedValue={sex} onValueChange={(itemValue) => setSex(itemValue)}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          {/* 필요한 경우 다른 옵션 추가 가능 */}
        </Picker>
        {/* 생년 선택 */}
      <Picker style={Registerstyle.picker} selectedValue={birthDateYear} onValueChange={(itemValue)=>setBirthDateYear(itemValue)}>
        {[...Array(100)].map((_,i)=>(
          //1900년부터 현재까지의 연도를 표시합니다.
          //필요에 따라 범위를 조정할 수 있습니다.
          <Picker.Item key={`year-${1900+i}`} label={`${1900+i}`} value={`${1900+i}`}/>
        ))}
      </Picker>
     {/* 월/일은 텍스트 인풋으로 받는다고 가정하고 코드 작성 */}
     {/* 이 부분은 필요에 따라 본인의 앱에 맞게 수정하세요. */}
     <TextInput style= {[Registerstyle.input, isFocused5 && Registerstyle.inputFocused]} placeholder="MM-DD" onChangeText={setBirthDate} onFocus={handleFocus5} onBlur={handleBlur5} />
     <TouchableOpacity style={Registerstyle.startBt} onPress={() =>onRegister(id,password,username,nickname,sex,birthDateYear+birthDate)} >
        <Text style={Registerstyle.btText}>회원가입</Text>
    </TouchableOpacity>
    </>
    
  )
};

export default RegisterForm;