/* 
 회원가입 입력 창 컴포넌트
 2023-09-04//고주원//초안 작성
 2023-09-05//이상용//입력 폼 생성
 2023-09-06//이상용//디자인툴 NativeBase 설치 및 적용
 2023-09-10//이상용//디자인 변경 및 폰트적용
 2023-09-11//이상용//api연결 테스트, 성공
 */
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import Registerstyle from '../styles/Registerstyle';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
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
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
  };
  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  const handleFocus4 = () => {
    setIsFocused4(true);
  };
  const handleBlur4 = () => {
    setIsFocused4(false);
  };

  const handleFocus5 = () => {
    setIsFocused5(true);
  };
  const handleBlur5 = () => {
    setIsFocused5(false);
  };

//백엔드와 통신
  //const [responseData, setResponseData] = useState<any>(null);
  const [responseData, setResponseData] = useState<string>('');
  useEffect(() => {
    getData();
  }, []);

  // 백엔드와 통신하여 데이터 가져오기
  const getData = async () => {
    try {
      // GET 요청 보내기
      const response = await axios.get('http://192.168.0.16:8080/api/test');
      
      // 응답 데이터 설정
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

   // 회원가입 요청을 보내는 함수
   const handleRegister = async () => {
    try {
      // POST 요청 보낼 데이터 생성
      const requestData = {
        id,
        password,
        username,
        nickname,
        sex,
        birthDate: birthDateYear + birthDate
      };

      // POST 요청 보내기
      const response = await axios.post('http://192.168.0.16:8080/api/register', requestData);
      console.log(response.data);
      // 회원가입 성공 시 처리할 로직 작성
     
    } catch (error) {
      console.error(error);
    }
   
    // onRegister(id,password...); <- 이 부분은 필요에 따라 적절하게 호출해주세요.
   
    // 나머지 로직 작성...
   
  };
  
  return (
    <>
     {/*api 호출 테스트*/}
      {/*<Text>{JSON.stringify(responseData)}</Text>*/}
      <Text>{responseData}</Text>
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
     <TextInput style= {[Registerstyle.input, isFocused5 && Registerstyle.inputFocused]} placeholder="MMd-DD" onChangeText={setBirthDate} onFocus={handleFocus5} onBlur={handleBlur5} />
     <TouchableOpacity style={Registerstyle.startBt} onPress={() =>onRegister(id,password,username,nickname,sex,birthDateYear+birthDate)} >
        <Text style={Registerstyle.btText}>회원가입</Text>
    </TouchableOpacity>
    <TouchableOpacity style={Registerstyle.startBt} onPress={() => handleRegister()}>
        <Text style={Registerstyle.btText}>회원가입test</Text>
    </TouchableOpacity>
    </>
    
  )
};

export default RegisterForm;