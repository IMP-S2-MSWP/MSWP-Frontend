/* 
 LoginForm
 2023-09-06//고주원//LoginForm 초안작성
 2023-09-06//이상용//Login TextInput 스타일 테스트
 2023-09-10//이상용//Login design
 */
import React, { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Loginstyle from '../styles/Loginstyle';
import Mainstyle from '../styles/Mainstyle';
interface Props {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View>
        <Text style={Loginstyle.helloText}>안녕하세요!</Text>
      
        <TextInput style={Loginstyle.input} placeholder="Username" onChangeText={setUsername} />
        <TextInput style={Loginstyle.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
        <TouchableOpacity style={Loginstyle.startBt} onPress={() => onLogin(username, password)} >
          <Text style={Loginstyle.btText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

export default LoginForm;