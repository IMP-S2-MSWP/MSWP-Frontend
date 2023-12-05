import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/MainScreen';
import SettingScreen from '../screens/ProfileSettingsModal';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: 'black',
  headerBackTitle: 'Back',
};

const Main_Stack_Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="메인페이지"
      screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="메인페이지"
        component={Main}
        options={{headerShown: false}}
      />

      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default Main_Stack_Navigator;
