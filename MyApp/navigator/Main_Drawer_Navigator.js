import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Main_Tab_Navigator from "./Main_Tab_Navigator";
import  Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const Main_Drawer_Navigator = () => {
  return (
        <Drawer.Navigator 
        drawerPosition = "right"
        drawerStyle = {{
          backgroundColor : "#2D3032",
          width : 200
        }}
        
        drawerContentOptions = {{
          activeBackgroundColor:'#7f7f7f',
                  labelStyle: {
          color: '#ffffff'
        }
        }}

      >
      <Drawer.Screen name="Main" component={Main_Tab_Navigator}  options={{
          drawerIcon: () => (
            <Icon name="home" size={20} color="white" />
          )
        }}/>


      </Drawer.Navigator>
  );
};

export default Main_Drawer_Navigator;

/*
      <Drawer.Screen name="설정" component={SettingStackNavigator} options={{
          drawerIcon: () => (
            <Ionicons name="settings" size={20} color="white" />
          )}}/>
*/