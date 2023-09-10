// RegisterScreen.tsx

import React, {useEffect, useState} from 'react';
import {  ActivityIndicator, Button, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterForm from '../components/RegisterForm';
import { RootStackParamList } from '../types';
import { NativeBaseProvider, Box } from "native-base";
import Registerstyle from '../styles/Registerstyle';
type RegisterScreenNavigationProp = StackNavigationProp< //이 또한 새로운 typeScript 타입 
  RootStackParamList,
  'Register'
>;

type Props = { //Props라는 새로운 TypeScript 타입을 선언. 현재 컴포넌트가 받아들일 수 있는 props의 형태를 정의
  navigation: RegisterScreenNavigationProp;
};


const RegisterScreen: React.FC<Props> = ({ navigation }) => {
   const handleRegistration=(id:string,password:string,username:string,nickname:string,sex:string,birthDate:String)=>{
       // Perform registration operation here.
       console.log(`registering with ${id}`);
   }
   
   
   return(
     <View style={Registerstyle.container}>
      <Text style={Registerstyle.helloText}>회원가입</Text>
       <RegisterForm onRegister={handleRegistration}/>
       <TouchableOpacity style={Registerstyle.startBt} onPress={() =>navigation.navigate('Login')} >
          <Text style={Registerstyle.btText}>로그인으로 돌아가기</Text>
        </TouchableOpacity>
     </View>
     
   )
};

export default RegisterScreen;