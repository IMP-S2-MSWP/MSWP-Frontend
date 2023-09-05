// RegisterScreen.tsx

import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterForm from '../components/RegisterForm';
import { RootStackParamList } from '../types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
   const handleRegistration=(username:string,password:string)=>{
       // Perform registration operation here.
       console.log(`registering with ${username}`);
   }
   
   return(
     <View>
       <RegisterForm onRegister={handleRegistration}/>
       <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
     </View>
   )
};

export default RegisterScreen;