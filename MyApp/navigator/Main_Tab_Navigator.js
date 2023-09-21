import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from "../components/Icon/Tabbar"
import { useTheme } from '@react-navigation/native';
import Main_Stack_Navigator from './Main_Stack_Navigator';
import Chat_Stack_Navigator from './Chat_Stack_Navigator';
import SettingScreen from '../screens/SettingScreen';
import {Menu,HamburgerIcon,Pressable,Button, HStack, Badge, Spacer, Flex} from "native-base"

import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const Main_Tab_Navigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator initialRouteName="메인"
        tabBarOptions={{
          activeBackgroundColor:'white',
          activeTintColor:"black",
          inactiveTintColor:"black",
          inactiveBackgroundColor:'skyblue',
          style:{
            backgroundColor:'#000000',
          },
          labelPosition: 'below-icon'
        }}

        screenOptions = {({route})=>({
          headerRight: () => (
            <Menu
            trigger={(triggerProps) => {
            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>;
            }}
            
          >
            <Menu.Item>Aria</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
          </Menu>
            
          ),
          tabBarLabel:route.name,
          tabBarIcon:({focused})=>(
            TabBarIcon(focused,route.name)
          )
        })}
      >
      <Tab.Screen name="메인" component={Main_Stack_Navigator} />
      <Tab.Screen name="채팅" component={Chat_Stack_Navigator} />
      <Tab.Screen name="비콘채팅" component={Main_Stack_Navigator} />
      <Tab.Screen name="좋아요" component={Main_Stack_Navigator} />
    </Tab.Navigator>
  );
}


export default Main_Tab_Navigator;