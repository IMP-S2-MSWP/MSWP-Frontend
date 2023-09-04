import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import { RootStackParamList } from '../types';

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
       <View>
         <LoginForm onLogin={handleLogin}/>
         <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
       </View>
     )
};

export default LoginScreen;