// RegisterScreen.tsx
/* 
 메인화면 스크린
 2023-09-06//이상용//Main 초안구축
 */
import React from 'react';
import {  Button, View,Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterForm from '../components/RegisterForm';
import { RootStackParamList } from '../types';
type MainScreenNavigationProp = StackNavigationProp< //이 또한 새로운 typeScript 타입 
  RootStackParamList,
  'Main'
>;

type Props = { //Props라는 새로운 TypeScript 타입을 선언. 현재 컴포넌트가 받아들일 수 있는 props의 형태를 정의
  navigation: MainScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  //  const handleRegistration=(id:string,password:string,username:string,nickname:string,sex:string,birthDate:String)=>{
  //      // Perform registration operation here.
  //      console.log(`registering with ${id}`);
  //  }
   
   
   return(
     <View>
       <Text>블투러브</Text>
       <Button title="접속하기" onPress={() => navigation.navigate('Login')} />
     </View>
     
   )
};

export default MainScreen;