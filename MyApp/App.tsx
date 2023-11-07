/* 
 App
 2023-09-04//고주원//Login으로 연결
 2023-09-06//이상용//Main으로 연결
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/Signup/SignUp';
//import Main_Drawer_Navigator from './navigator/Main_Drawer_Navigator'
//
//import DeviceScreen from './screens/DeviceScreen';
//
import { NativeBaseProvider } from 'native-base';
import StartScreen from './screens/StartScreen';
import Main_Tab_Navigator from "./navigator/Main_Tab_Navigator";
import { UserProvider } from './stores/UserContext'; 
const Stack = createStackNavigator();



function App() {
  return (
    <UserProvider>
    <NativeBaseProvider>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Start" >
        <Stack.Screen name="Login" component={LoginScreen}         options={{
              headerTitle: '', // 헤더 이름 제거
              headerBackTitleVisible: false, // 뒤로가기 버튼에 텍스트 숨김
              headerStyle: { 
                borderBottomWidth: 0, // 헤더 언더라인 제거
                elevation: 0, // Android에서 그림자 제거
                shadowOpacity: 0, // iOS에서 그림자 제거
              }, // 헤더 언더라인 제거
            }}/>
        <Stack.Screen name="SignUp" component={SignUp}         options={{
              headerTitle: '', // 헤더 이름 제거
              headerBackTitleVisible: false, // 뒤로가기 버튼에 텍스트 숨김
              headerStyle: { 
                borderBottomWidth: 0, // 헤더 언더라인 제거
                elevation: 0, // Android에서 그림자 제거
                shadowOpacity: 0, // iOS에서 그림자 제거
              }, // 헤더 언더라인 제거
            }}/>

        {/*//<Stack.Screen name="Device" component={DeviceScreen} />*/}

        <Stack.Screen name="Main" component={Main_Tab_Navigator}  />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
       
        
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
    </UserProvider>
  );
}

export default App;