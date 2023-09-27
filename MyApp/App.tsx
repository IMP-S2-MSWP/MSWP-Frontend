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
<<<<<<< HEAD
        <SignUp/>
=======
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/*//<Stack.Screen name="Device" component={DeviceScreen} />*/}

        <Stack.Screen name="Main" component={Main_Tab_Navigator}  />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
       
        
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> 0f79de7ccf9c926396c2f92dbc2e72ce204b1401
    </NativeBaseProvider>
  );
}

export default App;