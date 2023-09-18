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
import Main_Drawer_Navigator from './navigator/Main_Drawer_Navigator'
//
import DeviceScreen from './screens/DeviceScreen';
//
import { NativeBaseProvider } from 'native-base';
import StartScreen from './screens/StartScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown:false,}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Device" component={DeviceScreen} />

        <Stack.Screen name="Main" component={Main_Drawer_Navigator} />
        <Stack.Screen name="Start" component={StartScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;