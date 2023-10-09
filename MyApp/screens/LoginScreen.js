import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Flex, Icon, MaterialIcons} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Mainstyle from '../components/Style/Mainstyle';
import { useNavigation } from '@react-navigation/native';
import Loginstyle from '../components/Style/Loginstyle';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

const LoginScreen = (props) => {
    const navigation = useNavigation(); // 네비게이션 객체를 가져옵니다.

    const [loginStatus, setLoginStatus] = useState('');
   const handleLogin =(id,password)=>{
    // 로그인 요청 보내기
    const requestData = {
      id,
      password,
    };
    navigation.navigate('Main');
  
    
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
    return(
        <View  style={Loginstyle.container}>
        <Text style={Loginstyle.texts}>아이디</Text>
        <Input w={{ base: "90%", md: "25%" }} variant="underlined" placeholder="아이디 입력" style={{ fontSize: 16 }} />
        <Text style={Loginstyle.texts}>비밀번호</Text>
        
        <Input w={{ base: "90%", md: "25%" }} type={"password"} variant="underlined" placeholder="비밀번호 입력" style={{ fontSize: 16 }}  />
        
        
       <CustomButton title="로그인" onPress={() => navigation.navigate('Main')}/>

      </View>
      
        );

}
export default LoginScreen;