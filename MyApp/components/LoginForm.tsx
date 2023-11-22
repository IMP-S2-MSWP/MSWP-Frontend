// /*
//  LoginForm
//  2023-09-06//고주원//LoginForm 초안작성
//  2023-09-06//이상용//Login TextInput 스타일 테스트
//  2023-09-10//이상용//Login design
//  2023-09-11//이상용//api연결 테스트, 성공
//  */
// import React, { useEffect, useState } from 'react';
// import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Loginstyle from '../styles/Loginstyle';
// import Mainstyle from '../styles/Mainstyle';
// import axios from 'axios';
// interface Props {
//   onLogin: (id: string, password: string) => void;
// }

// const LoginForm: React.FC<Props> = ({ onLogin }) => {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const [isFocused1, setIsFocused1] = useState(false);
//   const [isFocused2, setIsFocused2] = useState(false);
//   const handleFocus1 = () => {
//     setIsFocused1(true);
//     // textInput1에 대한 추가적인 동작 수행
//   };

//   const handleBlur1 = () => {
//     setIsFocused1(false);
//     // textInput1에 대한 추가적인 동작 수행
//   };

//   const handleFocus2 = () => {
//     setIsFocused2(true);
//     // textInput2에 대한 추가적인 동작 수행
//   };

//   const handleBlur2 = () => {
//     setIsFocused2(false);
//     // textInput2에 대한 추가적인 동작 수행
//   };

//   ///////////////////////////////////////////////////////삭제
// //백엔드와 통신
//   //const [responseData, setResponseData] = useState<any>(null);
//   const [responseData, setResponseData] = useState<string>('');
//   useEffect(() => {
//     getData();
//   }, []);

//   // 백엔드와 통신하여 데이터 가져오기
//   const getData = async () => {
//     try {
//       // GET 요청 보내기
//       const response = await axios.get('http://192.168.0.16:8080/api/test');

//       // 응답 데이터 설정
//       setResponseData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//    // 회원가입 요청을 보내는 함수
//    const handleRegister = async () => {
//     try {
//       // POST 요청 보낼 데이터 생성
//       const requestData = {
//         id,
//         password,
//       };

//       // POST 요청 보내기
//       const response = await axios.post('http://192.168.0.16:8080/api/login', requestData);
//       console.log(response.data);
//       // 회원가입 성공 시 처리할 로직 작성

//     } catch (error) {
//       console.error(error);
//     }

//     // onRegister(id,password...); <- 이 부분은 필요에 따라 적절하게 호출해주세요.

//     // 나머지 로직 작성...

//   };

//   ///////////////////////////////////////////////////////

//   return (
//     <>
//       <View>
//         <Text style={Loginstyle.helloText}>안녕하세요!</Text>
//         <TextInput style={[Loginstyle.input, isFocused1 && Loginstyle.inputFocused]} placeholder="Username"
//                     onChangeText={setId} onFocus={handleFocus1} onBlur={handleBlur1} />

//         <TextInput style={[Loginstyle.input, isFocused2 && Loginstyle.inputFocused]} placeholder="Password"
//                     secureTextEntry onChangeText={setPassword} onFocus={handleFocus2} onBlur={handleBlur2} />
//         <TouchableOpacity style={Loginstyle.startBt} onPress={() => onLogin(id, password)} >
//           <Text style={Loginstyle.btText}>시작하기</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   )
// };

// export default LoginForm;
