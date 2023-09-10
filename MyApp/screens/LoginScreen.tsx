import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import { RootStackParamList } from '../types';
import Loginstyle from '../styles/Loginstyle';

type LoginScreenNavigationProp = StackNavigationProp<
   RootStackParamList,
   'Login'
>;

type Props ={
   navigation : LoginScreenNavigationProp; 
}

const LoginScreen :React.FC<Props>= ({ navigation }) =>{
  
   const handleLogin =(username:string,password:string)=>{
       // Perform login operation here.
       console.log(`Logging in with ${username}`);
     }

     return(
       <View  style={Loginstyle.container}>
         <LoginForm onLogin={handleLogin}/>
         <TouchableOpacity style={Loginstyle.startBt} onPress={() => navigation.navigate('Register')}>
          <Text style={Loginstyle.btText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Loginstyle.startBt} onPress={() => navigation.navigate('Main')}>
          <Text style={Loginstyle.btText}>로그인test</Text>
        </TouchableOpacity>
       </View>
     )
};

export default LoginScreen;