import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from "../components/Icon/Tabbar"
import Main_Stack_Navigator from './Main_Stack_Navigator';

const Tab = createBottomTabNavigator();

const Main_Tab_Navigator = () => {
  return (
    <Tab.Navigator initialRouteName="메인"
        tabBarOptions={{
          activeBackgroundColor:'#000000',
          activeTintColor:"#0080ff",
          inactiveTintColor:"#0080ff",
          inactiveBackgroundColor:'#000000',
          style:{
            backgroundColor:'#000000',
          },
          labelPosition: 'below-icon'
        }}

        screenOptions = {({route})=>({
          tabBarLabel:route.name,
          tabBarIcon:({focused})=>(
            TabBarIcon(focused,route.name)
          )
        })}
      >
      <Tab.Screen name="메인" component={Main_Stack_Navigator} />
      <Tab.Screen name="채팅" component={Main_Stack_Navigator} />
      <Tab.Screen name="비콘채팅" component={Main_Stack_Navigator}/>
      <Tab.Screen name="좋아요" component={Main_Stack_Navigator} />
    </Tab.Navigator>
  );
}


export default Main_Tab_Navigator;