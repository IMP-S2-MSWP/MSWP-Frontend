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
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
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
  return (
    <>
      <View>
        <Text style={Loginstyle.helloText}>안녕하세요!</Text>
      
        <TextInput style={[Loginstyle.input, isFocused1 && Loginstyle.inputFocused]} placeholder="Username" 
                    onChangeText={setUsername} onFocus={handleFocus1} onBlur={handleBlur1} />

        <TextInput style={[Loginstyle.input, isFocused2 && Loginstyle.inputFocused]} placeholder="Password" 
                    secureTextEntry onChangeText={setPassword} onFocus={handleFocus2} onBlur={handleBlur2} />
        
        
        <TouchableOpacity style={Loginstyle.startBt} onPress={() => onLogin(username, password)} >
          <Text style={Loginstyle.btText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

export default LoginForm;