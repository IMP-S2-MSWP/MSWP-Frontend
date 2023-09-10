// MainScreen.tsx
/* 
 메인화면 스크린
 2023-09-10//이상용//Main화면 구축, bottomTab
 */
import React from 'react';
import {  Button, View,Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterForm from '../components/RegisterForm';
import { RootStackParamList } from '../types';
import Mainstyle from '../styles/Mainstyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Center, NativeBaseProvider } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
type TabParamList ={
  Home: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

const MainScreen: React.FC = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export default function RootComponent() {
   return (
     <NavigationContainer independent={true}>
       <MainScreen />
     </NavigationContainer>
   );
};