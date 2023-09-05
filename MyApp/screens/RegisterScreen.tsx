// RegisterScreen.tsx

import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterForm from '../components/RegisterForm';
import { RootStackParamList } from '../types';

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
     <View>
       <RegisterForm onRegister={handleRegistration}/>
       <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
     </View>
   )
};

export default RegisterScreen;