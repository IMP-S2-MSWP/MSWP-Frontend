// StartScreen.tsx
/* 
 메인화면 스크린
 2023-09-06//이상용//Start 초안구축
 2023-09-07//이상용//Start 디자인
 2023-09-10//이상용//Start 디자인 수정
 2023-09-11//이상용//img 삽입 테스트
 */
 import React from 'react';
 import {  Button, View,Text, StyleSheet, Image } from 'react-native';
 import { StackNavigationProp } from '@react-navigation/stack';
 import RegisterForm from '../components/RegisterForm';
 import { RootStackParamList } from '../types';
 import Mainstyle from '../styles/Mainstyle';
 import { TouchableOpacity } from 'react-native-gesture-handler';
 import { Box, Center, NativeBaseProvider } from "native-base";
 type StartScreenNavigationProp = StackNavigationProp< //이 또한 새로운 typeScript 타입 
   RootStackParamList,
   'Start'
 >;
 
 type Props = { //Props라는 새로운 TypeScript 타입을 선언. 현재 컴포넌트가 받아들일 수 있는 props의 형태를 정의
   navigation: StartScreenNavigationProp;
 };
 
 const StartScreen: React.FC<Props> = ({ navigation }) => {
   //  const handleRegistration=(id:string,password:string,username:string,nickname:string,sex:string,birthDate:String)=>{
   //      // Perform registration operation here.
   //      console.log(`registering with ${id}`);
   //  }
    return(
      <View style={Mainstyle.container}>
        <Image style={Mainstyle.imgStyle} source={require('../img/test.png')}/>
        <Text style={Mainstyle.MainText}>블투러브</Text>
        <Text style={Mainstyle.SubText}>너와 나 사이 20M</Text>
        <TouchableOpacity style={Mainstyle.startBt} onPress={() => navigation.navigate('Register')} >
           <Text style={Mainstyle.btText}>시작하기</Text>
         </TouchableOpacity>
         <Text style={Mainstyle.bottomText} onPress={() => navigation.navigate('Login')}>이미 계정이 있나요? 로그인</Text>
     </View>
      
    )
 };
 
 export default StartScreen;