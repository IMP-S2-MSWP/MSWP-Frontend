/* 
 LoginForm
 2023-09-06//고주원//LoginForm 초안작성
 2023-09-06//이상용//Login TextInput 스타일 테스트
 */
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
import Loginstyle from '../styles/Loginstyle';
interface Props {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <TextInput style={Loginstyle.input} placeholder="Username" onChangeText={setUsername} />
      <TextInput style={Loginstyle.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={() => onLogin(username, password)} />
    </>
  )
};

export default LoginForm;