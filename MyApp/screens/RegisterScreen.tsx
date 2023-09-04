import React from 'react';
import { Button, View } from 'react-native';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen= ({ navigation }) =>{
   
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
