import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
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

  return (
    <>
      <TextInput placeholder="ID" onChangeText={setId} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Nickname" onChangeText={setNickname} />

      {/* 성별 선택 */}
      <Picker selectedValue={sex} onValueChange={(itemValue) => setSex(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        {/* 필요한 경우 다른 옵션 추가 가능 */}
      </Picker>
      {/* 생년 선택 */}
     <Picker selectedValue={birthDateYear} onValueChange={(itemValue)=>setBirthDateYear(itemValue)}>
       {[...Array(100)].map((_,i)=>(
         //1900년부터 현재까지의 연도를 표시합니다.
         //필요에 따라 범위를 조정할 수 있습니다.
         <Picker.Item key={`year-${1900+i}`} label={`${1900+i}`} value={`${1900+i}`}/>
       ))}
     </Picker>

     {/* 월/일은 텍스트 인풋으로 받는다고 가정하고 코드 작성 */}
     {/* 이 부분은 필요에 따라 본인의 앱에 맞게 수정하세요. */}
     <TextInput placeholder="MM-DD" onChangeText={setBirthDate} />
     <Button title="Register" onPress={() => onRegister(id,password,username,nickname,sex,birthDateYear+birthDate)} />
    </>
  );
};

export default RegisterForm;