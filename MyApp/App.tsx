/* 
 App
 2023-09-04//고주원//Login으로 연결
 2023-09-06//이상용//Main으로 연결
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
//import Main_Drawer_Navigator from './navigator/Main_Drawer_Navigator'
//
//import DeviceScreen from './screens/DeviceScreen';
//
import { NativeBaseProvider } from 'native-base';
import StartScreen from './screens/StartScreen';
import Main_Tab_Navigator from "./navigator/Main_Tab_Navigator";
import SignUp from './screens/Signup/SignUp';

const Stack = createStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
        <SignUp/>
    </NativeBaseProvider>
  );
}

export default App;