/* 
 LoginScreen
 2023-09-06//고주원//LoginScreen 초안작성
 2023-09-10//이상용//Login design
 2023-09-11//이상용//api연결, mainpage로 navigate 
 */
import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import { RootStackParamList } from '../types';
import Loginstyle from '../styles/Loginstyle';
import axios from 'axios';
type LoginScreenNavigationProp = StackNavigationProp<
   RootStackParamList,
   'Login'
>;

type Props ={
   navigation : LoginScreenNavigationProp; 
}

const LoginScreen :React.FC<Props>= ({ navigation }) =>{
  const [loginStatus, setLoginStatus] = useState('');
   const handleLogin =(id:string,password:string)=>{
    // 로그인 요청 보내기
    const requestData = {
      id,
      password,
    };

    axios.post('http://192.168.0.16:8080/api/login', requestData)
      .then(response => {
        if(response.data != null) {
          console.log(response.data);
          setLoginStatus('로그인 성공');
        // 로그인 성공 시 처리할 로직 작성
        navigation.navigate('Main')
        // 다음 컴포넌트로 이동하는 로직 작성
        } else {
          setLoginStatus('아이디 또는 비밀번호가 일치하지 않습니다.');
          //Alert.alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          //navigation.navigate('Start')
        }
        
      })
      .catch(error => {
        console.error(error);
        // 에러 처리 로직 작성
      });
      
  };
  /* get함수
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
  */


     return(
       <View  style={Loginstyle.container}>
        
         <LoginForm onLogin={handleLogin}/>
         <TouchableOpacity style={Loginstyle.startBt} onPress={() => navigation.navigate('Register')}>
          <Text style={Loginstyle.btText}>회원가입</Text>
        </TouchableOpacity>
        <Text style={Loginstyle.statusLg}>{loginStatus}</Text>
       </View>
     )
};

export default LoginScreen;